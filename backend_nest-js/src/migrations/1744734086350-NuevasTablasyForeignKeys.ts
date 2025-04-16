import { MigrationInterface, QueryRunner } from "typeorm";

export class NuevasTablasyForeignKeys1744734086350 implements MigrationInterface {
    name = 'NuevasTablasyForeignKeys1744734086350'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`usuarios\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('admin', 'asesor', 'estudiante') NOT NULL, \`estado\` tinyint NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`dni\` varchar(255) NOT NULL, \`usuarioId\` int NULL, UNIQUE INDEX \`REL_d6655cf5853701ab8ac2d7d4d3\` (\`usuarioId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tipo_contrato\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`tipo_contrato\` varchar(255) NOT NULL, \`tipo_entrega\` varchar(255) NOT NULL, \`modalidad\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`tipo_trabajo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cliente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dni\` varchar(255) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`apellido\` varchar(255) NOT NULL, \`telefono\` int NOT NULL, \`email\` varchar(255) NOT NULL, \`url_imagen\` varchar(255) NOT NULL, \`pais\` varchar(255) NOT NULL, \`universidad\` varchar(255) NOT NULL, \`id_tipo_trabajo\` int NULL, \`id_grado_academico\` int NULL, \`id_contrato\` int NULL, \`usuarioId\` int NULL, UNIQUE INDEX \`REL_26eb6132b607fd16d904df0367\` (\`usuarioId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`grado_academico\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`area_asesor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`asesor\` (\`id\` int NOT NULL AUTO_INCREMENT, \`dni\` varchar(255) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`apellido\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`telefono\` int NOT NULL, \`url_imagen\` varchar(255) NOT NULL, \`especialidad\` varchar(255) NOT NULL, \`universidad\` varchar(255) NOT NULL, \`id_area\` int NULL, \`id_grado_academico\` int NULL, \`usuarioId\` int NULL, UNIQUE INDEX \`REL_285f003441aa6855dc95f4c7b8\` (\`usuarioId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`admin\` ADD CONSTRAINT \`FK_d6655cf5853701ab8ac2d7d4d35\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD CONSTRAINT \`FK_510f9c429b02ed90cdb646d3dbf\` FOREIGN KEY (\`id_tipo_trabajo\`) REFERENCES \`tipo_trabajo\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD CONSTRAINT \`FK_3fdf25081e2ee383721afc625d2\` FOREIGN KEY (\`id_grado_academico\`) REFERENCES \`grado_academico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD CONSTRAINT \`FK_d9dc549ba4376674665ac88bdaa\` FOREIGN KEY (\`id_contrato\`) REFERENCES \`tipo_contrato\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cliente\` ADD CONSTRAINT \`FK_26eb6132b607fd16d904df0367d\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`asesor\` ADD CONSTRAINT \`FK_31c3d36ed1fd055597ab389da36\` FOREIGN KEY (\`id_area\`) REFERENCES \`area_asesor\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`asesor\` ADD CONSTRAINT \`FK_cc2a52d979ab00d8b94b3a8d9ed\` FOREIGN KEY (\`id_grado_academico\`) REFERENCES \`grado_academico\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`asesor\` ADD CONSTRAINT \`FK_285f003441aa6855dc95f4c7b83\` FOREIGN KEY (\`usuarioId\`) REFERENCES \`usuarios\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`asesor\` DROP FOREIGN KEY \`FK_285f003441aa6855dc95f4c7b83\``);
        await queryRunner.query(`ALTER TABLE \`asesor\` DROP FOREIGN KEY \`FK_cc2a52d979ab00d8b94b3a8d9ed\``);
        await queryRunner.query(`ALTER TABLE \`asesor\` DROP FOREIGN KEY \`FK_31c3d36ed1fd055597ab389da36\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP FOREIGN KEY \`FK_26eb6132b607fd16d904df0367d\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP FOREIGN KEY \`FK_d9dc549ba4376674665ac88bdaa\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP FOREIGN KEY \`FK_3fdf25081e2ee383721afc625d2\``);
        await queryRunner.query(`ALTER TABLE \`cliente\` DROP FOREIGN KEY \`FK_510f9c429b02ed90cdb646d3dbf\``);
        await queryRunner.query(`ALTER TABLE \`admin\` DROP FOREIGN KEY \`FK_d6655cf5853701ab8ac2d7d4d35\``);
        await queryRunner.query(`DROP INDEX \`REL_285f003441aa6855dc95f4c7b8\` ON \`asesor\``);
        await queryRunner.query(`DROP TABLE \`asesor\``);
        await queryRunner.query(`DROP TABLE \`area_asesor\``);
        await queryRunner.query(`DROP TABLE \`grado_academico\``);
        await queryRunner.query(`DROP INDEX \`REL_26eb6132b607fd16d904df0367\` ON \`cliente\``);
        await queryRunner.query(`DROP TABLE \`cliente\``);
        await queryRunner.query(`DROP TABLE \`tipo_trabajo\``);
        await queryRunner.query(`DROP TABLE \`tipo_contrato\``);
        await queryRunner.query(`DROP INDEX \`REL_d6655cf5853701ab8ac2d7d4d3\` ON \`admin\``);
        await queryRunner.query(`DROP TABLE \`admin\``);
        await queryRunner.query(`DROP TABLE \`usuarios\``);
    }

}
