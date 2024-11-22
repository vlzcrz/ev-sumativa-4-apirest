import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsEmail, IsString, Length } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @Length(0, 15)
  nombre: string;
  @IsString()
  @Length(0, 100)
  apellido: string;
  @IsEmail()
  @Length(0, 100)
  correo_electronico: string;
}
