import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({
    name: 'image_url',
  })
  imageUrl: string;

  @Column({
    name: 'wallet',
  })
  wallet: string;

  @Column({
    name: 'email',
  })
  email: string;

  @Column({
    name: 'full_name',
  })
  fullName: string;

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
