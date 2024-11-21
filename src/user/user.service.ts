import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userExist = await this.UserRepository.findOneBy({
      correo_electronico: createUserDto.correo_electronico,
    });
    if (userExist) {
      throw new BadRequestException('User with email already registered.');
    }
    const saltOrRounds = 12;
    const hashedPassword = await bcrypt.hash(
      createUserDto.contrasena,
      saltOrRounds,
    );
    const user = await this.UserRepository.create({
      ...createUserDto,
      contrasena: hashedPassword,
      user_uuid: uuidv4(),
    });
    await this.UserRepository.save(user);
    return user;
  }

  async findUserByEmail(correo_electronico: string) {
    const user = await this.UserRepository.findOneBy({
      correo_electronico: correo_electronico,
    });
    if (!user) {
      throw new NotFoundException(
        `User with email: ${correo_electronico} does not exist`,
      );
    }
    return user;
  }

  async updateUser(user_uuid: string, updateUserDto: UpdateUserDto) {
    const user = await this.UserRepository.preload({
      user_uuid: user_uuid,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    await this.UserRepository.save(user);
  }

  async deleteUser(user_uuid: string) {
    const user = await this.UserRepository.preload({
      user_uuid,
      esta_eliminado: true,
    });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    await this.UserRepository.save(user);
  }

  async findUser(user_uuid: string) {
    const user = await this.UserRepository.findOneBy({
      user_uuid: user_uuid,
    });
    if (!user) {
      throw new NotFoundException('User does not exist');
    }
    return user;
  }

  async findUsers(page?: number, limit?: number) {
    if (isNaN(Number(page)) || isNaN(Number(limit))) {
      throw new BadRequestException('The page and limit must be numeric');
    }
    if (page == null || limit == null) {
      throw new BadRequestException('The page and limit must have a value');
    }
    if (page <= 0 || limit <= 0) {
      throw new BadRequestException(
        'The page and limit must be greater then 0',
      );
    }
    const [result, total] = await this.UserRepository.findAndCount({
      skip: (page - 1) * limit, //offset
      take: limit, //num elementos
    });

    return {
      users: result,
      total_pages: Math.ceil(total / limit),
      total_users: total,
      actual_page: page,
    };
  }
}
