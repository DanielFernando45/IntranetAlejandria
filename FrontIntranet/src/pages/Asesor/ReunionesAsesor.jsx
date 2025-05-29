import { useState } from "react";
import LayoutApp from '../../layout/LayoutApp'
import Zoom from "../../assets/images/zoom.svg";
import agregar from '../../assets/icons/pluss.svg';
import { useNavigate, Outlet, useLocation } from "react-router-dom";

const ReunionesAsesor = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isProximo = location.pathname.includes("proximo");
  const isAnteriores = location.pathname.includes("anteriores");


  return (
    <LayoutApp>
      <main className="m-2">
        <div className="flex flex-col gap-[40px] ml-8   p-[40px] h-[767px] bg-white rounded-[20px]">

          <div className="flex flex-col gap-[12px]">

            <div className="flex justify-between">
              <h1 className="font-medium text-[20px]">
                Reuniones
              </h1>
              <select className="border border-black rounded-l-lg" name="" id="">
                <option value="">Filtrar por alumno</option>
                <option value="">Juan Lopez</option>
                <option value="">Sofia Anaya</option>
                <option value="">Alonso Valencia</option>
                <option value="">Omar Vargas</option>
              </select>
            </div>

            <div className="flex w-full border-b gap-3 border-black font-normal">
              <button
                className={`px-3 rounded-t-[5px] w-[105px] ${isProximo ? "bg-[#17162E] text-white" : ""
                  }`}
                onClick={() => navigate("proximo")}
              >
                Próximos
              </button>
              <button
                className={`px-3 rounded-t-[5px] w-[105px] ${isAnteriores ? "bg-[#17162E] text-white" : ""
                  }`}
                onClick={() => navigate("anteriores")}
              >
                Anteriores
              </button>
            </div>
          </div>

          
          <div className="mt-4">
            <Outlet/>
          </div>

        </div>
      </main>

    </LayoutApp>

  )
}

export default ReunionesAsesor