import LayoutApp from "../../layout/LayoutApp";
import { useState } from "react";
import busqueda from "../../assets/icons/busqueda.svg"
import { useNavigate } from "react-router-dom";
import Buscar from "../../Components/Administrador/GestionarUsuario/Buscar";

const GestionarUsuarios = () => {
  const [vista, setVista] = useState("Estudiantes");
  const navigate = useNavigate();

  const handlerAgregarEstudiante = () => {
    navigate('/admin/gestionar-usuarios/agregar-estudiante')
  }

  const handlerAgregarAsesor = () => {
    navigate('/admin/gestionar-usuarios/agregar-asesor')
  }
  const handlerEditarEstudiante = (id) => {
    navigate(`/admin/gestionar-usuarios/editar-estudiante/${id}`)
  }

  const handlerEditarAsesor = () => {
    navigate('/admin/gestionar-usuarios/agregar-asesor')
  }

  const Estudiantes = [
    {
      id: 1,
      nombre: "Antonio Jorge",
      apellido: "Cueva Lopez",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Administrador Negocios",
      Contrato: "Contado/Avance/Individual"
    },
    {
      id: 2,
      nombre: "Juan Mateo",
      apellido: "Pérez Vinlof",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Administrador Internacionales",
      Contrato: "Contado/Avance/Individual"
    },
    {
      id: 3,
      nombre: "María Fernanda",
      apellido: "Gómez Sánchez",
      Fecha_Inicio: "15/03/2023",
      Fecha_Vencimiento: "15/12/2023",
      Carrera: "Ingeniería Sistemas",
      Contrato: "Financiado/Grupal"
    },
    {
      id: 4,
      nombre: "Carlos Andrés",
      apellido: "Martínez Ríos",
      Fecha_Inicio: "01/04/2023",
      Fecha_Vencimiento: "01/04/2024",
      Carrera: "Medicina",
      Contrato: "Contado/Individual"
    },
    {
      id: 5,
      nombre: "Lucía Valentina",
      apellido: "Rodríguez Paz",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Derecho",
      Contrato: "Beca Completa"
    },
    {
      id: 6,
      nombre: "Diego Alejandro",
      apellido: "Hernández Castro",
      Fecha_Inicio: "10/05/2023",
      Fecha_Vencimiento: "10/05/2024",
      Carrera: "Arquitectura",
      Contrato: "Financiado/Individual"
    },
    {
      id: 7,
      nombre: "Sofía Camila",
      apellido: "Díaz Mendoza",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Psicología",
      Contrato: "Contado/Avance/Individual"
    },
    {
      id: 8,
      nombre: "Jorge Luis",
      apellido: "Torres García",
      Fecha_Inicio: "22/06/2023",
      Fecha_Vencimiento: "22/06/2024",
      Carrera: "Ingeniería Civil",
      Contrato: "Financiado/Grupal"
    },
    {
      id: 9,
      nombre: "Ana María",
      apellido: "Vargas Fuentes",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Enfermería",
      Contrato: "Beca Parcial"
    },
    {
      id: 10,
      nombre: "Pedro Pablo",
      apellido: "Silva Rojas",
      Fecha_Inicio: "05/07/2023",
      Fecha_Vencimiento: "05/07/2024",
      Carrera: "Administración Hotelera",
      Contrato: "Contado/Individual"
    },
    {
      id: 11,
      nombre: "Laura Daniela",
      apellido: "Morales Ortiz",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Comunicación Social",
      Contrato: "Contado/Avance/Individual"
    },
    {
      id: 12,
      nombre: "Miguel Ángel",
      apellido: "Cruz Salazar",
      Fecha_Inicio: "18/08/2023",
      Fecha_Vencimiento: "18/08/2024",
      Carrera: "Ingeniería Industrial",
      Contrato: "Financiado/Individual"
    },
    {
      id: 13,
      nombre: "Isabella Sofía",
      apellido: "Romero Vega",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Diseño Gráfico",
      Contrato: "Beca Completa"
    },
    {
      id: 14,
      nombre: "Fernando José",
      apellido: "Navarro Jiménez",
      Fecha_Inicio: "30/09/2023",
      Fecha_Vencimiento: "30/09/2024",
      Carrera: "Economía",
      Contrato: "Contado/Individual"
    },
    {
      id: 15,
      nombre: "Valentina Andrea",
      apellido: "Espinoza León",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Educación Primaria",
      Contrato: "Contado/Avance/Individual"
    },
    {
      id: 16,
      nombre: "Ricardo Antonio",
      apellido: "Mendoza Paredes",
      Fecha_Inicio: "12/10/2023",
      Fecha_Vencimiento: "12/10/2024",
      Carrera: "Ingeniería Mecánica",
      Contrato: "Financiado/Grupal"
    },
    {
      id: 17,
      nombre: "Gabriela Alejandra",
      apellido: "Peña Cordero",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Nutrición",
      Contrato: "Beca Parcial"
    },
    {
      id: 18,
      nombre: "Oscar Eduardo",
      apellido: "Ríos Montes",
      Fecha_Inicio: "25/11/2023",
      Fecha_Vencimiento: "25/11/2024",
      Carrera: "Administración Pública",
      Contrato: "Contado/Individual"
    },
    {
      id: 19,
      nombre: "Daniela Carolina",
      apellido: "Castillo Ruiz",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Medicina Veterinaria",
      Contrato: "Contado/Avance/Individual"
    },
    {
      id: 20,
      nombre: "José Manuel",
      apellido: "Guerrero Soto",
      Fecha_Inicio: "08/12/2023",
      Fecha_Vencimiento: "08/12/2024",
      Carrera: "Ingeniería Eléctrica",
      Contrato: "Financiado/Individual"
    },
    {
      id: 21,
      nombre: "Camila Estefanía",
      apellido: "Lara Morales",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Odontología",
      Contrato: "Beca Completa"
    },
    {
      id: 22,
      nombre: "Luis Fernando",
      apellido: "Soria Delgado",
      Fecha_Inicio: "20/01/2024",
      Fecha_Vencimiento: "20/01/2025",
      Carrera: "Derecho Internacional",
      Contrato: "Contado/Individual"
    },
    {
      id: 23,
      nombre: "María José",
      apellido: "Pazmiño Torres",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Psicología Clínica",
      Contrato: "Contado/Avance/Individual"
    },
    {
      id: 24,
      nombre: "Andrés Felipe",
      apellido: "Vega Cordova",
      Fecha_Inicio: "03/02/2024",
      Fecha_Vencimiento: "03/02/2025",
      Carrera: "Ingeniería Química",
      Contrato: "Financiado/Grupal"
    },
    {
      id: 25,
      nombre: "Natalia Elizabeth",
      apellido: "Flores Zambrano",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Biología Marina",
      Contrato: "Beca Parcial"
    },
    {
      id: 26,
      nombre: "Javier Ignacio",
      apellido: "Mora Reyes",
      Fecha_Inicio: "15/03/2024",
      Fecha_Vencimiento: "15/03/2025",
      Carrera: "Administración de Empresas",
      Contrato: "Contado/Individual"
    },
    {
      id: 27,
      nombre: "Paola Nicole",
      apellido: "Santillán Castro",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Diseño de Interiores",
      Contrato: "Contado/Avance/Individual"
    },
    {
      id: 28,
      nombre: "David Sebastián",
      apellido: "Aguirre Ponce",
      Fecha_Inicio: "28/04/2024",
      Fecha_Vencimiento: "28/04/2025",
      Carrera: "Ingeniería en Telecomunicaciones",
      Contrato: "Financiado/Individual"
    },
    {
      id: 29,
      nombre: "Carolina Michelle",
      apellido: "Salinas Burgos",
      Fecha_Inicio: "Por Asignar",
      Fecha_Vencimiento: "Por Asignar",
      Carrera: "Pedagogía Infantil",
      Contrato: "Beca Completa"
    },
    {
      id: 30,
      nombre: "Roberto Carlos",
      apellido: "Benítez Valencia",
      Fecha_Inicio: "10/05/2024",
      Fecha_Vencimiento: "10/05/2025",
      Carrera: "Marketing Digital",
      Contrato: "Contado/Individual"
    }
  ];



  return (
    <LayoutApp>
      <main className="flex flex-col  mx-32  items-start">

        <div className="ml-8  flex w-full border-b-2 gap-3 border-black font-normal">
          <button
            className={`px-3 rounded-t-[5px] w-[115px] ${vista === "Estudiantes" ? "bg-[#17162E] text-white" : ""
              }`}
            onClick={() => setVista("Estudiantes")}
          >
            Estudiantes
          </button>
          <button
            className={`px-3 rounded-t-[5px] w-[105px] ${vista === "Asesores" ? "bg-[#17162E] text-white" : ""
              }`}
            onClick={() => setVista("Asesores")}
          >
            Asesores
          </button>
        </div>

        <div className="flex flex-col gap-[10px] ml-8 pt-3  p-[30px]   w-full  bg-white  rounded-b-[10px] drop-shadow-lg">

          <div className="flex flex-col gap-[12px]">

            <div className="flex justify-start">
              <h2 className="text-2xl font-bold">CRUD</h2>

            </div>
            <Buscar></Buscar>

          </div>



          <div>
            {vista === "Estudiantes" ? (
              <>

                <div className="flex flex-col  ">

                  <div className="flex justify-between text-[#495D72] font-medium   p-[6px] rounded-md">
                    <div className="w-[40px] flex justify-center">ID</div>
                    <div className="w-[300px] flex justify-center">Alumno</div>
                    <div className="w-[100px] flex justify-center">F.Inicio</div>
                    <div className="w-[110px] flex justify-center">F.Vencimineto</div>
                    <div className="w-[360px] flex justify-center">Carrera</div>
                    <div className="w-[250px] flex justify-center">Contrato</div>
                    <div className="w-[110px] flex justify-center">Editar</div>
                    <div className="w-[110px] flex justify-center">Eliminar</div>
                  </div>
                  {Estudiantes.map((estudiante, index) => (
                    <div className={`flex justify-between items-center text-[#2B2829] font-normal p-[6px] rounded-md
                      ${index % 2 === 0 ? 'bg-white' : 'bg-[#E9E7E7]'}`
                    }>
                      <div className="w-[40px] flex justify-center">{estudiante.id}</div>
                      <div className="w-[300px] flex justify-start">{estudiante.nombre} {estudiante.apellido}</div>
                      <div className="w-[100px] flex justify-center">{estudiante.Fecha_Inicio}</div>
                      <div className="w-[102px] flex justify-center">{estudiante.Fecha_Vencimiento}</div>
                      <div className="w-[360px] flex justify-start">{estudiante.Carrera}</div>
                      <div className="w-[250px] flex justify-start">{estudiante.Contrato}</div>
                      <button onClick={() => handlerEditarEstudiante(estudiante.id)} className="w-[110px] rounded-md px-3 py-1 bg-[#1C1C34]  flex justify-center text-white"> Editar </button>
                      <button className="w-[110px] rounded-md px-3 py-1 bg-[#8F1313]  flex justify-center text-white"> Eliminar </button>
                    </div>
                  ))}





                </div>

                <button onClick={handlerAgregarEstudiante} className="flex justify-between text-white w-[230px] h-8 rounded font-semibold  bg-[#1B435D] px-6 py-1 mt-5">
                  <p>Agregar Asesor</p>
                </button>

              </>


            ) : (
              <>
                <div className="flex flex-col">
                  <div className="flex justify-between text-[#495D72] font-medium   p-[6px] rounded-md">
                    <div className="w-[40px] flex justify-center">ID</div>
                    <div className="w-[250px] flex justify-center">Asesor</div>
                    <div className="w-[250px] flex justify-center">Area</div>
                    <div className="w-[250px] flex justify-center">Especialidad</div>
                    <div className="w-[360px] flex justify-center">Universidad</div>
                    <div className="w-[110px] flex justify-center">Editar</div>
                    <div className="w-[110px] flex justify-center">Eliminar</div>
                  </div>
                  <div className="flex justify-between items-center text-[#2B2829] font-normal  p-[6px] rounded-md">
                    <div className="w-[40px] flex justify-center">0125</div>
                    <div className="w-[250px] flex justify-start">Antonio Jorge Cueva Lopez</div>
                    <div className="w-[250px] flex justify-center">Ingeneria</div>
                    <div className="w-[360px] flex justify-start">Ing. Civil</div>
                    <div className="w-[250px] flex justify-start">U.San Ignacion de Oyola</div>
                    <button onClick={handlerEditarAsesor} className="w-[110px] rounded-md px-3 py-1 bg-[#1C1C34]  flex justify-center text-white"> Editar </button>
                    <div className="w-[110px] rounded-md px-3 py-1 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                  </div>
                  <div className="flex justify-between items-center text-[#2B2829] font-normal bg-[#E9E7E7] p-[6px] rounded-md mt-5">
                    <div className="w-[40px] flex justify-center">0125</div>
                    <div className="w-[250px] flex justify-start">Antonio Jorge Cueva Lopez</div>
                    <div className="w-[250px] flex justify-center">Ingeneria</div>
                    <div className="w-[360px] flex justify-start">Administacion</div>
                    <div className="w-[250px] flex justify-start">U.San Ignacion de Oyola</div>
                    <div className="w-[110px] rounded-md px-3 py-1 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                    <div className="w-[110px] rounded-md px-3 py-1 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                  </div>


                </div>
                <button onClick={handlerAgregarAsesor} className="flex justify-between text-white w-[230px] h-8 rounded font-semibold  bg-[#1B435D] px-6 py-1 mt-5">
                  <p>Agregar Asesor</p>
                </button>
              </>

            )}
          </div>


        </div>
      </main>
    </LayoutApp>


  );
};
export default GestionarUsuarios;