import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'user_id',
  })
  userId: string;

  @Column({
    name: 'stripe_id',
  })
  stripeId: string;

  @Column({
    name: 'campaing_id',
  })
  campaingId: string;

  @Column({
    name: 'status',
  })
  status: string;

  @Column({
    name: 'price',
  })
  price: string;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    default: null,
  })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', default: null })
  deletedAt: Date;
}
