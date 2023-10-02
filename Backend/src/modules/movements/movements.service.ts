import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TransferDto } from './dto/transfer.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class MovementsService {
  constructor(private userService: UserService) {}

  async transfer(transferInformation: TransferDto) {
    const user = await this.userService.updateDebitCardBalance(
      transferInformation.origin,
      transferInformation.ammount,
    );
    if (user) {
      return user;
    }
    throw new UnauthorizedException();
  }
}
