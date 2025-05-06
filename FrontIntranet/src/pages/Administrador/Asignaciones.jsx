import React, { useState, useRef } from 'react';
import LayoutApp from '../../layout/LayoutApp';


import { useNavigate,Outlet, useLocation  } from "react-router-dom";


const Asignaciones = () => {
  
  const navigate = useNavigate();
  const location = useLocation();

  const isSinAsignar = location.pathname.includes("listar-asignar");
  const isAsignado =location.pathname.includes("listar-asignado")


  return (
    <LayoutApp>
      <main className="flex flex-col mx-32 my-10 items-start">

        <div className="ml-8 flex w-full border-b-2 gap-3 border-black font-normal">
          <button
            className={`px-3 rounded-t-[5px] w-[115px] ${isSinAsignar  ? "bg-[#17162E] text-white" : ""}`}
            onClick={() => navigate("listar-asignar")}
          >
            Sin Asignar
          </button>
          <button
            className={`px-3 rounded-t-[5px] w-[105px] ${isAsignado  ? "bg-[#17162E] text-white" : ""}`}
            onClick={() => navigate("listar-asignado")}
          >
            Asignados
          </button>
        </div>

        <div className="flex flex-col gap-[10px] ml-8 pt-3 p-[30px] w-full bg-white rounded-b-[10px] drop-shadow-lg">
           
           <Outlet />

        </div>



      </main>
    </LayoutApp>
  );
};

export default Asignaciones;
