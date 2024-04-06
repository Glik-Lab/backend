import { MigrationInterface, QueryRunner } from 'typeorm';

export class users1676148085989 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      image_url VARCHAR,             
      wallet VARCHAR NOT NULL,
      full_name VARCHAR,
      email VARCHAR NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP,
      deleted_at TIMESTAMP
  );
  
          `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE users CASCADE`);
  }
}
