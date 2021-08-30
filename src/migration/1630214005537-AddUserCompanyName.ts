import {MigrationInterface, QueryRunner} from "typeorm";

export class AddUserCompanyName1630214005537 implements MigrationInterface {
    name = 'AddUserCompanyName1630214005537'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" ADD "companyName" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."users" DROP COLUMN "companyName"`);
    }

}
