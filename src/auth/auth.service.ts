
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePasswordHelper } from 'src/helpers/util';
import { UsersService } from 'src/modules/users/users.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { CheckCode } from './dto/check-code.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    const isvalidpassword = await comparePasswordHelper(pass,user.password);
    if (!isvalidpassword) {
      throw new UnauthorizedException("Username/Password khong hop le");
    }
    const payload = { sub: user._id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(username);
    if (!user) return null;

    const isValidPassword = await comparePasswordHelper(pass, user.password);
    if (!isValidPassword) return null;
    return user;
  }
  
  async login(user: any) {      
    const payload = { username: user.email, sub: user._id };
    // console.log(this.jwtService.sign(payload));
    return {
      user: {
        email: user.email,
        _id: user._id,
        name: user.name,
      },
      access_token: this.jwtService.sign(payload),
    };
  }

  async handleRegister(registerDto : CreateAuthDto ) {
    return await this.usersService.handleRegister(registerDto);
  }
  async handleCheckCode(checkCodeDto : CheckCode ) {
    return await this.usersService.handleUserCheckCode(checkCodeDto);
  }
  async reSendEmail(email : string ) {
    return await this.usersService.handleUserReSendCode(email);
  }
}