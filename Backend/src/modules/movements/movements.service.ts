import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { TransferDto } from './dto/transfer.dto';
import { UserService } from '../user/user.service';
import { ServicePaymentDto } from './dto/servicePayment.dto';
import { MovementsDto } from './dto/movements.dto';
import { PayCCardDto } from './dto/payCCard.dto';

@Injectable()
export class MovementsService {
  constructor(private userService: UserService) {}

  async getMovements(dc_number: MovementsDto) {
    const user = await this.userService.findByDcNumber(dc_number.dc_number);
    if (user) {
      const userMovements = await this.userService.getMovements(user._id);
      if (userMovements) return userMovements;
    }
    throw new InternalServerErrorException();
  }

  async transfer(transferInformation: TransferDto) {
    const originDC = await this.userService.findByDcNumber(
      transferInformation.origin,
    );
    const destinationDC = await this.userService.findByDcNumber(
      transferInformation.destination,
    );
    console.log(originDC);
    console.log(destinationDC);
    const updateOrigin = await this.userService.updateDebitCardBalance(
      false,
      transferInformation.origin,
      transferInformation.amount,
    );
    const updateDestination = await this.userService.updateDebitCardBalance(
      true,
      transferInformation.destination,
      transferInformation.amount,
    );
    console.log(updateOrigin);
    console.log(updateDestination);
    if (updateOrigin && updateDestination) {
      const movementOrigin = await this.userService.createMovement(
        originDC['_id'],
        transferInformation.amount,
        transferInformation.destination,
        transferInformation.origin,
        'Transferencia',
        'Egreso',
      );
      const movementDestination = await this.userService.createMovement(
        destinationDC['_id'],
        transferInformation.amount,
        transferInformation.destination,
        transferInformation.origin,
        'Transferencia',
        'Ingreso',
      );
      console.log(movementOrigin);
      console.log(movementDestination);
      return [updateOrigin, updateDestination];
    }
    throw new InternalServerErrorException();
  }

  async payCCard(paymentInformation: PayCCardDto) {
    const originDC = await this.userService.findByDcNumber(
      paymentInformation.dc_number,
    );
    // const destinationCC = await this.userService.findByCcNumber(
    //   paymentInformation.cc_number,
    // );
    // console.log(originDC);
    // console.log(destinationCC);
    const updateOrigin = await this.userService.updateDebitCardBalance(
      false,
      paymentInformation.dc_number,
      paymentInformation.amount,
    );
    const updateDestination = await this.userService.updateCCAvaliableCredit(
      paymentInformation.cc_number,
      paymentInformation.amount,
      true,
    );
    console.log(updateOrigin);
    console.log(updateDestination);
    if (updateOrigin && updateDestination) {
      const movementOrigin = await this.userService.createMovement(
        originDC['_id'],
        paymentInformation.amount,
        paymentInformation.cc_number,
        paymentInformation.dc_number,
        'Pago de tarjeta de crédito',
        'Egreso',
      );

      console.log(movementOrigin);
      return [updateOrigin, updateDestination];
    }
    throw new InternalServerErrorException();
  }

  async payService(paymentInformation: ServicePaymentDto) {
    const userDC = await this.userService.findByDcNumber(
      paymentInformation.cc_or_dc_number,
    );
    if (userDC) {
      const updateBalance = await this.userService.updateDebitCardBalance(
        false,
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
            false,
          );
        if (updateAvaliableCredit) {
          return updateAvaliableCredit;
        }
        return updateAvaliableCredit;
      }
    }
    throw new InternalServerErrorException();
  }
}
