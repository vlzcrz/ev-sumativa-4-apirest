import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('User')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_uuid: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ unique: true })
  correo_electronico: string;

  @Column()
  contrasena: string;

  @Column()
  esta_eliminado: boolean;
}
