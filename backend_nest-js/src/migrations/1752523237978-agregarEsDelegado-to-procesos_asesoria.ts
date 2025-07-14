import { MigrationInterface, QueryRunner } from "typeorm";

export class AgregarEsDelegadoToProcesosAsesoria1752523237978 implements MigrationInterface {
    name = 'AgregarEsDelegadoToProcesosAsesoria1752523237978'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`procesos_asesoria\` ADD \`esDelegado\` tinyint NOT NULL DEFAULT 0`);
        await queryRunner.query(`ALTER TABLE \`inducciones\` DROP FOREIGN KEY \`FK_e1241e483398f525206e041650f\``);
        await queryRunner.query(`ALTER TABLE \`inducciones\` CHANGE \`id_asesoramiento\` \`id_asesoramiento\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`inducciones\` ADD CONSTRAINT \`FK_e1241e483398f525206e041650f\` FOREIGN KEY (\`id_asesoramiento\`) REFERENCES \`asesoramiento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`inducciones\` DROP FOREIGN KEY \`FK_e1241e483398f525206e041650f\``);
        await queryRunner.query(`ALTER TABLE \`inducciones\` CHANGE \`id_asesoramiento\` \`id_asesoramiento\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`inducciones\` ADD CONSTRAINT \`FK_e1241e483398f525206e041650f\` FOREIGN KEY (\`id_asesoramiento\`) REFERENCES \`asesoramiento\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`procesos_asesoria\` DROP COLUMN \`esDelegado\``);
    }

}
