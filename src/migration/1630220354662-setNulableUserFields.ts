import {MigrationInterface, QueryRunner} from "typeorm";

export class setNulableUserFields1630220354662 implements MigrationInterface {
    name = 'setNulableUserFields1630220354662'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "phoneNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "cellphoneNumber" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "photo" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "photo" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "cellphoneNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "phoneNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "public"."users" ALTER COLUMN "email" SET NOT NULL`);
    }

}
