import React from 'react'
import LayoutApp from '../../layout/LayoutApp'

const CambiarContraseña = () => {
  return (
    <LayoutApp>
        <main className="m-32 flex justify-center">
            <div className='flex flex-col items-center w-[493px] h-[515px]  bg-white rounded-2xl px-6 py-[39px] gap-9 sombra '>
               <h1 className='text-xl font-medium'>CAMBIAR LA CONSTRASEÑA</h1>
                <div className='flex flex-col gap-5'>
                     <div className='flex  justify-between '>
                        <div className='py-4 w-[163px]'>Contraseña</div>
                        <div className='p-4 w-[231px] h-full rounded-lg border-black border'>
                            ********
                        </div>
                     </div>
                     <div className='flex  justify-between '>
                        <div className='py-4 w-[163px]'>Nueva Contraseña</div>
                        <div className='p-4 w-[231px] h-full rounded-lg border-black border'>
                            ********
                        </div>
                     </div>
                     <div className='flex  justify-between py-4 h-[94px] items-center'>
                        <div className='py-4 w-[163px]'>Confirmar la Contraseña</div>
                        <div className='p-4 w-[231px] h-full rounded-lg border-black border'>
                            ********
                        </div>
                     </div>                  
                </div>
                <div className='flex w-full h-[65px] justify-between'>
                     <div className='text-[25px] w-[205px] flex justify-center items-center p-4 rounded-lg border border-black'>
                        Cancelar
                     </div>
                     <div className='text-[25px] w-[205px] flex justify-center items-center fondo_login text-white p-4 rounded-lg'>
                        Cambiar
                     </div>   
                </div>
            </div>
        </main>
    </LayoutApp>
    
  )
}

export default CambiarContraseña
