import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payments Stripe')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  create(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.create(createPaymentDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.paymentsService.findAll(id);
  }
  @Post('stripe/webhook')
  webhook(@Body() stripeBody: any) {
    return this.paymentsService.webhook(stripeBody);
  }
}
