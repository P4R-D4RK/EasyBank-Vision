import { Controller, Body, ValidationPipe, Post } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { TransferDto } from './dto/transfer.dto';
// import { PaymentServiceDto } from './dto/update-user.dto';

@Controller('movements')
export class MovementsController {
  constructor(private movementsService: MovementsService) {}

  @Post('transfer')
  async movements(@Body(new ValidationPipe()) movement: TransferDto) {
    return {
      data: await this.movementsService.transfer(movement),
    };
  }
  // throw new NotFoundException(`Users not found`);
}
