import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';

export class Registros1746554350124 implements MigrationInterface {
  name="Registros1746554350124"

     public async up(queryRunner: QueryRunner): Promise<void> {
          const usuarios = [
            { id: 1, dni: 12345678, correo: "juantinoco23@gmail.com", role: "estudiante", nombre: "Juan", apellido: "Tinoco", telefono: 12345678, universidad: "UNMSM", grado: 1, carrera:"Derecho" },
            { id: 2, dni: 4567890, correo: "gabrielv45@gmail.com", role: "estudiante", nombre: "Gabriel", apellido: "Vargas", telefono: 98982131, universidad: "UNI",grado: 2 , carrera:"Ingenieria de sistemas" },
            { id: 3, dni: 11223344, correo: "lauraq92@gmail.com", role: "estudiante", nombre: "Laura", apellido: "Quispe", telefono: 99887766, universidad: "PUCP", grado: 2, carrera:"Arquitectura" },
            { id: 4, dni: 22334455, correo: "carlosmendez90@gmail.com", role: "estudiante", nombre: "Carlos", apellido: "Mendez", telefono: 98765432, universidad: "UNI", grado: 3, carrera:"Ingenieria electronica" },
            { id: 5, dni: 33445566, correo: "vanesalopez@gmail.com", role: "estudiante", nombre: "Vanesa", apellido: "Lopez", telefono: 97654321, universidad: "UNFV", grado: 1, carrera:"Educacion Secundaria" },
            { id: 6, dni: 44556677, correo: "martinruiz@gmail.com", role: "estudiante", nombre: "Martín", apellido: "Ruiz", telefono: 96543210, universidad: "UNMSM", grado: 2, carrera:"Medicina" },
            { id: 7, dni: 55667788, correo: "elizabethc@gmail.com", role: "estudiante", nombre: "Elizabeth", apellido: "Castro", telefono: 95432109, universidad: "ULima", grado: 3, carrera:"Comunicaciones" },
            { id: 8, dni: 66778899, correo: "franklinb@gmail.com", role: "estudiante", nombre: "Franklin", apellido: "Bravo", telefono: 94321098, universidad: "USMP", grado: 2, carrera:"Enfermeria" }
          ];
      
          const asesores = [
            { id: 11, dni: 70000312, correo: "Solis_Diana11@gmail.com",role:"asesor", nombre: "Diana Alexandra", apellido: "Solis Rios", telefono: 958309003, area: 3, grado: 4, especialidad: "Gestion de los servicios de la salud", universidad: "Universidad Cesar Vallejo" },
            { id: 12, dni: 75834615, correo: "Victor_Avendaño12@gmail.com",role:"asesor",nombre: "Victor Alfonso", apellido: "Avendaño Jave", telefono: 933014331, area: 5, grado: 4, especialidad: "Maestria en derecho civil con mencion en derecho de la familia", universidad: "Universidad Privada Norbert Wiener" },
            { id: 13, dni: 75359423, correo: "Olenka_Meza13@gmail.com", role:"asesor",nombre: "Olenka Ethel", apellido: "Mogrovejo Meza", telefono: 967499479, area: 4, grado: 3, especialidad: "Ingenieria Industrial", universidad: "Universidad Cesar Vallejo" },
            { id: 14, dni: 74569542, correo: "grecia_salazar14@gmail.com", role:"asesor",nombre: "Grecia Alexi Fernanda", apellido: "Salazar Valera", telefono: 926530923, area: 1, grado: 3, especialidad: "Contadoria Publica", universidad: "Universidad Cesar Vallejo" },
            { id: 15, dni: 75082592, correo: "brenda_lucia15@gmail.com", role:"asesor",nombre: "Brenda Lucia", apellido: "Castillo Rodriguez", telefono: 917732296, area: 1, grado: 3, especialidad: "Linguistica", universidad: "Universidad nacional Federico Villareal" },
            { id: 16, dni: 72729085, correo: "Roman_Solano@gmail.com", role:"asesor",nombre: "Israel Anthony", apellido: "Roman Solano", telefono: 994195709, area: 3, grado: 3, especialidad: "Psicologia", universidad: "Universidad Nacional Mayor de San marcos" },
            { id: 17, dni: 72951640, correo: "Daniel_Emmerson@gmail.com", role:"asesor",nombre: "Daniel Emmerson", apellido: "Dominguez Lope", telefono: 977587126, area: 1, grado: 3, especialidad: "Economia con mencion en Economia publica", universidad: "Universidad Nacional Mayor de San marcos" }
          ];
      
          const admins = [
            { id: 18, dni: 45475734, correo: "antonioborges24@gmail.com",role:"admin", nombre: "Antonio Borges" },
            { id: 19, dni: 12131415, correo: "sofiaram@gmail.com",role:"admin", nombre: "Sofía Ramírez" },
            { id: 20, dni: 13141516, correo: "ernestou@gmail.com",role:"admin", nombre: "Ernesto Ulloa" }
          ];
      
    
        // Insert datos básicos
        await queryRunner.query(`
            INSERT INTO Alejandria.tipo_trabajo (id, nombre) VALUES 
              (1, 'Proyecto bachillerato'),
              (2, 'Tesis Pregrado'),
              (3, 'Tesis'),
              (4, 'Tesis Maestria'),
              (5, 'Tesis Doctorado'),
              (6, 'Plan de negocio'),
              (7, 'Revision sistematica'),
              (8, 'Articulo cientifico'),
              (9, 'Estudio de prefactibilidad'),
              (10, 'Suficiencia personal');
          `);
          
          await queryRunner.query(`
            INSERT INTO Alejandria.grado_academico (id, nombre) VALUES 
              (1, 'Estudiante Pregrado'),
              (2, 'Bachiller'),
              (3, 'Licenciado'),
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
              (1, 'Contado/Avance/Individual', 'contado', 'avance', 'individual'),
              (2, 'Contado/Plazo/Individual', 'contado', 'plazo', 'individual'),
              (3, 'Contado/Avance/Grupal', 'contado', 'avance', 'grupal'),
              (4, 'Contado/Plazo/Grupal', 'contado', 'plazo', 'grupal'),
              (5, 'Cuotas/Avance/Individual', 'cuotas', 'avance', 'individual'),
              (6, 'Cuotas/Plazo/Individual', 'cuotas', 'plazo', 'individual'),
              (7, 'Cuotas/Avance/Grupal', 'cuotas', 'avance', 'grupal'),
              (8, 'Cuotas/Plazo/Grupal', 'cuotas', 'plazo', 'grupal');
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
              dni, nombre, apellido, telefono, email, url_imagen, pais, universidad,
               id_grado_academico,carrera, usuarioId
            ) VALUES (
              ${c.dni}, '${c.nombre}', '${c.apellido}', ${c.telefono}, '${c.correo}',
              'http://downloader/api/users/photos', 'Peru', '${c.universidad}',
               ${c.grado},'${c.carrera}', ${c.id}
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
                INSERT INTO Alejandria.asesoramiento (id, profesion_asesoria,especialidad,tipo_servicio,id_tipo_trabajo,id_contrato,estado, fecha_inicio, fecha_fin) VALUES 
                (1, 'Administracion','Administracion tributaria','proyecto',3,1,'activo', '2025-04-01 08:00:00', '2025-04-30 17:00:00');
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
