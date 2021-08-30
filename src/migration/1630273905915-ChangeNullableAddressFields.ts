import {MigrationInterface, QueryRunner} from "typeorm";

export class ChangeNullableAddressFields1630273905915 implements MigrationInterface {
    name = 'ChangeNullableAddressFields1630273905915'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."addresses" ALTER COLUMN "city" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."addresses" ALTER COLUMN "state" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."addresses" ALTER COLUMN "zipCode" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."addresses" ALTER COLUMN "zipCode" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."addresses" ALTER COLUMN "state" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."addresses" ALTER COLUMN "city" DROP NOT NULL`);
    }

}
