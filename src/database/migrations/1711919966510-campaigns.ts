import { MigrationInterface, QueryRunner } from 'typeorm';

export class Campaigns1711919966510 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE campaings (
      id SERIAL PRIMARY KEY,
      user_id INTEGER,
      title VARCHAR,
      price VARCHAR,
      stripe_id VARCHAR,
      image_url VARCHAR,         
      description VARCHAR,
      total_raised VARCHAR,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP
  );
  
              `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE campaings CASCADE`);
  }
}
