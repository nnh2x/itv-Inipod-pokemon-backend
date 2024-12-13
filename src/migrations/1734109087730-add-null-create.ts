import { MigrationInterface, QueryRunner } from "typeorm";

export class AddNullCreate1734109087730 implements MigrationInterface {
    name = 'AddNullCreate1734109087730'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" ALTER COLUMN "createdBy" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemon" ALTER COLUMN "createdBy" SET NOT NULL`);
    }

}
