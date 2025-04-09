import { MigrationInterface, QueryRunner } from "typeorm";

export class FirstMigration1744209952524 implements MigrationInterface {
    name = 'FirstMigration1744209952524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('admin', 'asesor', 'cliente') NOT NULL, \`estado\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`correo\` varchar(255) NOT NULL, \`dni\` varchar(255) NOT NULL, \`usuarioId\` int NULL, UNIQUE INDEX \`REL_d6655cf5853701ab8ac2d7d4d3\` (\`usuarioId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`asesor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dni\` varchar(255) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`apellido\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`telefono\` int NOT NULL, \`url_imagen\` varchar(255) NOT NULL, \`area\` varchar(255) NOT NULL, \`especialidad\` varchar(255) NOT NULL, \`id_grado_academico\` varchar(255) NOT NULL, \`universidad\` varchar(255) NOT NULL, \`usuarioId\` int NULL, UNIQUE INDEX \`REL_285f003441aa6855dc95f4c7b8\` (\`usuarioId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cliente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dni\` varchar(255) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`apellido\` varchar(255) NOT NULL, \`telefono\` int NOT NULL, \`email\` varchar(255) NOT NULL, \`url_imagen\` varchar(255) NOT NULL, \`tipo_trabajo\` varchar(255) NOT NULL, \`pais\` varchar(255) NOT NULL, \`id_grado_academico\` varchar(255) NOT NULL, \`universidad\` varchar(255) NOT NULL, \`id_contrato\` varchar(255) NOT NULL, \`usuarioId\` int NULL, UNIQUE INDEX \`REL_26eb6132b607fd16d904df0367\` (\`usuarioId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`admin\` ADD CONSTRAINT \`FK_d6655cf5853701ab8ac2d7d4d35\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`asesor\` ADD CONSTRAINT \`FK_285f003441aa6855dc95f4c7b83\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD CONSTRAINT \`FK_26eb6132b607fd16d904df0367d\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP FOREIGN KEY \`FK_26eb6132b607fd16d904df0367d\``);
        await queryRunner.query(`ALTER TABLE \`asesor\` DROP FOREIGN KEY \`FK_285f003441aa6855dc95f4c7b83\``);
        await queryRunner.query(`ALTER TABLE \`admin\` DROP FOREIGN KEY \`FK_d6655cf5853701ab8ac2d7d4d35\``);
        await queryRunner.query(`DROP INDEX \`REL_26eb6132b607fd16d904df0367\` ON \`cliente\``);
        await queryRunner.query(`DROP TABLE \`cliente\``);
        await queryRunner.query(`DROP INDEX \`REL_285f003441aa6855dc95f4c7b8\` ON \`asesor\``);
        await queryRunner.query(`DROP TABLE \`asesor\``);
        await queryRunner.query(`DROP INDEX \`REL_d6655cf5853701ab8ac2d7d4d3\` ON \`admin\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
    }

}
