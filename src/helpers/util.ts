import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { diskStorage } from 'multer';

const bcrypt =  require('bcrypt');
const saltRounds = 10;

export const hashPasswordHelper = async(plainPassword: string) => {
    try {
        return await bcrypt.hash(plainPassword, saltRounds)
    } catch (error) {
        console.log(error);
    }
}
export const comparePasswordHelper = async(plainPassword: string, hashpassword: string) => {
    try {
        return await bcrypt.compare(plainPassword, hashpassword)
    } catch (error) {
        console.log(error);
    }
}

export const storageCongig = (folder: string) => diskStorage ({
    destination: `uploads/${folder}`,
    filename:(req ,file, callback)=>{
        callback(null, Date.now() + '-' + file.originalname)
    }
})