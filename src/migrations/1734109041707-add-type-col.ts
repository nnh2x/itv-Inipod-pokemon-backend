import { MigrationInterface, QueryRunner } from "typeorm";

export class AddTypeCol1734109041707 implements MigrationInterface {
    name = 'AddTypeCol1734109041707'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "total" integer`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "hp" integer`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "attack" integer`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "defense" integer`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "spAttack" integer`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "spDefense" integer`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "speed" integer`);
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "generation" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "generation"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "speed"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "spDefense"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "spAttack"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "defense"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "attack"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "hp"`);
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "total"`);
    }

}
