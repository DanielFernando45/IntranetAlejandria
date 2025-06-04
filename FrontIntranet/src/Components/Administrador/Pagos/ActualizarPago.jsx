import React from 'react'
import { useState } from "react";

const ActualizarPago = () => {

    const [numeroCuotas, setNumeroCuotas] = useState(1);

    const handleNumeroCuotasChange = (e) => {
        setNumeroCuotas(Number(e.target.value));
    };

    return (
        <div
            className='flex flex-col absolute gap-[15px] top-60 left-96 px-10 py-5 w-[875px]  rounded-lg bg-white border border-[#D2CECF]'>
            <h1 className='text-[25px] font-semibold'>Actualizar pagos</h1>

            <div className='flex justify-between'>
                <div className='flex flex-col w-[369px] h-[82px] gap-[15px]'>
                    <h2 className='font-medium'>Alumno:</h2>
                    <input placeholder='Alessandro Robles Diaz' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' />


                </div>
                <div className='flex flex-col w-[169px] h-[82px] gap-[15px]'>
                    <h2 className='font-medium'>Numero de cuotas:</h2>
                    <select onChange={handleNumeroCuotasChange} value={numeroCuotas} className='flex items-center rounded-2xl  w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className='flex flex-col w-[222px] h-[82px] gap-[15px]'>
                    <h2 className='font-medium'>Total a pagar:</h2>
                    <input placeholder='Ingrese un monto' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' />
                </div>
            </div>

            <h1 className='text-[25px] font-semibold'>Cuotas</h1>

            <div>
                <div className='font-medium ' >Cuota 1</div>
                <div className='flex justify-between'>
                    <div className='flex flex-col w-[390px] h-[82px] gap-[15px]'>
                        <h2 className='font-medium'>Monto:</h2>
                        <input placeholder='Ingrese un monto' className='flex items-center rounded-2xl text-[#DAD6D7] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' />

                    </div>
                    <div className='flex flex-col w-[390px] h-[82px] gap-[15px]'>
                        <h2 className='font-medium'>Fecha Pago:</h2>
                        <input type='date' placeholder='Ingrese una fecha' className='flex items-center rounded-2xl text-[#DAD6D7] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' />
                    </div>
                </div>
            </div>

            <div className='flex justify-start gap-5 mt-5'>
                <div className='font-medium ' >Cuota 2</div>
                <div>
                  <div className='flex flex-col w-[250px] gap-[15px]'>
                    <h2 className='font-medium'>Monto:</h2>
                    <input placeholder='Ingrese un monto' className='rounded-2xl text-[#DAD6D7] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' />
                </div>  
                <input type="checkbox" className='rounded-full'/>
                </div>
                
                
            </div>

            <div className='flex  justify-start gap-5 mt-5'>

                <div className='font-medium ' >Cuota 3</div>

                <div className='flex flex-col w-[250px] gap-[15px]'>
                    <h2 className='font-medium'>Monto:</h2>
                    <input placeholder='Ingrese un monto' className='rounded-2xl text-[#DAD6D7] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' />
                    <input type="checkbox" className='rounded-full'/>
                </div>

            </div>




            <div className='flex w-full py-4 px-1 h-[68px] justify-end gap-4'>
                <button className='h-7  w-[100px] border border-black rounded-[4px] text-[11px] font-bold text-[#02242B]'>
                    Agregar
                </button>
                <button className='h-7  w-[100px] border bg-black rounded-[4px] text-[11px] font-bold text-white'>
                    Cancelar
                </button>
            </div>

        </div>

    )
}

export default ActualizarPago