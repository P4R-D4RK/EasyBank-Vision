import { Module } from '@nestjs/common';
import { MovementsService } from './movements.service';
import { MovementsController } from './movements.controller';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [UsersModule],
  providers: [MovementsService],
  controllers: [MovementsController],
})
export class MovementsModule {}
