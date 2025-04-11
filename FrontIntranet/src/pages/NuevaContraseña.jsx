import React from 'react'
import Candado from '../assets/icons/Login/passlock.svg';

const NuevaContraseña = () => {
  return (
    <main className='min-h-screen w-screen flex  items-center justify-center fondo_login text-white'>
            <div className='flex flex-col gap-[52px] w-[531px] h-full'>
                <h1 className='text-[35px]'>CAMBIAR LA CONSTRASEÑA</h1>
                <p className='text-[20px]'>Nueva Contraseña</p>
                <div className='border-white h-[55px] border-[3px] border-xy- px-[15px] py-2 rounded-md w-full flex justify-between items-center'>
                    <p className='text-[25px]'>*********************</p>
                    <img src={Candado} alt="" />
                </div>
                <p className='text-[20px]'>Confirmar Contraseña</p>
                <div className='border-white h-[55px]   border-[3px] border-xy- px-[15px] py-2 rounded-md w-full flex justify-between items-center'>
                    <p className='text-[25px]'>*********************</p>
                    <img src={Candado} alt="" />
                </div>
                <p className='text-[19px] font-normal'>
                Se recomienda incluir letras mayúsculas y minúsculas ,caracteres especiales y numeros
                </p>
                <div className='flex justify-center gap-[45px]'>
                    <button className='font-medium text-black w-[168px] h-[55px] flex justify-center items-center bg-white rounded-md'>
                      Cancelar
                    </button>
                    
                    <button className='font-medium w-[168px] h-[55px] flex justify-center items-center bg-[#16162A] rounded-md'>
                      Cambiar
                    </button> 
                </div>
                
            </div>
            
    
        </main>

  )
}

export default NuevaContraseña