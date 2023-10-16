import { Controller, Body, ValidationPipe, Post } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { TransferDto } from './dto/transfer.dto';
import { ServicePaymentDto } from './dto/servicePayment.dto';
import { MovementsDto } from './dto/movements.dto';
import { PayCCardDto } from './dto/payCCard.dto';
// import { PaymentServiceDto } from './dto/update-user.dto';

@Controller('movements')
export class MovementsController {
  constructor(private movementsService: MovementsService) {}

  @Post()
  async getMovements(@Body(new ValidationPipe()) dc_number: MovementsDto) {
    return {
      data: await this.movementsService.getMovements(dc_number),
    };
  }

  @Post('transfer')
  async transfer(@Body(new ValidationPipe()) transferInfo: TransferDto) {
    return {
      data: await this.movementsService.transfer(transferInfo),
    };
  }

  @Post('pay-ccard')
  async payCCard(@Body(new ValidationPipe()) payCCardInfo: PayCCardDto) {
    return {
      data: await this.movementsService.payCCard(payCCardInfo),
    };
  }

  @Post('service-payment')
  async paymentService(
    @Body(new ValidationPipe()) paymentInfo: ServicePaymentDto,
  ) {
    return {
      data: await this.movementsService.payService(paymentInfo),
    };
  }
}
