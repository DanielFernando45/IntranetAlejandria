import { MigrationInterface, QueryRunner } from "typeorm";
import * as bcrypt from 'bcrypt';

export class Registros1746554350124 implements MigrationInterface {
  name="Registros1746554350124"

     public async up(queryRunner: QueryRunner): Promise<void> {
          const usuarios = [
            { id: 1, dni: 12345678, correo: "juantinoco23@gmail.com", role: "estudiante", nombre: "Juan Carlos", apellido: "Tinoco Ramírez", telefono: 12345678, universidad: "UNMSM", grado: 1, carrera: "Derecho" },
            { id: 2, dni: 4567890, correo: "gabrielv45@gmail.com", role: "estudiante", nombre: "Gabriel Alejandro", apellido: "Vargas León", telefono: 98982131, universidad: "UNI", grado: 2, carrera: "Ingeniería de Sistemas" },
            { id: 3, dni: 11223344, correo: "lauraq92@gmail.com", role: "estudiante", nombre: "Laura Daniela", apellido: "Quispe Torres", telefono: 99887766, universidad: "PUCP", grado: 2, carrera: "Arquitectura" },
            { id: 4, dni: 22334455, correo: "carlosmendez90@gmail.com", role: "estudiante", nombre: "Carlos Enrique", apellido: "Méndez Suárez", telefono: 98765432, universidad: "UNI", grado: 3, carrera: "Ingeniería Electrónica" },
            { id: 5, dni: 33445566, correo: "vanesalopez@gmail.com", role: "estudiante", nombre: "Vanesa María", apellido: "López Gutiérrez", telefono: 97654321, universidad: "UNFV", grado: 1, carrera: "Educación Secundaria" },
            { id: 6, dni: 55667788, correo: "marianagomez12@gmail.com", role: "estudiante", nombre: "Mariana Sofía", apellido: "Gómez Rojas", telefono: 94567231, universidad: "UPC", grado: 3, carrera: "Administración de Empresas" },
            { id: 7, dni: 66778899, correo: "ricardoalvarez90@gmail.com", role: "estudiante", nombre: "Ricardo Esteban", apellido: "Álvarez Paredes", telefono: 93214567, universidad: "USIL", grado: 2, carrera: "Marketing" },
            { id: 8, dni: 77889900, correo: "florenciaavila21@gmail.com", role: "estudiante", nombre: "Florencia Isabel", apellido: "Ávila Mendoza", telefono: 98712345, universidad: "UNMSM", grado: 1, carrera: "Psicología" },
            { id: 9, dni: 88990011, correo: "andresmora23@gmail.com", role: "estudiante", nombre: "Andrés Felipe", apellido: "Mora Castillo", telefono: 93456782, universidad: "UTP", grado: 2, carrera: "Ingeniería Industrial" },
            { id: 10, dni: 99001122, correo: "melissaruiz18@gmail.com", role: "estudiante", nombre: "Melissa Andrea", apellido: "Ruiz Delgado", telefono: 94821345, universidad: "UNMSM", grado: 3, carrera: "Medicina Humana" }
          ];
      
          const asesores = [
            { id: 11, dni: 70000312, correo: "Solis_Diana11@gmail.com",role:"asesor", nombre: "Diana Alexandra", apellido: "Solis Rios", telefono: 958309003, area: 3, grado: 4, especialidad: "Gestion de los servicios de la salud", universidad: "Universidad Cesar Vallejo" },
            { id: 12, dni: 75834615, correo: "Victor_Avendaño12@gmail.com",role:"asesor",nombre:"Victor Alfonso", apellido: "Avendaño Jave", telefono: 933014331, area: 5, grado: 4, especialidad: "Maestria en derecho civil", universidad: "Universidad Privada Norbert Wiener" },
            { id: 13, dni: 75359423, correo: "Olenka_Meza13@gmail.com", role:"asesor",nombre: "Olenka Ethel", apellido: "Mogrovejo Meza", telefono: 967499479, area: 4, grado: 3, especialidad: "Ingenieria Industrial", universidad: "Universidad Cesar Vallejo" },
            { id: 14, dni: 74569542, correo: "grecia_salazar14@gmail.com", role:"asesor",nombre: "Grecia Alexi Fernanda", apellido: "Salazar Valera", telefono: 926530923, area: 1, grado: 3, especialidad: "Contadoria Publica", universidad: "Universidad Cesar Vallejo" },
            { id: 15, dni: 75082592, correo: "brenda_lucia15@gmail.com", role:"asesor",nombre: "Brenda Lucia", apellido: "Castillo Rodriguez", telefono: 917732296, area: 1, grado: 3, especialidad: "Linguistica", universidad: "Universidad nacional Federico Villareal" },
            { id: 16, dni: 72729085, correo: "Roman_Solano16@gmail.com", role:"asesor",nombre: "Israel Anthony", apellido: "Roman Solano", telefono: 994195709, area: 3, grado: 3, especialidad: "Psicologia", universidad: "Universidad Nacional Mayor de San marcos" },
            { id: 17, dni: 72951640, correo: "Daniel_Emmerson17@gmail.com", role:"asesor",nombre: "Daniel Emmerson", apellido: "Dominguez Lope", telefono: 977587126, area: 1, grado: 3, especialidad: "Economia publica", universidad: "Universidad Nacional Mayor de San marcos" },
            { id: 18, dni: 76087518, correo: "Emmanuel_Flores18@gmail.com", role:"asesor",nombre: "Emanuel Oswaldo", apellido: "Flores Utos", telefono: 937213818, area: 4, grado: 4, especialidad: "Gestion publica", universidad: "Universidad San Ignacio de Loyola" },
            { id: 19, dni: 46540926, correo: "Heredia_Lidia19@gmail.com", role:"asesor",nombre: "Lidia Balbina", apellido: "Heredia Falla", telefono: 940154863, area: 2, grado: 3, especialidad: "Psicologia", universidad: "Universidad Cesar Vallejo" },
            { id: 20, dni: 71980097, correo: "Salazar_Nieto@gmail.com", role:"asesor",nombre: "Haider Dante", apellido: "Salazar Nieto", telefono: 903038968, area: 4, grado: 3, especialidad: "Ingenieria Electronica", universidad: "Universidad Tecnologica del Peru" }
          ];
      
          const admins = [
            { id: 21, dni: 45475734, correo: "moreno_karen21@gmail.com",role:"admin", nombre: "Karen Moreno" },
            { id: 22, dni: 12131415, correo: "sofiaram@gmail.com",role:"admin", nombre: "Sofía Ramírez" },
            { id: 23, dni: 13141516, correo: "ernestou@gmail.com",role:"admin", nombre: "Ernesto Ulloa" }
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
                (1, 'Investigacion Sistema tributario','Administracion tributaria','proyecto',3,1,'activo', '2025-04-01 08:00:00', '2025-04-30 17:00:00'),
                (2, 'Trabajo Ingenieria Industrial','Magister en Ingenieria Industrial','completo',3,5,'activo','2025-05-11 09:00:00','2025-09-16 08:00:00');
            `);
      
            // Insertar proceso de asesoría vinculando al cliente y al asesor
            await queryRunner.query(`
                INSERT INTO Alejandria.procesos_asesoria (id, id_cliente, id_asesor,id_asesoramiento) VALUES 
                (1, 1, 1, 1),
                (2, 2, 1, 1);
            `);
            await queryRunner.query(`
                INSERT INTO Alejandria.procesos_asesoria (id, id_cliente, id_asesor,id_asesoramiento) VALUES 
                (3, 3, 2, 2),
                (4, 1, 2, 2),
                (5, 2, 2, 2),
                (6, 4, 2, 2);
            `);
            await queryRunner.query(`
                INSERT INTO Alejandria.asunto (id,titulo, estado, fecha_entregado, fecha_revision, fecha_terminado, id_asesoramiento)
                VALUES
                (1,'Revisado Avance 1', 'terminado', '2025-05-01 10:00:00', '2025-05-06 13:45:00', '2025-05-14 16:00:00', 1),
                (2,'Correcion parcial', 'proceso', '2025-05-10 09:00:00', '2025-05-10 14:00:00', '2025-05-15 14:00:00', 1),
                (3,'Entrega Final', 'entregado', '2025-05-20 11:30:00', NULL , NULL , 1);
            `);
            await queryRunner.query(`
                INSERT INTO Alejandria.asunto (id,titulo, estado, fecha_entregado, fecha_revision, fecha_terminado, id_asesoramiento)
                VALUES
                (4,'Revision Antecedentes', 'terminado', '2025-05-02 10:00:00', '2025-05-04 13:45:00', '2025-05-10 16:00:00', 2),
                (5,'Correcion Justificacion', 'proceso', '2025-05-11 09:00:00', '2025-05-12 14:00:00', '2025-05-15 14:00:00', 2),
                (6,'Entrega de objetivos', 'entregado', '2025-05-22 11:30:00', NULL , NULL , 2),
                (7,'Entrega de metodologia', 'entregado', '2025-05-23 11:30:00', NULL , NULL , 2);
            `);
            //Documentos
            await queryRunner.query(`
                INSERT INTO Alejandria.documento(id,nombre, ruta, subido_por, created_at, id_asunto)
                VALUES
                (1,'Introduccion.docx','http://localhost:3001/files/product/013ae2a4-7064-4564-9be5-587d9e0960c9.vnd.openxmlformats-officedocument.wordprocessingml.document','estudiante','2025-05-01 10:00:00',1),
                (2,'Justificacion.pdf','http://localhost:3001/files/product/401ff9ea-a846-4847-b6f3-8c176a5ed28a.pdf','estudiante','2025-05-01 10:00:00',1),
                (3,'Antecedentes.xslx','http://localhost:3001/files/product/5db587a8-3961-4f6f-a071-aa7ab9ee2783.vnd.openxmlformats-officedocument.spreadsheetml.sheet','estudiante','2025-05-02 10:00:00',4),
                (4,'Tesis_parcial.mp4','http://localhost:3001/files/product/0c6bb221-0624-438f-a7e4-95ff3b2d1414.mp4','estudiante','2025-05-10 09:00:00',2),
                (5,'Revision_Antecedentes.pptx','http://localhost:3001/files/product/f80ce8fc-af74-43dd-90e2-45fac1d1b4e0.vnd.openxmlformats-officedocument.presentationml.presentation','asesor','2025-05-10 14:00:00',4),
                (6,'Justificacion_Corregida.jpeg','http://localhost:3001/files/product/105dfa71-32df-4adc-b89b-864669734213.jpeg','estudiante','2025-05-11 09:00:00',5),
                (7,'Revision_Introduccion.png','http://localhost:3001/files/product/493111ef-7525-414f-891f-becb81f7aaf4.png','asesor','2025-05-14 16:00:00',1),
                (8,'Revision_Justificacion.webp','http://localhost:3001/files/product/3c2eb1e4-91ef-411b-94c2-7f88fa0f87f5.webp','asesor','2025-05-14 16:00:00',1),
                (9,'Documento_Final.gif','http://localhost:3001/files/product/a1d4105c-8653-42c7-86d6-ec8c76706854.gif','estudiante','2025-05-20 11:30:00',3),
                (10,'Objetivos_Generales.rar','http://localhost:3001/files/product/3e18078b-36ed-4e02-82d5-1105e5576b93.vnd.rar','estudiante','2025-05-22 11:30:00',6),
                (11,'Objetivos_Especificos.zip','http://localhost:3001/files/product/73d80ca0-6a46-46d9-b5ce-a024df5a0053.zip','estudiante','2025-05-22 11:30:00',6),
                (12,'Metodologia_1ra_parte.7z', 'http://localhost:3001/files/product/09949cfc-6cd8-4394-bbd7-ce0ccdcd8291.x-7z-compressed','estudiante','2025-05-23 11:30:00',7),
                (13,'Entrega_Metodologia_v2.pdf','http://localhost:3001/files/product/5974b5e0-cab0-470c-be12-0e1179d0b98f.pdf','estudiante','2025-05-23 11:30:00',7),
                (14,'Metricas_Metodologia.docx','http://localhost:3001/files/product/9d2ba25a-123b-40ba-9b38-966d422dc6ca.vnd.openxmlformats-officedocument.wordprocessingml.document','estudiante','2025-05-23 11:30:00',7);
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
