import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  nombre: string;
  @IsString()
  apellido: string;
  @IsEmail()
  correo_electronico: string;
}
