import React from 'react'
import LayoutApp from '../../layout/LayoutApp'
import perfil from "../../assets/icons/PerfilIcon.svg"
import { useNavigate } from "react-router-dom";


const MiPerfil = () => {
    const navigate = useNavigate();

    const handlerEdit = () =>{
        navigate('/estudiante/miperfiledit');
    }
    
  return (
    <LayoutApp>
        <main className="m-20">
            
            <div className='ml-8 fondo_login rounded-t-[20px] w-full h-14 '> </div>
            <div className="flex flex-col  gap-[40px] ml-8  pb-12 pt-[38px] w-full h-full px-5 bg-white rounded-b-[20px] ">
                
                <div className='flex justify-between gap-[22px] items-center'>
                    
                    <div className='flex gap-[22px] items-center'>
                        <img  src={perfil} alt="" className='w-[94px] h-[94px]' />
                        
                        <div> 
                            <h3 className='text-[20px] font-medium'>Juan Alonso Perez Castro</h3> 
                            <p className='text-[#808080]'>alonsoCastro14@gmail.com</p>
                        </div>  
                    </div>

                     <button onClick={handlerEdit} className='flex justify-center items-center text-white  bg-black rounded-lg w-[87px] h-[41px]'>
                        Edit
                     </button>

                    
                </div>

                <div className='flex flex-col gap-4'>

                    <div className='flex gap-10'>

                        <div className='flex flex-col gap-3 w-full'>
                            <p className='pl-[1px]'>Nombres</p>
                            <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  >
                                Juan Alonso
                            </div>
                        </div>
                        
                        <div className='flex flex-col gap-3 w-full'>
                            <p className='pl-[1px]'>Apellidos</p>
                            <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  >
                                Perez Castro
                            </div>
                        </div>

                    </div>

                     <div className='flex  gap-10 '>

                        <div className='flex flex-col gap-3 w-full'>
                            <p className='pl-[1px]'>Carrera</p>
                            <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  >
                                    Marketing
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <p className='pl-[1px]'>Tipo de trabajo</p>
                            <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  >
                                    Suficiencia profesional
                            </div>
                        </div>

                    </div>

                    <div className='flex  gap-10 '>

                        <div className='flex flex-col gap-3 w-full'>
                            <p className='pl-[1px]'>Universidad</p>
                            <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  >
                                     UPC
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <p className='pl-[1px]'>Actual nivel educativo</p>
                            <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  >
                                    Bachiller
                            </div>
                        </div>

                    </div>

                    <div className='flex  gap-10 '>

                        <div className='flex flex-col gap-3 w-full'>
                            <p className='pl-[1px]'>Correo electrónico</p>
                            <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  >
                                    alonsoCastro14@gmail.com
                            </div>
                        </div>
                        <div className='flex flex-col gap-3 w-full'>
                            <p className='pl-[1px]'>Pais</p>
                            <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  >
                                     Peru
                            </div>
                        </div>

                    </div> 


                </div>
                
            </div>
            
        </main>

    </LayoutApp>
    
  )
}

export default MiPerfil
