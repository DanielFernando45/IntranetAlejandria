import React from 'react'
import LayoutApp from '../../layout/LayoutApp'
import LogoAleja from "../../assets/icons/IconEstudiante/LogoOscuro.svg";

const MiContrato = () => {
  return (
    <LayoutApp>
        <main className="m-24">
          <div className='ml-8 fondo_login rounded-t-[20px] w-full h-14 '> </div>
              <div className="flex flex-col  gap-[40px] ml-8  pb-12 pt-[38px] w-full h-full px-12 bg-white rounded-b-[20px] ">           
                  <div className='flex flex-col gap-4'>
                      <h1 className='text-[23px] font-medium'>Contrato</h1>

                      <div className='flex gap-10'>

                        <div className='flex flex-col gap-3 w-full'>
                            <p className='pl-[1px]'>Modalidad Contrato</p>
                            <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  >
                                Financiado/Al contado
                            </div>
                        </div>
                        
                        <div className='flex flex-col gap-3 w-full'>
                            <p className='pl-[1px]'>Tipo Entrega</p>
                            <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  >
                                Avance/Plazo
                            </div>
                        </div>

                      </div>

                      <div className='flex  gap-10 '>

                        <div className='flex flex-col gap-3 w-full'>
                            <p className='pl-[1px]'>Fecha Inicio</p>
                            <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  >
                                    14/11/24
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <p className='pl-[1px]'>Fecha Fin</p>
                            <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  >
                                    14/07/25
                            </div>
                        </div>

                      </div>

                      <div className='flex  gap-10 '>

                        <div className='flex flex-col gap-3 w-full'>
                            <p className='pl-[1px]'>Modalidad</p>
                            <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  >
                                     Individual/Grupal
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            
                        </div>

                      </div>
                  </div> 
                  <div className='flex h-[127px] w-full justify-end'>
                      <img className='h-full ' src={LogoAleja} alt="Logo Alejandría" />
                  </div>             
              </div>
        </main>
    </LayoutApp>
    
  )
}

export default MiContrato
