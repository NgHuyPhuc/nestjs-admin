import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './passport/jwt-auth-guard';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public } from 'src/decorator/customize';
// import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.signIn(createAuthDto.username, createAuthDto.password);
  // }
  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
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
}
