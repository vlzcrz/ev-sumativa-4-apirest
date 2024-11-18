import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;
  @IsString()
  apellido: string;
  @IsEmail()
  correo_electronico: string;
  @IsString()
  contrasena: string;
  @IsBoolean()
  esta_eliminado: boolean;
}
