import {MigrationInterface, QueryRunner} from "typeorm";

export class GenerateBasicSchema1630205763996 implements MigrationInterface {
    name = 'GenerateBasicSchema1630205763996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "users_type_enum" AS ENUM('private individual', 'legal entity')`);
        await queryRunner.query(`CREATE TYPE "users_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "type" "users_type_enum" NOT NULL, "name" character varying NOT NULL, "document" character varying NOT NULL, "gender" "users_gender_enum" NOT NULL, "dateOfBirth" date NOT NULL, "email" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "cellphoneNumber" character varying NOT NULL, "photo" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "addresses" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL, "updatedAt" TIMESTAMP NOT NULL, "streetName" character varying NOT NULL, "number" character varying DEFAULT 's/n', "complement" character varying, "neighborhood" character varying, "city" character varying, "state" character varying, "zipCode" character varying, "userId" integer, CONSTRAINT "PK_745d8f43d3af10ab8247465e450" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "addresses" ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "addresses" DROP CONSTRAINT "FK_95c93a584de49f0b0e13f753630"`);
        await queryRunner.query(`DROP TABLE "addresses"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "users_gender_enum"`);
        await queryRunner.query(`DROP TYPE "users_type_enum"`);
    }

}
