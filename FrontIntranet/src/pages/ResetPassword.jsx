import React from 'react'
import email from '../assets/icons/mail.svg'


const ResetPassword = () => {
  return (
    <main className='min-h-screen w-screen flex  items-center justify-center fondo_login text-white'>
        <div className='flex flex-col gap-[52px] w-[531px] h-full'>
            <h1 className='text-[40px]'>Recuperacion Contraseña</h1>
            <p className='text-[20px]'>Digite su correo:</p>
            <div className='border-white h-[55px]  border-[3px] border-xy- px-[15px] py-2 rounded-md w-full flex justify-end'>
                <img src={email} alt="" />
            </div>
            <p className='text-[18px]'>
                Se le enviara una url a su correo para confirmar el cambio de 
                contraseña si no le llega presione enviar de nuevo luego de 3 
                minutos.
            </p>
            <div className='flex justify-center'>
               <button className='w-[168px] h-[55px] flex justify-center items-center bg-[#16162A] rounded-md'>
                    <a href="/cambiarContraseña">ENVIAR </a>
                </button> 
            </div>
            
        </div>
        

    </main>

  )
}

export default ResetPassword