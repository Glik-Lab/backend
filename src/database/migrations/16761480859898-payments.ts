import { MigrationInterface, QueryRunner } from 'typeorm';

export class payments16761480859898 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE payments (
      id SERIAL PRIMARY KEY,
      user_id int8,
      campaing_id int8,      
      stripe_id VARCHAR,            
      status VARCHAR,
      price VARCHAR,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP
  );
  
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE payments CASCADE`);
  }
}
