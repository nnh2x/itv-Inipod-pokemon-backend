import { MigrationInterface, QueryRunner } from "typeorm";

export class AddType1734186919689 implements MigrationInterface {
    name = 'AddType1734186919689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "total" double precision`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "total"`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "total" integer`);
    }

}
