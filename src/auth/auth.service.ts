import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const { correo_electronico, contrasena } = loginDto;
    const payload = await this.validateUser(correo_electronico, contrasena);
    const jwt = await this.jwtService.sign(payload);
    return {
      access_token: jwt,
    };
  }

  async validateUser(correo_electronico: string, input_contrasena: string) {
    const user = await this.userService.findUserByEmail(correo_electronico);
    const isContrasena = await bcrypt.compare(
      input_contrasena,
      user.contrasena,
    );
    if (!isContrasena) {
      throw new BadRequestException('Wrong password, try again');
    }
    const { contrasena, user_uuid, esta_eliminado, ...userBody } = user;
    return userBody;
  }
}
