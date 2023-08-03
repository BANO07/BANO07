import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { JwtStrategy } from './strategy/jwt.strategy';
import { RoleGuard } from './guards/role.guard';
// import { AuthGuard } from './guards/auth.guard';
require('dotenv').config();

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secretOrPrivateKey : process.env.JWT_SECRET, 
      signOptions:{expiresIn:'60000000000000000000s'}
    }),
    PassportModule
  ],
  controllers: [UserController],
  providers: [UserService, JwtStrategy, JwtAuthGuard]
})
export class UserModule {}
