import React from 'react'
import LayoutApp from '../../layout/LayoutApp'
import { useState } from "react";
import CuotasNuevos from '../../Components/Administrador/Pagos/CuotasNuevo';
import GestionPago from '../../Components/Administrador/Pagos/GestionPagos';
import AlContadoNuevo from '../../Components/Administrador/Pagos/AlContadoNuevo';
import EnActividad from '../../Components/Administrador/Pagos/EnActividad';


const Pagos = () => {
    //Menus
    const [pago,setPago] = useState("Cuotas");
    const [vista, setVista] = useState("Clientes nuevo");
    const [contado,setContado] =useState("nuevo")
    //Boton

    return (
        <LayoutApp>
           <main className="flex flex-col  mx-32 my-24 items-start">
            
                <div className='ml-8 mb-1 px-5 flex w-[230px] h-[30px] bg-[#E9E7E7] rounded-3xl font-medium items-center'>
                    <button 
                        className={`mr-[18px] text-[#AAA3A5] ${pago ==="Cuotas"?"text-black":"" } `}
                        onClick={()=>setPago("Cuotas")}
                    >
                        Cuotas
                    </button>
                    <div className='h-[40px] w-[2px] rotate-45 bg-white '></div>
                    <button 
                        className={`text-[#AAA3A5] ml-[18px] ${pago ==="Al Contado"?"text-black":"" } `}
                        onClick={()=>setPago("Al Contado")}
                    >
                        Al Contado
                    </button>
                </div>

                <div>
                    {
                       pago==="Cuotas" ?(

                        <div className="flex flex-col gap-[10px] ml-8 pt-3  p-[30px]   w-full  bg-white  rounded-b-[10px] shadow-lg">
                            <h1 className='text-[20px] font-semibold'>Cuotas</h1>
                            <div className=" flex w-full border-b-2 gap-3 border-black font-normal">
                                <button
                                    className={`px-3 rounded-t-[5px] w-[150px] ${vista === "Clientes nuevo" ? "bg-[#17162E] text-white" : ""}`}
                                    onClick={() => setVista("Clientes nuevo")}
                                >
                                    Clientes nuevo
                                </button>
                                <button
                                    className={`px-3 rounded-t-[5px] w-[150px] ${vista === "Gestion pagos" ? "bg-[#17162E] text-white" : ""}`}
                                    onClick={() => setVista("Gestion pagos")}
                                >
                                    Gestión pagos
                                </button>
                            </div>

                        <div>
                            {vista === "Clientes nuevo" ?(
                            
                                <CuotasNuevos></CuotasNuevos>
                             
                            ):(
                                <GestionPago></GestionPago>
                            )}
                        </div>

                        

                        </div>
                       ):(
                        <div className="flex flex-col gap-[10px] ml-8 pt-3  p-[30px]   w-full  bg-white  rounded-b-[10px] shadow-lg">
                            <h1 className='text-[20px] font-semibold'>Al Contado</h1>
                            <div className=" flex w-full border-b-2 gap-3 border-black font-normal">
                                <button
                                    className={`px-3 rounded-t-[5px] w-[150px] ${contado === "nuevo" ? "bg-[#17162E] text-white" : ""}`}
                                    onClick={() => setContado("nuevo")}
                                >
                                    Clientes nuevo
                                </button>
                                <button
                                    className={`px-3 rounded-t-[5px] w-[150px] ${contado === "actividad" ? "bg-[#17162E] text-white" : ""}`}
                                    onClick={() => setContado("actividad")}
                                >
                                    En actividad
                                </button>
                            </div>

                            <div>
                                {contado === "nuevo" ?(
                                <>
                                        
                                    <AlContadoNuevo></AlContadoNuevo>

                                </>  
                                ):(
                                    <EnActividad></EnActividad>
                                )}
                            </div>

                           

                               
                        </div>
                       ) 
                    }
                </div>

                

            </main> 
        </LayoutApp>
        
      )
    
}

export default Pagos
