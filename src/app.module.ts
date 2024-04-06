import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CampaignsModule } from './campaigns/campaigns.module';
import { Campaign } from './campaigns/entities/campaign.entity';
import { Payment } from './payments/entities/payment.entity';
import { PaymentsModule } from './payments/payments.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './vars/.development.env',
    }),
    // // TypeOrmModule.forRoot({
    // //   type: 'postgres',
    // //   host: process.env.DB_HOST,
    // //   port: +process.env.DB_PORT,
    // //   username: process.env.DB_USERNAME,
    // //   password: process.env.DB_PASSWORD,
    // //   database: process.env.DB_NAME,
    // //   entities: [User, Campaign, Payment],
    // //   migrations: [__dirname + '/database/migrations'],
    // //   synchronize: process.env.SYNCHRONIZE == 'TRUE' ? true : false,
    // //   logging: process.env.LOGGING == 'TRUE' ? true : false,
    // }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './public/database.sqlite',
      entities: [User, Campaign, Payment],
      synchronize: true,
    }),
    UsersModule,
    CampaignsModule,
    PaymentsModule,
  ],
})
export class AppModule {}
