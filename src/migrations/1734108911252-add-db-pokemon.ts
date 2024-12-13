import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDbPokemon1734108911252 implements MigrationInterface {
    name = 'AddDbPokemon1734108911252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pokemon" ("id" SERIAL NOT NULL, "createdBy" character varying NOT NULL, "updatedBy" character varying, "type1" character varying(255), "type2" character varying(255), "legendary" character varying(255), "image" character varying(255), "ytbUrl" character varying(255), CONSTRAINT "PK_0b503db1369f46c43f8da0a6a0a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "pokemon"`);
    }

}
