import React from 'react'
import { useState } from "react";
import AsignarPago from '../../../../Components/Administrador/Pagos/AsignarPago';

const CuotasNuevo = () => {
    const [asigPago, setAsigPago] = useState(false);
    
    return (
        <>
            <div className="flex flex-col  ">

                <div className="flex justify-between text-[#495D72] font-medium p-[6px] pr-10 rounded-md">
                    <div className="w-[40px] flex justify-center">ID</div>
                    <div className="w-[300px] flex justify-center">Alumno</div>
                    <div className="w-[210px] flex justify-center">Contrato</div>
                    <div className="w-[160px] flex justify-center">Fecha Creacion</div>
                    <div className="w-[360px] flex justify-center">Carrera</div>
                    <div className="w-[140px] flex justify-center ml-5">Accion</div>

                </div>
                <div className="flex justify-between items-center text-[#2B2829] font-normal p-[6px] pr-10 rounded-md">
                    <div className="w-[40px] flex justify-center">0125</div>
                    <div className="w-[300px] flex justify-center">Juan Mateo Pérez Vinlof</div>
                    <div className="w-[210px] flex justify-center">Plazo/Cuotas/Grupal</div>
                    <div className="w-[160px] flex justify-center">25/07/25</div>
                    <div className="w-[360px] flex justify-center">Administracion de empresas Internacionales</div>
                    <button onClick={() => setAsigPago(!asigPago)} className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]"> Asignar Pago </button>
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
            {asigPago && (
                <AsignarPago/>
            )}
        </>
    );
};

export default CuotasNuevo;