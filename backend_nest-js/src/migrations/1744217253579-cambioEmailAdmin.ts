import { MigrationInterface, QueryRunner } from "typeorm";

export class CambioEmailAdmin1744217253579 implements MigrationInterface {
    name = 'CambioEmailAdmin1744217253579'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admin\` CHANGE \`correo\` \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`role\` \`role\` enum ('admin', 'asesor', 'estudiante') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`admin\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`admin\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admin\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`admin\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`usuarios\` CHANGE \`role\` \`role\` enum ('admin', 'asesor', 'cliente') NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`admin\` CHANGE \`email\` \`correo\` varchar(255) NOT NULL`);
    }

}
