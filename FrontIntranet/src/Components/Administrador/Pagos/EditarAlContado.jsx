import React from 'react'

const EditarAlContado = ({closed}) => {

    return (
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
                <button onClick={closed} className='h-7  w-[100px] border bg-black rounded-[4px] text-[11px] font-bold text-white'>Cancelar</button>
            </div>

        </div>
    )
}

export default EditarAlContado