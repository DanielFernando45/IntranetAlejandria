import React from 'react'
import { useState } from "react";
import EditarAlContado from '../../../../Components/Administrador/Pagos/EditarAlContado';

const EnActividad = () => {
     const [edit, setEdit] = useState(false);
     
    return (
        
        <>
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
                    <button onClick={() => setEdit(true)} className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
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
            {edit && (<EditarAlContado closed={()=>setEdit(false)}/>)}

        </>
    )
}

export default EnActividad