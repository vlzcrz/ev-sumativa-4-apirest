import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { readFile } from 'fs/promises';
import { join } from 'path';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserSeedService {
  private readonly logger = new Logger(UserSeedService.name);

  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async seedUsers() {
    try {
      const filePath = join(__dirname, '../user-seed.json');
      const fileContent = await readFile(filePath, 'utf-8');
      const users = JSON.parse(fileContent);

      for (const userData of users) {
        const existingUser = await this.UserRepository.existsBy({
          correo_electronico: userData.correo_electronico, // Asegúrate de que 'email' sea una columna en tu entidad User
        });

        if (existingUser) {
          continue;
        }
        const saltOrRounds = 12;
        const hashedPassword = await bcrypt.hash(
          userData.contrasena,
          saltOrRounds,
        );
        const user = this.UserRepository.create({
          ...userData,
          contrasena: hashedPassword,
          user_uuid: uuidv4(),
        });
        await this.UserRepository.save(user);
      }
      this.logger.log('The user seeder task is done without problems');
    } catch (error) {
      this.logger.error(error);
    }
  }
}
