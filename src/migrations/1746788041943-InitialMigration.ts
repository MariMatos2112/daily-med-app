import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialMigration1746788041943 implements MigrationInterface {
  name = 'InitialMigration1746788041943';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "drugs" ("id" character varying NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3788abdeb2ec977862b17351ad" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "drug_indications" ("id" SERIAL NOT NULL, "drug_id" character varying NOT NULL, "icd_10_code" character varying(10) NOT NULL, "name" character varying(120) NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_47ee94555218e7be1d0af048080" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "email" character varying(100) NOT NULL, "password_hash" character varying(255) NOT NULL, "role" character varying(50) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "drug_indications" ADD CONSTRAINT "FK_5bed372ff068cdc87c57ce2a126" FOREIGN KEY ("drug_id") REFERENCES "drugs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "drug_indications" DROP CONSTRAINT "FK_5bed372ff068cdc87c57ce2a126"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "drug_indications"`);
    await queryRunner.query(`DROP TABLE "drugs"`);
  }
}
