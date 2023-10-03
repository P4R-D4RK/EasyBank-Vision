import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TransferDto } from './dto/transfer.dto';
import { UserService } from '../user/user.service';
import { ServicePaymentDto } from './dto/servicePayment.dto';

@Injectable()
export class MovementsService {
  constructor(private userService: UserService) {}

  async transfer(transferInformation: TransferDto) {
    const userDC = await this.userService.findByDcNumber(
      transferInformation.origin,
    );
    const update = await this.userService.updateDebitCardBalance(
      transferInformation.origin,
      transferInformation.amount,
    );
    if (update) {
      const movement = await this.userService.createMovement(
        userDC['_id'],
        transferInformation.amount,
        transferInformation.destination,
        'Transferencia',
      );
      console.log(movement);
      return update;
    }
    throw new UnauthorizedException();
  }

  async payService(paymentInformation: ServicePaymentDto) {
    const userDC = await this.userService.findByDcNumber(
      paymentInformation.cc_or_dc_number,
    );
    if (userDC) {
      const updateBalance = await this.userService.updateDebitCardBalance(
        paymentInformation.cc_or_dc_number,
        paymentInformation.amount,
      );
      if (updateBalance) {
        return updateBalance;
      }
    } else {
      const userCC = await this.userService.findByCcNumber(
        paymentInformation.cc_or_dc_number,
      );
      if (userCC) {
        const updateAvaliableCredit =
          await this.userService.updateCCAvaliableCredit(
            paymentInformation.cc_or_dc_number,
            paymentInformation.amount,
          );
        if (updateAvaliableCredit) {
          return updateAvaliableCredit;
        }
        return updateAvaliableCredit;
      }
    }
    throw new UnauthorizedException();
  }
}
