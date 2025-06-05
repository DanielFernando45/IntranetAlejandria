import React from 'react'
import busqueda from "../../../assets/icons/busqueda.svg";
const EditarExtra = ({closeEdit}) => {
  return (
    <div className='flex flex-col absolute gap-[15px] top-60 left-96 px-10 pt-12 w-[875px]  rounded-lg bg-white border border-[#D2CECF]'>
                <h1 className='text-xl font-medium'>Asignar servicios extra</h1>
    
                <div className='flex justify-between'>
                    <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                        <h2 className='font-medium'>Alumno:</h2>
                        <div className="flex gap-3 items-center">
                            <div className="flex w-full h-8 rounded-md px-[10px] py-[6px] justify-between bg-[#E4E2E2]">
                                <input
                                    className="bg-transparent w-full focus:outline-none text-black placeholder:text-[#888]"
                                    type="text"
                                    placeholder="Buscar por ID, DNI o nombre..."
                                />
                                <img src={busqueda} alt="Buscar" />
                            </div>
                        </div>
                    </div>
    
                </div>
    
                <div className='flex flex-col'>
                    <div className='flex justify-between text-[#495D72] p-2'>
                        <div className='w-[50px]'>ID</div>
                        <div className='w-[400px]'>Delegado/Cliente</div>
                        <div className='w-[150px]'>Tipo trabajo</div>
                        <div className='w-[120px]'></div>
                    </div>
                    <div className='flex justify-between p-2'>
                        <div className='w-[50px]'>0237</div>
                        <div className='w-[400px]'>Antonio Jorge Cueva López</div>
                        <div className='w-[150px]'>Tesis maestria</div>
                        <button className='w-[120px] bg-slate-500 rounded-lg text-white'>Seleccionar</button>
                    </div>
                </div>
    
                <div className='flex items-center justify-between border rounded px-2 py-1 bg-white shadow-sm w-[36%] gap-5'>
                        <h1 >Antonio Jorge Cueva López </h1>
                        <button className='w-[25px] bg-[#FF1111] rounded-full text-white'>x</button>
                </div>

                <div className='flex justify-between'>
                    <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                        <h2 className='font-medium'>Titulo:</h2>
                        <input placeholder='Digite un titulo' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' />
                    </div>
    
                </div>
    
                <div className='flex justify-between gap-[15px]'>
                    <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                        <h2 className='font-medium'>Monto:</h2>
                        <input placeholder='Cuota 1' className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' />
    
                    </div>
    
                    <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                        <h2 className='font-medium'>Fecha Pago:</h2>
                        <input type='date' placeholder='Ingrese una fecha' className='flex items-center rounded-2xl text-[#DAD6D7] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' />
    
    
                    </div>
                </div>
    
                <div className='flex w-full py-4 px-1 h-[68px] justify-end gap-4'>
                    <button onClick={closeEdit} className='h-7  w-[100px] border   rounded-[4px] text-[11px] font-bold '>Cancelar</button>
                    <button className='h-7  w-[100px] border bg-black rounded-[4px] text-[11px] font-bold text-white'>Editar</button>
                </div>
    
            </div>
  )
}

export default EditarExtra