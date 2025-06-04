import React from 'react'
import LayoutApp from '../../layout/LayoutApp'

import { useNavigate, Outlet, useLocation } from "react-router-dom";

const Pagos = () => {
    //Menus
    

    const navigate = useNavigate();
    const location = useLocation();

    const isCuotas = location.pathname.includes("cuotas");
    const isAlContado = location.pathname.includes("al-contado");
    const isServicioExtra = location.pathname.includes("servicio-extra");

    return (
        <LayoutApp>
            <main className="flex flex-col  mx-32 my-24 items-start">

                <div className='ml-8 mb-1 px-5 flex w-[390px] h-[30px] bg-[#E9E7E7] rounded-3xl font-medium items-center'>
                    <button
                        className={`mr-[18px] text-[#AAA3A5] ${isCuotas? "text-black" : ""} `}
                        onClick={() => navigate("cuotas")}
                    >
                        Cuotas
                    </button>
                    <div className='h-[40px] w-[2px] rotate-45 bg-white'></div>
                    <button
                        className={`text-[#AAA3A5] mx-[18px]  ${isAlContado ? "text-black" : ""} `}
                        onClick={() => navigate("al-contado")}
                    >
                        Al Contado
                    </button>
                    <div className='h-[40px] w-[2px] rotate-45 bg-white'></div>
                    <button
                        className={`text-[#AAA3A5] ml-[18px] ${isServicioExtra ? "text-black" : ""} `}
                        onClick={() => navigate("servicio-extra")}
                    >
                        Servicio Extra
                    </button>
                </div>

                <div>
                    <Outlet/>
                    
                </div>



            </main>
        </LayoutApp>

    )

}

export default Pagos
