import {IsEmail, IsEmpty, isNotEmpty, IsNotEmpty} from 'class-validator';

export class UpdateUserImageDto {
    @IsNotEmpty()
    image: string;
}
