import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', 
      signOptions: { expiresIn: '1h' },
    }),
    UserModule, 
  ],
  providers: [AuthService, LocalStrategy], 
  controllers: [AuthController],
})
export class AuthModule {}
