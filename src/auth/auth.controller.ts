import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './passport/jwt-auth-guard';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public, ResponeMessage } from 'src/decorator/customize';
import { MailerService } from '@nestjs-modules/mailer';
import { CheckCode } from './dto/check-code.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService
    
  ) {}

  
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.signIn(createAuthDto.username, createAuthDto.password);
  // }
  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  @ResponeMessage('fetch login')
  handleLogin(@Request() req){
    return this.authService.login(req.user);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  @Public()
  register(@Body() registerDto : CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }

  @Post('check-code')
  @Public()
  checkcode(@Body() checkCodeDto : CheckCode) {
    console.log("🚀 ~ AuthController ~ checkcode ~ checkCodeDto:", checkCodeDto)
    
    return this.authService.handleCheckCode(checkCodeDto);
  }

  @Get('mail')
  @Public()
  mail() {
    this.mailerService
      .sendMail({
        to: 'nkien6962@gmail.com', // list of receivers
        // to: 'sumasa05@gmail.com', // list of receivers
        // from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        // text: 'welcome', // plaintext body
        // html: '<b>Hello world</b>', // HTML body content
        template: 'newtemp',
        // context: {
        //   name: 'test',
        //   activationCode: 'asdadgads',
        // }
      })
    return 'ok mail';
  }
}
