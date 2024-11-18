import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserSeedService } from './seeders/services/userSeed.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, UserSeedService],
  exports: [UserService],
})
export class UserModule implements OnModuleInit {
  constructor(private readonly UserSeedService: UserSeedService) {}

  async onModuleInit() {
    await this.UserSeedService.seedUsers();
  }
}
