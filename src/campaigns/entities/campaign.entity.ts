import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('campaings')
export class Campaign {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({
    name: 'user_id',
  })
  userId: string;

  @Column({
    name: 'image_url',
  })
  imageUrl: string;

  @Column({
    name: 'stripe_id',
  })
  stripeId: string;

  @Column({
    name: 'title',
  })
  title: string;

  @Column({
    name: 'price',
  })
  price: string;

  @Column({
    name: 'total_raised',
  })
  totalRaised: string;

  @Column({
    name: 'description',
  })
  description: string;

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
