import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import Stripe from 'stripe';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(process.env.STRIPE_KEY, {});
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}
  async create(createPaymentDto: CreatePaymentDto): Promise<any> {
    try {
      const checkout = await this.stripe.checkout.sessions.create({
        success_url: process.env.SUCCESS_URL,
        cancel_url: process.env.CANCEL_URL,
        customer_email: createPaymentDto?.userEmail,
        metadata: {
          campaignId: createPaymentDto?.campaignId,
          userId: createPaymentDto?.userId,
        },
        line_items: [
          {
            price_data: {
              currency: 'brl',
              product: createPaymentDto?.productId,
              unit_amount: +createPaymentDto?.campaignPrice * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
      });
      const newCheckout = {
        userId: createPaymentDto?.userId,
        stripeId: checkout?.id,
        campaingId: createPaymentDto?.campaignId,
        status: checkout?.payment_status,
        price: createPaymentDto?.campaignPrice,
      };
      const newPayment = await this.paymentRepository.save(newCheckout);
      return { newPayment, url: checkout?.url };
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.CONFLICT);
    }
  }

  async findAll(campaignId: string): Promise<Payment[]> {
    try {
      return await this.paymentRepository.find({
        where: {
          campaingId: campaignId,
        },
      });
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.NOT_FOUND);
    }
  }

  async findOne(
    stripeId: string,
    userId: string,
    campaignId: string,
  ): Promise<Payment> {
    try {
      return await this.paymentRepository.findOne({
        where: {
          stripeId: stripeId,
          userId: userId,
          campaingId: campaignId,
          status: 'unpaid',
        },
      });
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.NOT_FOUND);
    }
  }

  async webhook(stripeRequest: any): Promise<void> {
    try {
      const type = stripeRequest?.type;
      if (type === 'checkout.session.completed') {
        const metadata = stripeRequest?.data?.object?.metadata;
        const stripeId = stripeRequest?.data?.object?.id;
        const paymentStatus = stripeRequest?.data?.object?.payment_status;
        const payment = await this.findOne(
          stripeId,
          metadata?.userId,
          metadata?.campaignId,
        );
        payment.status = paymentStatus;
        payment.updatedAt = new Date();
        await this.paymentRepository.save(payment);
      }
    } catch (error) {
      throw new HttpException(error?.message, HttpStatus.NOT_FOUND);
    }
  }
}
