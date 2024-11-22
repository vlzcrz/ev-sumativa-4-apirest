import { IsBoolean, IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(0, 15)
  nombre: string;
  @IsString()
  @Length(0, 100)
  apellido: string;
  @IsEmail()
  @Length(0, 100)
  correo_electronico: string;
  @IsString()
  @Length(0, 30)
  contrasena: string;
  @IsBoolean()
  esta_eliminado: boolean;
}
