import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt'; 
import { UserService } from '../user/user.service'; 
import { UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService, 
    private jwtService: JwtService,  
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    console.log(email);
    const user = await this.userService.findByEmail(email); 
    if (user && await bcrypt.compare(password, user.passwordHash)) {
      const { passwordHash, ...result } = user;  
      return result;
    }
    return null;  
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return { message: 'User registered successfully', user };
  }
  
  
  async login(email: string, password: string) {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const userDetails = { email: user.email, sub: user.id };
    const accessToken = this.jwtService.sign(userDetails);
    return { accessToken };
  }
  
}
