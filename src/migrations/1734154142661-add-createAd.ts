import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCreateAd1734154142661 implements MigrationInterface {
    name = 'AddCreateAd1734154142661'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "createdAt" TIMESTAMP DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "createdAt"`);
    }

}
