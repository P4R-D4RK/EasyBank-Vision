import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
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
    return this.userModel.findById(id, { _id: 0 }).exec();
  }

  async deleteOne(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }
  async findByUserNumberOrCC(userOrCCNumber: string) {
    return this.userModel
      .findOne(
        {
          $or: [
            { user_number: userOrCCNumber },
            { 'credit_cards.cc_number': userOrCCNumber },
          ],
        },
        { password: 1, first_name: 1, last_name: 1 },
      )
      .exec();
  }
  async findByDcNumber(dcNumber: string) {
    return this.userModel
      .findOne({ 'debit_card.dc_number': dcNumber }, { _id: 1 })
      .exec();
  }
  async findByCcNumber(ccNumber: string) {
    return this.userModel
      .findOne({ 'credit_cards.cc_number': ccNumber }, {})
      .exec();
  }
  async updateDebitCardBalance(
    add_amount: boolean,
    dc_number: string,
    amount: number,
  ) {
    if (add_amount) {
      return this.userModel
        .findOneAndUpdate(
          {
            'debit_card.dc_number': dc_number,
          },
          [
            {
              $set: {
                'debit_card.dc_avaliable_balance': {
                  $sum: ['$debit_card.dc_avaliable_balance', amount],
                },
              },
            },
          ],
        )
        .lean()
        .exec();
    } else {
      return this.userModel
        .findOneAndUpdate(
          {
            'debit_card.dc_number': dc_number,
          },
          [
            {
              $set: {
                'debit_card.dc_avaliable_balance': {
                  $subtract: ['$debit_card.dc_avaliable_balance', amount],
                },
              },
            },
          ],
        )
        .lean()
        .exec();
    }
  }

  async updateCCAvaliableCredit(cc_number: string, amount: number) {
    return this.userModel
      .findOneAndUpdate(
        { 'credit_cards.cc_number': cc_number },
        {
          $inc: {
            'credit_cards.$.cc_avaliable_credit': -amount,
          },
        },
        { new: true },
      )
      .exec();
  }

  async createMovement(
    userId: any,
    amount: number,
    destination: string,
    origin: string,
    paymentReason: string,
    type: string,
  ) {
    const now = new Date();
    return this.userModel
      .findByIdAndUpdate(
        { _id: userId },
        {
          $push: {
            movements: {
              amount,
              destination,
              origin,
              date: now,
              paymentReason,
              type,
            },
          },
        },
        { new: true },
      )
      .exec();
  }
  async getMovements(userId: any) {
    return this.userModel
      .findById(
        { _id: userId },
        {
          movements: 1,
        },
      )
      .exec();
  }
}
