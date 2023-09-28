import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, credit_card } from './schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(user: CreateUserDto) {
    const createdUser = new this.userModel(user);
    return createdUser.save();
  }

  async update(id: string, user: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, user, {
      new: true,
    });
  }

  async findAll() {
    return this.userModel.find().exec();
  }

  async findOne(id: string) {
    return this.userModel.findById(id).exec();
  }

  async deleteOne(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
  async findByUserNumberOrCC(userOrCCNumber: string) {
    return this.userModel
      .findOne(
        {
          $or: [
            { 'user_number': userOrCCNumber },
            { "credit_cards.cc_number": userOrCCNumber }
          ]
        },
        { password: 1, first_name: 1, last_name: 1 },
      )
      .exec();
  }
}
