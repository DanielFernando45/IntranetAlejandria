import React from 'react'
import { useState } from "react";

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
                    <button onClick={() => setEdit(!false)} className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"> Editar </button>
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
            {edit && (
                <div className='flex flex-col absolute gap-[15px] top-60 left-96 px-10 py-12 w-[875px] h-[450px] rounded-lg bg-white border border-[#D2CECF]'>
                    <h1 className='text-xl font-medium'>Editar</h1>

                    <div className='flex justify-between'>
                        <div className='flex flex-col w-[369px] h-[82px] gap-[15px]'>
                            <h2 className='font-medium'>Alumno:</h2>
                            <input placeholder='Alessandro Robles Diaz' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' />
                        </div>

                    </div>

                    <div className='flex justify-between'>
                        <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                            <h2 className='font-medium'>Titulo:</h2>
                            <input placeholder='Digite un titulo' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' />
                        </div>

                    </div>

                    <div className='flex justify-between gap-[15px]'>
                        <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                            <h2 className='font-medium'>Nombre:</h2>
                            <input placeholder='Cuota 1' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' />

                        </div>

                        <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                            <h2 className='font-medium'>Fecha Pago:</h2>
                            <input type='date' placeholder='Ingrese una fecha' className='flex items-center rounded-2xl text-[#DAD6D7] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' />


                        </div>
                    </div>

                    <div className='flex w-full py-4 px-1 h-[68px] justify-end gap-4'>
                        <button className='h-7  w-[100px] border border-black rounded-[4px] text-[11px] font-bold text-[#02242B]'>Editar</button>
                        <button onClick={() => setEdit(false)} className='h-7  w-[100px] border bg-black rounded-[4px] text-[11px] font-bold text-white'>Cancelar</button>
                    </div>

                </div>
            )}
        </>
    )
}

export default EnActividad