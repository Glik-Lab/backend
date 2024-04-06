import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('payments')
export class Payment {
  @PrimaryColumn({ name: 'id' })
  id: string;

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
    default: () => 'CURRENT_TIMESTAMP',
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
