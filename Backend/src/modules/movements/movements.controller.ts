import { Controller, Body, ValidationPipe, Post } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { TransferDto } from './dto/transfer.dto';
import { ServicePaymentDto } from './dto/servicePayment.dto';
// import { PaymentServiceDto } from './dto/update-user.dto';

@Controller('movements')
export class MovementsController {
  constructor(private movementsService: MovementsService) {}

  @Post('transfer')
  async transfer(@Body(new ValidationPipe()) transferInfo: TransferDto) {
    return {
      data: await this.movementsService.transfer(transferInfo),
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
