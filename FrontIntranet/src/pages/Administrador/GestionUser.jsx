import LayoutApp from "../../layout/LayoutApp";

import { useNavigate,Outlet, useLocation  } from "react-router-dom";


const GestionarUsuarios = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const isAlumnos = location.pathname.includes("listar-estudiantes");
  const isAsesores = location.pathname.includes("listar-asesores");




  return (
    <LayoutApp>
      <main className="flex flex-col items-start overflow-auto">

        <div className="border-b-2 gap-3 border-black font-normal">
          <button
            className={`px-3 rounded-t-[5px] w-[115px] ${isAlumnos ? "bg-[#17162E] text-white" : ""}`}
            onClick={() => navigate("listar-estudiantes")}
          >
            Estudiantes
          </button>
          <button
            className={`px-3 rounded-t-[5px] w-[105px] ${isAsesores ? "bg-[#17162E] text-white" : ""}`}
            onClick={() => navigate("listar-asesores")}
          >
            Asesores
          </button>
        </div>

        <div className="flex flex-col gap-[10px] pt-3  p-[30px] min-w-[1060px] bg-white  rounded-b-[10px] drop-shadow-lg  w-[1200px] xl:w-full ">

          <Outlet />

        </div>
        
      </main>
    </LayoutApp>


  );
};
export default GestionarUsuarios;