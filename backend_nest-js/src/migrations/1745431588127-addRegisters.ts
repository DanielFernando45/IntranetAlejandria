import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';

export class AddRegisters1745431588127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      const usuarios = [
        { id: 1, dni: 12345678, correo: "juantinoco23@gmail.com", role: "estudiante", nombre: "Juan", apellido: "Tinoco", telefono: 12345678, carrera: "Derecho", universidad: "UNMSM", tipo_trabajo: 2, grado: 1 },
        { id: 3, dni: 4567890, correo: "gabrielv45@gmail.com", role: "estudiante", nombre: "Gabriel", apellido: "Vargas", telefono: 98982131, carrera: "Administracion", universidad: "UNI", tipo_trabajo: 3, grado: 2 },
        { id: 5, dni: 11223344, correo: "lauraq92@gmail.com", role: "estudiante", nombre: "Laura", apellido: "Quispe", telefono: 99887766, carrera: "Psicología", universidad: "PUCP", tipo_trabajo: 1, grado: 2 },
        { id: 6, dni: 22334455, correo: "carlosmendez90@gmail.com", role: "estudiante", nombre: "Carlos", apellido: "Mendez", telefono: 98765432, carrera: "Ingeniería Civil", universidad: "UNI", tipo_trabajo: 3, grado: 3 },
        { id: 7, dni: 33445566, correo: "vanesalopez@gmail.com", role: "estudiante", nombre: "Vanesa", apellido: "Lopez", telefono: 97654321, carrera: "Educación", universidad: "UNFV", tipo_trabajo: 2, grado: 1 },
        { id: 8, dni: 44556677, correo: "martinruiz@gmail.com", role: "estudiante", nombre: "Martín", apellido: "Ruiz", telefono: 96543210, carrera: "Enfermería", universidad: "UNMSM", tipo_trabajo: 1, grado: 2 },
        { id: 9, dni: 55667788, correo: "elizabethc@gmail.com", role: "estudiante", nombre: "Elizabeth", apellido: "Castro", telefono: 95432109, carrera: "Marketing", universidad: "ULima", tipo_trabajo: 2, grado: 3 },
        { id: 10, dni: 66778899, correo: "franklinb@gmail.com", role: "estudiante", nombre: "Franklin", apellido: "Bravo", telefono: 94321098, carrera: "Contabilidad", universidad: "USMP", tipo_trabajo: 3, grado: 2 }
      ];
  
      const asesores = [
        { id: 2, dni: 87654321, correo: "alonso12bernal@gmail.com",role:"asesor", nombre: "Alonso", apellido: "Bernal", telefono: 87654321, area: 1, grado: 3, especialidad: "Finanzas empresariales", universidad: "UNALM" },
        { id: 11, dni: 77889900, correo: "marianaz@gmail.com",role:"asesor",nombre: "Mariana", apellido: "Zapata", telefono: 91234567, area: 2, grado: 4, especialidad: "Investigación social", universidad: "PUCP" },
        { id: 12, dni: 88990011, correo: "pedrog@gmail.com", role:"asesor",nombre: "Pedro", apellido: "García", telefono: 92345678, area: 3, grado: 4, especialidad: "Salud pública", universidad: "UNMSM" },
        { id: 13, dni: 99001122, correo: "lucianac@gmail.com", role:"asesor",nombre: "Luciana", apellido: "Cueva", telefono: 93456789, area: 4, grado: 3, especialidad: "Ingeniería de sistemas", universidad: "UNI" },
        { id: 14, dni: 10111213, correo: "ricardop@gmail.com", role:"asesor",nombre: "Ricardo", apellido: "Pérez", telefono: 94567890, area: 5, grado: 5, especialidad: "Derecho penal", universidad: "UNMSM" }
      ];
  
      const admins = [
        { id: 4, dni: 45475734, correo: "antonioborges24@gmail.com",role:"admin", nombre: "Antonio Borges" },
        { id: 15, dni: 12131415, correo: "sofiaram@gmail.com",role:"admin", nombre: "Sofía Ramírez" },
        { id: 16, dni: 13141516, correo: "ernestou@gmail.com",role:"admin", nombre: "Ernesto Ulloa" }
      ];
  

    // Insert datos básicos
    await queryRunner.query(`
        INSERT INTO Alejandria.tipo_trabajo (id, nombre) VALUES 
          (1, 'Proyecto bachillerato'),
          (2, 'Tesis'),
          (3, 'Tesis Maestria'),
          (4, 'Tesis Doctorado'),
          (5, 'Proyecto'),
          (6, 'Informe'),
          (7, 'Plan de negocio'),
          (8, 'Revision sistematica'),
          (9, 'Articulo cientifico'),
          (10, 'Estudio de prefactibilidad'),
          (11, 'Suficiencia personal');
      `);
      
      await queryRunner.query(`
        INSERT INTO Alejandria.grado_academico (id, nombre) VALUES 
          (1, 'Estudiante Pregrado'),
          (2, 'Bachiller'),
          (3, 'Titulado'),
          (4, 'Maestria'),
          (5, 'Doctorado');
      `);
      
      await queryRunner.query(`
        INSERT INTO Alejandria.area_asesor (id, nombre) VALUES 
          (1, 'Negocio'),
          (2, 'Social'),
          (3, 'Salud'),
          (4, 'Ingenieria'),
          (5, 'Legal');
      `);
      
      await queryRunner.query(`
        INSERT INTO Alejandria.tipo_contrato (id, nombre, tipo_contrato, tipo_entrega, modalidad) VALUES 
          (1, 'Contado/Avance/Individual', 'contado', 'avance', 'individual');
      `);

      for (const u of [...usuarios, ...asesores, ...admins]) {
        const hashed = await bcrypt.hash(`${u.dni}`, 10);
        await queryRunner.query(`
          INSERT INTO Alejandria.usuarios (id, username, password, role, estado)
          VALUES (${u.id}, '${u.correo}', '${hashed}', '${u.role || (u.nombre.includes("Ramírez") ? 'admin' : 'asesor')}', 1);
        `);
      }

     // Insertar clientes
     for (const c of usuarios) {
      await queryRunner.query(`
        INSERT INTO Alejandria.cliente (
          dni, nombre, apellido, telefono, email, url_imagen, pais, carrera, universidad,
          id_tipo_trabajo, id_grado_academico, id_contrato, usuarioId
        ) VALUES (
          ${c.dni}, '${c.nombre}', '${c.apellido}', ${c.telefono}, '${c.correo}',
          'http://downloader/api/users/photos', 'Peru', '${c.carrera}', '${c.universidad}',
          ${c.tipo_trabajo}, ${c.grado}, 1, ${c.id}
        );
      `);
    }
      
    // Insertar asesores
    for (const a of asesores) {
      await queryRunner.query(`
        INSERT INTO Alejandria.asesor (
          dni, nombre, apellido, email, telefono, url_imagen, especialidad,
          universidad, id_area, id_grado_academico, usuarioId
        ) VALUES (
          ${a.dni}, '${a.nombre}', '${a.apellido}', '${a.correo}', ${a.telefono},
          'http://worlwide/images/person${a.id}', '${a.especialidad}',
          '${a.universidad}', ${a.area}, ${a.grado}, ${a.id}
        );
      `);
    }
    for (const a of admins) {
      await queryRunner.query(`
        INSERT INTO Alejandria.admin (nombre, email, dni, usuarioId)
        VALUES ('${a.nombre}', '${a.correo}', '${a.dni}', ${a.id});
      `);
    }

        // Insertar asesoramiento
        await queryRunner.query(`
            INSERT INTO Alejandria.asesoramiento (id, estado, fecha_inicio, fecha_fin) VALUES 
            (1, 'activo', '2025-04-01 08:00:00', '2025-04-30 17:00:00');
        `);
  
        // Insertar proceso de asesoría vinculando al cliente y al asesor
        await queryRunner.query(`
            INSERT INTO Alejandria.procesos_asesoria (id, id_cliente, id_asesor,id_asesoramiento) VALUES 
            (1, 1, 1, 1);
        `);
        await queryRunner.query(`
            INSERT INTO Alejandria.procesos_asesoria (id, id_cliente, id_asesor,id_asesoramiento) VALUES 
            (2, 2, 1, 1);
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DELETE FROM Alejandria.procesos_asesoria WHERE id IN (1,2)`);

      // Eliminar asesoramientos
      await queryRunner.query(`DELETE FROM Alejandria.asesoramiento WHERE id = 1`);
    
      // Eliminar registros de admin
      await queryRunner.query(`DELETE FROM Alejandria.admin WHERE usuarioId IN (4, 15, 16)`);
    
      // Eliminar registros de asesor
      await queryRunner.query(`DELETE FROM Alejandria.asesor WHERE usuarioId IN (2, 11, 12, 13, 14)`);
    
      // Eliminar registros de cliente
      await queryRunner.query(`DELETE FROM Alejandria.cliente WHERE usuarioId IN (1, 3, 5, 6, 7, 8, 9, 10)`);
    
      // Eliminar usuarios
      await queryRunner.query(`DELETE FROM Alejandria.usuarios WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16)`);
    
      // Eliminar tipo_contrato
      await queryRunner.query(`DELETE FROM Alejandria.tipo_contrato WHERE id = 1`);
    
      // Eliminar area_asesor
      await queryRunner.query(`DELETE FROM Alejandria.area_asesor WHERE id IN (1, 2, 3, 4, 5)`);
    
      // Eliminar grado_academico
      await queryRunner.query(`DELETE FROM Alejandria.grado_academico WHERE id IN (1, 2, 3, 4, 5)`);
    
      // Eliminar tipo_trabajo
      await queryRunner.query(`DELETE FROM Alejandria.tipo_trabajo WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11)`);
    }

}
