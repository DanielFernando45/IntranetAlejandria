import React from 'react'
import LayoutApp from '../../layout/LayoutApp'
import { useState } from "react";


const Pagos = () => {
    //Menus
    const [pago,setPago] = useState("Cuotas");
    const [vista, setVista] = useState("Clientes nuevo");
    const [contado,setContado] =useState("nuevo")
    //Boton
    const [asigPago, setAsigPago] = useState(false);
    const [edit, setEdit] = useState(false);

    return (
        <LayoutApp>
           <main className="flex flex-col  mx-32 my-24 items-start">
            
                <div className='ml-8 mb-1 px-5 flex w-[230px] h-[30px] bg-[#E9E7E7] rounded-3xl font-medium items-center'>
                    <button 
                        className={`mr-[18px] text-[#AAA3A5] ${pago ==="Cuotas"?"text-[#000000]":"" } `}
                        onClick={()=>setPago("Cuotas")}
                    >
                        Cuotas
                    </button>
                    <div className='h-[40px] w-[2px] rotate-45 bg-white '></div>
                    <button 
                        className={`text-[#AAA3A5] ml-[18px] ${pago ==="Al Contado"?"text-[#000000]":"" } `}
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
                            <>    
                                <div className="flex flex-col  ">
                                        
                                        <div className="flex justify-between text-[#495D72] font-medium p-[6px] pr-10 rounded-md">
                                                            <div className="w-[40px] flex justify-center">ID</div>
                                                            <div className="w-[300px] flex justify-center">Alumno</div>
                                                            <div className="w-[210px] flex justify-center">Contrato</div>
                                                            <div className="w-[160px] flex justify-center">Fecha de Creacion</div>
                                                            <div className="w-[360px] flex justify-center">Carrera</div>
                                                            <div className="w-[140px] flex justify-center ml-5">Accion</div>
                                                            
                                        </div> 
                                        <div className="flex justify-between items-center text-[#2B2829] font-normal p-[6px] pr-10 rounded-md">
                                                            <div className="w-[40px] flex justify-center">0125</div>
                                                            <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                            <div className="w-[210px] flex justify-center">Plazo/Cuotas/Grupal</div>
                                                            <div className="w-[160px] flex justify-center">25/07/24</div>
                                                            <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                            <button onClick={()=>setAsigPago(!asigPago)} className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                        </div> 
                                        <div className="flex justify-between items-center text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                            <div className="w-[40px] flex justify-center">0125</div>
                                                            <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                            <div className="w-[210px] flex justify-center">Plazo/Cuotas/Grupal</div>
                                                            <div className="w-[160px] flex justify-center">25/07/24</div>
                                                            <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                            <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                        </div> 
                                        <div className="flex justify-between items-center text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                            <div className="w-[40px] flex justify-center">0125</div>
                                                            <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                            <div className="w-[210px] flex justify-center">Plazo/Cuotas/Grupal</div>
                                                            <div className="w-[160px] flex justify-center">25/07/24</div>
                                                            <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                            <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                        </div> 
                                        <div className="flex justify-between items-center text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                            <div className="w-[40px] flex justify-center">0125</div>
                                                            <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                            <div className="w-[210px] flex justify-center">Plazo/Cuotas/Grupal</div>
                                                            <div className="w-[160px] flex justify-center">25/07/24</div>
                                                            <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                            <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                        </div> 
                                        <div className="flex justify-between items-center text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                            <div className="w-[40px] flex justify-center">0125</div>
                                                            <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                            <div className="w-[210px] flex justify-center">Plazo/Cuotas/Grupal</div>
                                                            <div className="w-[160px] flex justify-center">25/07/24</div>
                                                            <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                            <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                        </div> 
                                        <div className="flex justify-between items-center text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                            <div className="w-[40px] flex justify-center">0125</div>
                                                            <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                            <div className="w-[210px] flex justify-center">Plazo/Cuotas/Grupal</div>
                                                            <div className="w-[160px] flex justify-center">25/07/24</div>
                                                            <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                            <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                        </div> 
                                        <div className="flex justify-between items-center text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                            <div className="w-[40px] flex justify-center">0125</div>
                                                            <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                            <div className="w-[210px] flex justify-center">Plazo/Cuotas/Grupal</div>
                                                            <div className="w-[160px] flex justify-center">25/07/24</div>
                                                            <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                            <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                        </div> 
                                        <div className="flex justify-between items-center text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                            <div className="w-[40px] flex justify-center">0125</div>
                                                            <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                            <div className="w-[210px] flex justify-center">Plazo/Cuotas/Grupal</div>
                                                            <div className="w-[160px] flex justify-center">25/07/24</div>
                                                            <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                            <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                        </div> 
                                        <div className="flex justify-between items-center text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                            <div className="w-[40px] flex justify-center">0125</div>
                                                            <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                            <div className="w-[210px] flex justify-center">Plazo/Cuotas/Grupal</div>
                                                            <div className="w-[160px] flex justify-center">25/07/24</div>
                                                            <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                            <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                        </div> 
                                        <div className="flex justify-between items-center text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                            <div className="w-[40px] flex justify-center">0125</div>
                                                            <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                            <div className="w-[210px] flex justify-center">Plazo/Cuotas/Grupal</div>
                                                            <div className="w-[160px] flex justify-center">25/07/24</div>
                                                            <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                            <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                        </div> 
        
                                </div>

                            </>  
                            ):(
                                <div className="flex flex-col  ">
                                            
                                    <div className="flex justify-between text-[#495D72] font-medium p-[6px] pr-10 rounded-md">
                                                    <div className="w-[40px] flex justify-center">ID</div>
                                                    <div className="w-[300px] flex justify-center">Alumno</div>
                                                    <div className="w-[210px] flex justify-center">Contrato</div>
                                                    <div className="w-[160px] flex justify-center">Fecha de Creacion</div>
                                                    <div className="w-[370px] flex justify-center">Carrera</div>
                                                    <div className="w-[280px] flex justify-center ml-5">Accion</div>
                                                    
                                    </div> 
                                    <div className="flex justify-between items-center text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                    <div className="w-[40px] flex justify-center">0125</div>
                                                    <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                    <div className="w-[210px] flex justify-center">Plazo/Al contado/Grupal</div>
                                                    <div className="w-[160px] flex justify-center">25/07/24</div>
                                                    <div className="w-[370px] flex justify-center">Administracion de empresas Internacionales</div>
                                                    <button className="w-[160px] font-medium rounded-md px-4 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Actualizar Pagos </button>           
                                                    <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                    </div> 
                                    <div className="flex justify-between items-center text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                    <div className="w-[40px] flex justify-center">0125</div>
                                                    <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                    <div className="w-[210px] flex justify-center">Plazo/Al contado/Grupal</div>
                                                    <div className="w-[160px] flex justify-center">25/07/24</div>
                                                    <div className="w-[370px] flex justify-center">Administracion de empresas Internacionales</div>
                                                    <button className="w-[160px] font-medium rounded-md px-4 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Actualizar Pagos </button>           
                                                    <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                    </div> 
                                    <div className="flex justify-between items-center text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                    <div className="w-[40px] flex justify-center">0125</div>
                                                    <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                    <div className="w-[210px] flex justify-center">Plazo/Al contado/Grupal</div>
                                                    <div className="w-[160px] flex justify-center">25/07/24</div>
                                                    <div className="w-[370px] flex justify-center">Administracion de empresas Internacionales</div>
                                                    <button className="w-[160px] font-medium rounded-md px-4 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Actualizar Pagos </button>           
                                                    <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                    </div> 
                                    <div className="flex justify-between items-center text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                    <div className="w-[40px] flex justify-center">0125</div>
                                                    <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                    <div className="w-[210px] flex justify-center">Plazo/Al contado/Grupal</div>
                                                    <div className="w-[160px] flex justify-center">25/07/24</div>
                                                    <div className="w-[370px] flex justify-center">Administracion de empresas Internacionales</div>
                                                    <button className="w-[160px] font-medium rounded-md px-4 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Actualizar Pagos </button>           
                                                    <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                    </div> 
                                    <div className="flex justify-between items-center text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                    <div className="w-[40px] flex justify-center">0125</div>
                                                    <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                    <div className="w-[210px] flex justify-center">Plazo/Al contado/Grupal</div>
                                                    <div className="w-[160px] flex justify-center">25/07/24</div>
                                                    <div className="w-[370px] flex justify-center">Administracion de empresas Internacionales</div>
                                                    <button className="w-[160px] font-medium rounded-md px-4 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Actualizar Pagos </button>           
                                                    <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                    </div> 
                                    <div className="flex justify-between items-center text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                    <div className="w-[40px] flex justify-center">0125</div>
                                                    <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                    <div className="w-[210px] flex justify-center">Plazo/Al contado/Grupal</div>
                                                    <div className="w-[160px] flex justify-center">25/07/24</div>
                                                    <div className="w-[370px] flex justify-center">Administracion de empresas Internacionales</div>
                                                    <button className="w-[160px] font-medium rounded-md px-4 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Actualizar Pagos </button>           
                                                    <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                    </div> 
                                    <div className="flex justify-between items-center text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                    <div className="w-[40px] flex justify-center">0125</div>
                                                    <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                    <div className="w-[210px] flex justify-center">Plazo/Al contado/Grupal</div>
                                                    <div className="w-[160px] flex justify-center">25/07/24</div>
                                                    <div className="w-[370px] flex justify-center">Administracion de empresas Internacionales</div>
                                                    <button className="w-[160px] font-medium rounded-md px-4 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Actualizar Pagos </button>           
                                                    <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                    </div> 
                                    <div className="flex justify-between items-center text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                    <div className="w-[40px] flex justify-center">0125</div>
                                                    <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                    <div className="w-[210px] flex justify-center">Plazo/Al contado/Grupal</div>
                                                    <div className="w-[160px] flex justify-center">25/07/24</div>
                                                    <div className="w-[370px] flex justify-center">Administracion de empresas Internacionales</div>
                                                    <button className="w-[160px] font-medium rounded-md px-4 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Actualizar Pagos </button>           
                                                    <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                    </div> 
                                    <div className="flex justify-between items-center text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                    <div className="w-[40px] flex justify-center">0125</div>
                                                    <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                    <div className="w-[210px] flex justify-center">Plazo/Al contado/Grupal</div>
                                                    <div className="w-[160px] flex justify-center">25/07/24</div>
                                                    <div className="w-[370px] flex justify-center">Administracion de empresas Internacionales</div>
                                                    <button className="w-[160px] font-medium rounded-md px-4 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Actualizar Pagos </button>           
                                                    <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                    </div> 
                                    <div className="flex justify-between items-center text-[#2B2829] font-normal bg-[#E9E7E7] p-[6px] pr-10 rounded-md">
                                                    <div className="w-[40px] flex justify-center">0125</div>
                                                    <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                    <div className="w-[210px] flex justify-center">Plazo/Al contado/Grupal</div>
                                                    <div className="w-[160px] flex justify-center">25/07/24</div>
                                                    <div className="w-[370px] flex justify-center">Administracion de empresas Internacionales</div>
                                                    <button className="w-[160px] font-medium rounded-md px-4 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Actualizar Pagos </button>           
                                                    <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                    </div> 
                                    <div className="flex justify-between items-center text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                    <div className="w-[40px] flex justify-center">0125</div>
                                                    <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                    <div className="w-[210px] flex justify-center">Plazo/Al contado/Grupal</div>
                                                    <div className="w-[160px] flex justify-center">25/07/24</div>
                                                    <div className="w-[370px] flex justify-center">Administracion de empresas Internacionales</div>
                                                    <button className="w-[160px] font-medium rounded-md px-4 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Actualizar Pagos </button>           
                                                    <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                    </div> 
                                    <div className="flex justify-between items-center text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                    <div className="w-[40px] flex justify-center">0125</div>
                                                    <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                    <div className="w-[210px] flex justify-center">Plazo/Al contado/Grupal</div>
                                                    <div className="w-[160px] flex justify-center">25/07/24</div>
                                                    <div className="w-[370px] flex justify-center">Administracion de empresas Internacionales</div>
                                                    <button className="w-[160px] font-medium rounded-md px-4 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Actualizar Pagos </button>           
                                                    <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                    </div>   

                                </div>
                            )}
                        </div>

                        {asigPago && (
                            <div 
                                className='flex flex-col absolute gap-[15px] top-60 left-96 px-10 py-12 w-[875px] h-[420px] rounded-lg bg-white border border-[#D2CECF]'>
                               <h1 className='text-lg font-medium'>Asignar por cuotas</h1>   

                                <div className='flex justify-between'>
                                    <div className='flex flex-col w-[369px] h-[82px] gap-[15px]'>
                                        <h2 className='font-medium'>Alumno:</h2>
                                        <input placeholder='Alessandro Robles Diaz' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'/>
                                            
                                        
                                    </div>
                                    <div className='flex flex-col w-[169px] h-[82px] gap-[15px]'>
                                        <h2 className='font-medium'>Numero de cuotas:</h2>
                                        <select className='flex items-center rounded-2xl text-[#DAD6D7] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'>
                                            <option value="Seleccione">Seleccione</option>
                                        </select>
                                    </div>
                                    <div className='flex flex-col w-[222px] h-[82px] gap-[15px]'>
                                        <h2 className='font-medium'>Pago Total:</h2>
                                        <input placeholder='Ingrese un monto' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'/>
                                    </div>
                                </div>

                                <div className='flex justify-between'>
                                    <div className='flex flex-col w-[250px] h-[82px] gap-[15px]'>
                                        <h2 className='font-medium'>Nombre:</h2>
                                        <input placeholder='Cuota 1' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'/>

                                    </div>
                                    <div className='flex flex-col w-[250px] h-[82px] gap-[15px]'>
                                        <h2 className='font-medium'>Monto de Cuota:</h2>
                                        <input placeholder='Ingrese un monto' className='flex items-center rounded-2xl text-[#DAD6D7] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'/>
                                              
                                    </div>
                                    <div className='flex flex-col w-[260px] h-[82px] gap-[15px]'>
                                        <h2 className='font-medium'>Fecha Pago:</h2>
                                        <input type='date' placeholder='Ingrese una fecha' className='flex items-center rounded-2xl text-[#DAD6D7] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'/>
                                            
                                        
                                    </div>
                                </div>

                                <div className='flex w-full py-4 px-1 h-[68px] justify-end gap-4'>
                                    <button  className='h-7  w-[100px] border border-black rounded-[4px] text-[11px] font-bold text-[#02242B]'>Agregar</button>
                                    <button onClick={()=>setAsigPago(false)} className='h-7  w-[100px] border bg-black rounded-[4px] text-[11px] font-bold text-white'>Cancelar</button>
                                </div>

                            </div>
                        )}

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
                                        
                                    <div className="flex flex-col  ">
                                            
                                            <div className="flex justify-between text-[#495D72] font-medium p-[6px] pr-10 rounded-md">
                                                                <div className="w-[40px] flex justify-center">ID</div>
                                                                <div className="w-[300px] flex justify-center">Alumno</div>
                                                                <div className="w-[210px] flex justify-center">Asesoria</div>
                                                                <div className="w-[160px] flex justify-center">Fecha de Creacion</div>
                                                                <div className="w-[360px] flex justify-center">Carrera</div>
                                                                <div className="w-[140px] flex justify-center ml-5">Accion</div>
                                                                
                                            </div> 
                                            <div className="flex justify-between text-[#2B2829] font-normal p-[6px] pr-10 rounded-md">
                                                                <div className="w-[40px] flex justify-center">0125</div>
                                                                <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                                <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                                <div className="w-[160px] flex justify-center">25/07/24</div>
                                                                <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                                <button onClick={()=>setAsigPago(!asigPago)} className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                            </div> 
                                            <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                                <div className="w-[40px] flex justify-center">0125</div>
                                                                <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                                <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                                <div className="w-[160px] flex justify-center">25/07/24</div>
                                                                <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                                <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                            </div> 
                                            <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                                <div className="w-[40px] flex justify-center">0125</div>
                                                                <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                                <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                                <div className="w-[160px] flex justify-center">25/07/24</div>
                                                                <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                                <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                            </div> 
                                            <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                                <div className="w-[40px] flex justify-center">0125</div>
                                                                <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                                <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                                <div className="w-[160px] flex justify-center">25/07/24</div>
                                                                <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                                <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                            </div> 
                                            <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                                <div className="w-[40px] flex justify-center">0125</div>
                                                                <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                                <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                                <div className="w-[160px] flex justify-center">25/07/24</div>
                                                                <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                                <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                            </div> 
                                            <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                                <div className="w-[40px] flex justify-center">0125</div>
                                                                <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                                <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                                <div className="w-[160px] flex justify-center">25/07/24</div>
                                                                <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                                <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                            </div> 
                                            <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                                <div className="w-[40px] flex justify-center">0125</div>
                                                                <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                                <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                                <div className="w-[160px] flex justify-center">25/07/24</div>
                                                                <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                                <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                            </div> 
                                            <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                                <div className="w-[40px] flex justify-center">0125</div>
                                                                <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                                <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                                <div className="w-[160px] flex justify-center">25/07/24</div>
                                                                <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                                <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                            </div> 
                                            <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                                <div className="w-[40px] flex justify-center">0125</div>
                                                                <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                                <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                                <div className="w-[160px] flex justify-center">25/07/24</div>
                                                                <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                                <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                            </div> 
                                            <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                                <div className="w-[40px] flex justify-center">0125</div>
                                                                <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                                <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                                <div className="w-[160px] flex justify-center">25/07/24</div>
                                                                <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                                                                <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>           
                                            </div> 
            
                                    </div>

                                </>  
                                ):(
                                    <div className="flex flex-col  ">
                                                
                                        <div className="flex justify-between text-[#495D72] font-medium p-[6px] pr-10 rounded-md">
                                                        <div className="w-[40px] flex justify-center">ID</div>
                                                        <div className="w-[300px] flex justify-center">Alumno</div>
                                                        <div className="w-[210px] flex justify-center">Asesoria</div>
                                                        <div className="w-[160px] flex justify-center">Fecha Pago</div>
                                                        <div className="w-[370px] flex justify-center">Monto del contrato</div>
                                                        <div className="w-[120px] flex justify-center ">Accion</div>
                                                        
                                        </div> 
                                        <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                        <div className="w-[40px] flex justify-center">0125</div>
                                                        <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                        <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                        <div className="w-[160px] flex justify-center">25/07/24</div>
                                                        <div className="w-[370px] flex justify-center">S/1500</div>
                                                        <button onClick={()=> setEdit(!false)} className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                        </div> 
                                        <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                        <div className="w-[40px] flex justify-center">0125</div>
                                                        <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                        <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                        <div className="w-[160px] flex justify-center">25/07/24</div>
                                                        <div className="w-[370px] flex justify-center">S/1400</div>        
                                                        <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                        </div> 
                                        <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                        <div className="w-[40px] flex justify-center">0125</div>
                                                        <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                        <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                        <div className="w-[160px] flex justify-center">25/07/24</div>
                                                        <div className="w-[370px] flex justify-center">S/1500</div>           
                                                        <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                        </div> 
                                        <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                        <div className="w-[40px] flex justify-center">0125</div>
                                                        <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                        <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                        <div className="w-[160px] flex justify-center">25/07/24</div>
                                                        <div className="w-[370px] flex justify-center">S/1400</div>         
                                                        <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                        </div> 
                                        <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                        <div className="w-[40px] flex justify-center">0125</div>
                                                        <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                        <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                        <div className="w-[160px] flex justify-center">25/07/24</div>
                                                        <div className="w-[370px] flex justify-center">S/1300</div> 
                                                        <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                        </div> 
                                        <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                        <div className="w-[40px] flex justify-center">0125</div>
                                                        <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                        <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                        <div className="w-[160px] flex justify-center">25/07/24</div>
                                                        <div className="w-[370px] flex justify-center">S/1800</div>         
                                                        <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                        </div> 
                                        <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                        <div className="w-[40px] flex justify-center">0125</div>
                                                        <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                        <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                        <div className="w-[160px] flex justify-center">25/07/24</div>
                                                        <div className="w-[370px] flex justify-center">S/1900</div>       
                                                        <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                        </div> 
                                        <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                        <div className="w-[40px] flex justify-center">0125</div>
                                                        <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                        <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                        <div className="w-[160px] flex justify-center">25/07/24</div>
                                                        <div className="w-[370px] flex justify-center">S/2500</div>     
                                                        <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                        </div> 
                                        <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                        <div className="w-[40px] flex justify-center">0125</div>
                                                        <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                        <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                        <div className="w-[160px] flex justify-center">25/07/24</div>
                                                        <div className="w-[370px] flex justify-center">S/2500</div>  
                                                        <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                        </div> 
                                        <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7] p-[6px] pr-10 rounded-md">
                                                        <div className="w-[40px] flex justify-center">0125</div>
                                                        <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                        <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                        <div className="w-[160px] flex justify-center">25/07/24</div>
                                                        <div className="w-[370px] flex justify-center">S/1800</div>     
                                                        <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                        </div> 
                                        <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] pr-10 rounded-md">
                                                        <div className="w-[40px] flex justify-center">0125</div>
                                                        <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                        <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                        <div className="w-[160px] flex justify-center">25/07/24</div>
                                                        <div className="w-[370px] flex justify-center">S/1400</div>     
                                                        <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                        </div> 
                                        <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] pr-10 rounded-md">
                                                        <div className="w-[40px] flex justify-center">0125</div>
                                                        <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                                                        <div className="w-[210px] flex justify-center">Pago asesoría de tesis</div>
                                                        <div className="w-[160px] flex justify-center">25/07/24</div>
                                                        <div className="w-[370px] flex justify-center">S/1900</div>       
                                                        <button className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
                                        </div>   

                                    </div>
                                )}
                            </div>

                            {asigPago && (
                                <div className='flex flex-col absolute gap-[15px] top-60 left-96 px-10 py-12 w-[875px] h-[450px] rounded-lg bg-white border border-[#D2CECF]'>
                                <h1 className='text-lg font-medium'>Asignar por cuotas</h1>   

                                    <div className='flex justify-between'>
                                        <div className='flex flex-col w-[369px] h-[82px] gap-[15px]'>
                                            <h2 className='font-medium'>Alumno:</h2>
                                            <input placeholder='Alessandro Robles Diaz' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'/>  
                                        </div>
                                        
                                    </div>

                                    <div className='flex justify-between'>
                                        <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                                            <h2 className='font-medium'>Titulo:</h2>
                                            <input placeholder='Digite un titulo' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'/>
                                        </div>
                                        
                                    </div>

                                    <div className='flex justify-between gap-[15px]'>
                                        <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                                            <h2 className='font-medium'>Nombre:</h2>
                                            <input placeholder='Cuota 1' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'/>

                                        </div>
                                        
                                        <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                                            <h2 className='font-medium'>Fecha Pago:</h2>
                                            <input type='date' placeholder='Ingrese una fecha' className='flex items-center rounded-2xl text-[#DAD6D7] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'/>
                                                
                                            
                                        </div>
                                    </div>

                                    <div className='flex w-full py-4 px-1 h-[68px] justify-end gap-4'>
                                        <button  className='h-7  w-[100px] border border-black rounded-[4px] text-[11px] font-bold text-[#02242B]'>Agregar</button>
                                        <button onClick={()=>setAsigPago(false)} className='h-7  w-[100px] border bg-black rounded-[4px] text-[11px] font-bold text-white'>Cancelar</button>
                                    </div>

                                </div>
                            )}

                            {edit &&(
                                <div className='flex flex-col absolute gap-[15px] top-60 left-96 px-10 py-12 w-[875px] h-[450px] rounded-lg bg-white border border-[#D2CECF]'>
                                <h1 className='text-xl font-medium'>Editar</h1>   

                                    <div className='flex justify-between'>
                                        <div className='flex flex-col w-[369px] h-[82px] gap-[15px]'>
                                            <h2 className='font-medium'>Alumno:</h2>
                                            <input placeholder='Alessandro Robles Diaz' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'/>  
                                        </div>
                                        
                                    </div>

                                    <div className='flex justify-between'>
                                        <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                                            <h2 className='font-medium'>Titulo:</h2>
                                            <input placeholder='Digite un titulo' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'/>
                                        </div>
                                        
                                    </div>

                                    <div className='flex justify-between gap-[15px]'>
                                        <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                                            <h2 className='font-medium'>Nombre:</h2>
                                            <input placeholder='Cuota 1' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'/>

                                        </div>
                                        
                                        <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                                            <h2 className='font-medium'>Fecha Pago:</h2>
                                            <input type='date' placeholder='Ingrese una fecha' className='flex items-center rounded-2xl text-[#DAD6D7] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'/>
                                                
                                            
                                        </div>
                                    </div>

                                    <div className='flex w-full py-4 px-1 h-[68px] justify-end gap-4'>
                                        <button  className='h-7  w-[100px] border border-black rounded-[4px] text-[11px] font-bold text-[#02242B]'>Editar</button>
                                        <button onClick={()=>setEdit(false)} className='h-7  w-[100px] border bg-black rounded-[4px] text-[11px] font-bold text-white'>Cancelar</button>
                                    </div>

                                </div>
                            )}    
                        </div>
                       ) 
                    }
                </div>

                

            </main> 
        </LayoutApp>
        
      )
    
}

export default Pagos
