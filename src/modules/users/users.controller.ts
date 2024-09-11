import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  Req
} from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Express } from 'express'
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { query } from 'express';
import { Public } from 'src/decorator/customize';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageCongig } from 'src/helpers/util';
import { UpdateUserImageDto } from './dto/update-user-img.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) { }

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
    // console.log('find all');
    return this.usersService.findAll(query, +current, +pagesize);
  }

  @Get('by-id/:id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
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


  @Public()
  @Post('upload-avatar-for1')
  @UseInterceptors(FileInterceptor('image', { storage: storageCongig('image') }))
  async uploadFile(
    @Req() req: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1]; // Assuming 'Bearer <token>' format
    const filename = file.filename;
    console.log('Token:', token);
    const payload = await this.jwtService.verifyAsync(token, {
      secret: this.configService.get<string>('SECRET')
    })
    return await this.usersService.updateimg(payload._id, filename)
  }

  @Public()
  @Post('upload-avatar')
  @UseInterceptors(FileInterceptor('image', { storage: storageCongig('image') }))
  async updateUploadFile(
    @Req() req: any,
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log("🚀 ~ UsersController ~ body:", body.id)
    console.log('uploadfile');
    console.log("🚀 ~ UsersController ~ file:", file);
    // console.log("🚀 ~ UsersController ~ req:", req);
    const filename = file.filename;

    return await this.usersService.updateimg(body.id, filename)
  }


  // @UseInterceptors(FileInterceptor('file'))
  // @Post('file')
  // uploadFile(
  //   @Body() body: any,
  //   @UploadedFile() file: Express.Multer.File,
  // ) {
  //   return {
  //     body,
  //     file: file.buffer.toString(),
  //   };
  // }

  // @UseInterceptors(FileInterceptor('file'))
  // @Post('file/pass-validation')
  // uploadFileAndPassValidation(
  //   @Body() body: any,
  //   @UploadedFile(
  //     new ParseFilePipeBuilder()
  //       .addFileTypeValidator({
  //         fileType: 'json',
  //       })
  //       .build({
  //         fileIsRequired: false,
  //       }),
  //   )
  //   file?: Express.Multer.File,
  // ) {
  //   return {
  //     body,
  //     file: file?.buffer.toString(),
  //   };
  // }

  // @UseInterceptors(FileInterceptor('file'))
  // @Post('file/fail-validation')
  // uploadFileAndFailValidation(
  //   @Body() body: any,
  //   @UploadedFile(
  //     new ParseFilePipeBuilder()
  //       .addFileTypeValidator({
  //         fileType: 'jpg',
  //       })
  //       .build(),
  //   )
  //   file: Express.Multer.File,
  // ) {
  //   return {
  //     body,
  //     file: file.buffer.toString(),
  //   };
  // }
}
