import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { hashPasswordHelper } from 'src/helpers/util';
import aqp from 'api-query-params';
import mongoose from 'mongoose';
@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name)
  private UserModel: Model<User>) { }

  isEmailExist = async (email: string) => {
    const user = await this.UserModel.exists({ email: email });
    if (user) return true;
    return false;
  }

  async create(createUserDto: CreateUserDto) {
    const { name, email, password, phone, address, image } = createUserDto;
    //check mail
    const isExist = await this.isEmailExist(email);
    if (isExist) {
      throw new BadRequestException(`Email already exists: ${email}.`);
    }
    const hasPassword = await hashPasswordHelper(createUserDto.password);
    const user = await this.UserModel.create({
      name, email, password: hasPassword, phone, address, image
    })
    // console.log('password :',hasPassword);
    // return 'This action adds a new user';
    return {
      _id: user._id,
    }
  }

  async findAll(query: string, current: number, pagesize: number) {
    const { filter, sort } = aqp(query)
    if (filter.current) delete filter.current;
    if (filter.pagesize) delete filter.pagesize;

    if (!current) current = 1;
    if (!pagesize) pagesize = 10;

    const totalItem = ((await this.UserModel.find(filter)).length);
    const totalPages = Math.ceil(totalItem / pagesize);
    const skip = (current - 1) * (+pagesize)
    const result = await this.UserModel
      .find(filter)
      .limit(pagesize)
      .skip(skip)
      .select('-password')
      .sort(sort as any);
    // return `This action returns all users`;
    return { result, totalPages };
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.UserModel.findOne({email});
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.UserModel.updateOne(
      { _id: updateUserDto }, { ...updateUserDto });
  }

  async remove(_id: string) {
    if (mongoose.isValidObjectId(_id)) {
      return await this.UserModel.findByIdAndDelete({_id});
    }
    else {
      throw new BadRequestException("id khong hop le")
    }
  }
  
}
