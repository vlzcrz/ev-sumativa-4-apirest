import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  correo_electronico: string;
  @IsString()
  contrasena: string;
}
