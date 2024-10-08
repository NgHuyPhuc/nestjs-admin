import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto{
    @IsMongoId({ message: "_Id khong hop le" })
    @IsNotEmpty({ message: "_Id khong duoc de trong" })
    _id : string;
    
    @IsOptional()
    name: string;
    @IsOptional()
    phone: string;
    @IsOptional()
    address: string;
    @IsOptional()
    image: string;

    @IsOptional()
    password: string;

}
