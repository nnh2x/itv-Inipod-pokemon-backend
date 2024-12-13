import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColName1734113045729 implements MigrationInterface {
    name = 'AddColName1734113045729'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" ADD "name" character varying(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" DROP COLUMN "name"`);
    }

}
