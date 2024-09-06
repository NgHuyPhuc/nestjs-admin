import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { query } from 'express';
import { Public } from 'src/decorator/customize';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,

  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @Public()
  async findAll(
    @Query() query: string,
    @Query("current") current: string,
    @Query("pagesize") pagesize: string,
  ) {
    // console.log(query);
    return this.usersService.findAll(query, +current, +pagesize);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Get(':email')
  @Public()
  findByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
