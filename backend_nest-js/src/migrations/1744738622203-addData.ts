// import { MigrationInterface, QueryRunner } from "typeorm";
// import * as bcrypt from 'bcrypt'


// export class AddData1744738622203 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         const dni_cliente=12345678
//         const dni_asesor=87654321

//         const hashedPassword_cliente=await bcrypt.hash(`${dni_cliente}`, 10);
//         const hashedPassword_asesor=await bcrypt.hash(`${dni_asesor}`, 10);

//         const correo_cliente="juantinoco23@gmail.com"
//         const correo_asesor="alonso12bernal@gmail.com"
//         await queryRunner.query(`
//             INSERT INTO pruebaalejandria.tipo_trabajo (id, nombre) VALUES ('1', 'Tesina');
//             INSERT INTO pruebaalejandria.tipo_trabajo (id, nombre) VALUES ('2', 'Tesis Titulacion');
//             INSERT INTO pruebaalejandria.tipo_trabajo (id, nombre) VALUES ('3', 'Tesis Maestria');

//             INSERT INTO pruebaalejandria.grado_academico (id, nombre) VALUES ('1', 'Estudiante Pregrado');
//             INSERT INTO pruebaalejandria.grado_academico (nombre) VALUES ('Bachiller');
//             INSERT INTO pruebaalejandria.grado_academico (nombre) VALUES ('Titulado');
//             INSERT INTO pruebaalejandria.grado_academico (nombre) VALUES ('Maestria');
//             INSERT INTO pruebaalejandria.grado_academico (nombre) VALUES ('Doctorado');

//             INSERT INTO pruebaalejandria.area_asesor (nombre) VALUES ('Negocio/Legal');
//             INSERT INTO pruebaalejandria.area_asesor (nombre) VALUES ('Social');
//             INSERT INTO pruebaalejandria.area_asesor (nombre) VALUES ('Salud');
//             INSERT INTO pruebaalejandria.area_asesor (nombre) VALUES ('Ingenieria');

//             INSERT INTO pruebaalejandria.tipo_contrato (id, nombre, tipo_contrato, tipo_entrega, modalidad) VALUES ('1', 'Contado/Avance/Individual', 'contado', 'avance', 'individual');
            
//             `)
//         await queryRunner.query(`
//             INSERT INTO pruebaalejandria.usuarios(username,password,role,estado) VALUES (${correo_cliente},${hashedPassword_cliente},"estudiante",1);
//             INSERT INTO pruebaalejandria.usuarios(username,password,role,estado) VALUES (${correo_asesor},${hashedPassword_asesor},"estudiante",1)
//             `)
//         await queryRunner.query(`
//             INSERT INTO pruebaalejandria.cliente(dni,nombre,apellido,telefono,email,url_imagen,pais,universidad,id_tipo_trabajo,id_grado_academico,id_contrato,usuarioId) VALUES (${dni_cliente},"Juan","Tinoco",12345678,${correo_cliente},"http:downloader/api/users/photos","Peru"," UNMSM",2,1,1,1);
//             INSERT INTO pruebaalejandria.asesor(dni,nombre,apellido,email,telefono,url_imagen,especialidad,universidad,id_area,id_grado_academico,usuarioId) values (${dni_asesor},"Alonso","Bernal",${correo_asesor},87654321,"http://worlwide/images/person2","Financias empresariales","Universidad Nacional Agraria La Molina",1,3,2)
//             `)
//     }

//     public async down(queryRunner: QueryRunner): Promise<void> {
//     }

// }

import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';

export class AddData1744738622203 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const dni_cliente = 12345678;
    const dni_asesor = 87654321;

    const hashedPassword_cliente = await bcrypt.hash(`${dni_cliente}`, 10);
    const hashedPassword_asesor = await bcrypt.hash(`${dni_asesor}`, 10);

    const correo_cliente = "juantinoco23@gmail.com";
    const correo_asesor = "alonso12bernal@gmail.com";

    // Insert datos básicos
    await queryRunner.query(`
        INSERT INTO pruebaalejandria.tipo_trabajo (id, nombre) VALUES 
          (1, 'Tesina'),
          (2, 'Tesis Titulacion'),
          (3, 'Tesis Maestria');
      `);
      
      await queryRunner.query(`
        INSERT INTO pruebaalejandria.grado_academico (id, nombre) VALUES 
          (1, 'Estudiante Pregrado'),
          (2, 'Bachiller'),
          (3, 'Titulado'),
          (4, 'Maestria'),
          (5, 'Doctorado');
      `);
      
      await queryRunner.query(`
        INSERT INTO pruebaalejandria.area_asesor (id, nombre) VALUES 
          (1, 'Negocio/Legal'),
          (2, 'Social'),
          (3, 'Salud'),
          (4, 'Ingenieria');
      `);
      
      await queryRunner.query(`
        INSERT INTO pruebaalejandria.tipo_contrato (id, nombre, tipo_contrato, tipo_entrega, modalidad) VALUES 
          (1, 'Contado/Avance/Individual', 'contado', 'avance', 'individual');
      `);

    await queryRunner.query(`
      INSERT INTO pruebaalejandria.usuarios (id, username, password, role, estado) VALUES 
        (1, '${correo_cliente}', '${hashedPassword_cliente}', 'estudiante', 1),
        (2, '${correo_asesor}', '${hashedPassword_asesor}', 'asesor', 1);
    `);

    await queryRunner.query(`
        INSERT INTO pruebaalejandria.cliente (
          dni, nombre, apellido, telefono, email, url_imagen, pais, universidad,
          id_tipo_trabajo, id_grado_academico, id_contrato, usuarioId
        ) VALUES (
          ${dni_cliente}, 'Juan', 'Tinoco', 12345678, '${correo_cliente}', 
          'http://downloader/api/users/photos', 'Peru', 'UNMSM', 
          2, 1, 1, 1
        );
      `);
      
      await queryRunner.query(`
        INSERT INTO pruebaalejandria.asesor (
          dni, nombre, apellido, email, telefono, url_imagen, especialidad, 
          universidad, id_area, id_grado_academico, usuarioId
        ) VALUES (
          ${dni_asesor}, 'Alonso', 'Bernal', '${correo_asesor}', 87654321, 
          'http://worlwide/images/person2', 'Financias empresariales', 
          'Universidad Nacional Agraria La Molina', 1, 3, 2
        );
      `);
  }

//   public async down(queryRunner: QueryRunner): Promise<void> {
//     await queryRunner.query(`
//       DELETE FROM pruebaalejandria.cliente WHERE dni = 12345678;
//       DELETE FROM pruebaalejandria.asesor WHERE dni = 87654321;
//       DELETE FROM pruebaalejandria.usuarios WHERE username IN ('juantinoco23@gmail.com', 'alonso12bernal@gmail.com');

//       DELETE FROM pruebaalejandria.tipo_contrato WHERE id = 1;
//       DELETE FROM pruebaalejandria.area_asesor WHERE id IN (1, 2, 3, 4);
//       DELETE FROM pruebaalejandria.grado_academico WHERE id IN (1, 2, 3, 4, 5);
//       DELETE FROM pruebaalejandria.tipo_trabajo WHERE id IN (1, 2, 3);
//     `);
//   }
public async down(queryRunner: QueryRunner): Promise<void> {
    // Eliminar datos relacionados con cliente
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.cliente WHERE dni = 12345678;
    `);

    // Eliminar datos relacionados con asesor
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.asesor WHERE dni = 87654321;
    `);

    // Eliminar usuarios por correo electrónico
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.usuarios WHERE username = 'juantinoco23@gmail.com';
    `);
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.usuarios WHERE username = 'alonso12bernal@gmail.com';
    `);

    // Eliminar tipo de contrato
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.tipo_contrato WHERE id = 1;
    `);

    // Eliminar área de asesor
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.area_asesor WHERE id = 1;
    `);
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.area_asesor WHERE id = 2;
    `);
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.area_asesor WHERE id = 3;
    `);
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.area_asesor WHERE id = 4;
    `);

    // Eliminar grados académicos
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.grado_academico WHERE id = 1;
    `);
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.grado_academico WHERE id = 2;
    `);
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.grado_academico WHERE id = 3;
    `);
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.grado_academico WHERE id = 4;
    `);
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.grado_academico WHERE id = 5;
    `);

    // Eliminar tipos de trabajo
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.tipo_trabajo WHERE id = 1;
    `);
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.tipo_trabajo WHERE id = 2;
    `);
    await queryRunner.query(`
      DELETE FROM pruebaalejandria.tipo_trabajo WHERE id = 3;
    `);
}
}
