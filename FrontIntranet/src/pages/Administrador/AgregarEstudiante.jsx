import React from 'react';
import LayoutApp from '../../layout/LayoutApp';
import { useNavigate } from "react-router-dom";

const AgregarEstudiante = () => {

    const navigate = useNavigate();
    const handlerAtras = () =>{
        navigate('/admin/gestionar-usuarios')
    }

  return (
    <LayoutApp>
        <main className="m-20">
                    
            <div className='ml-8 fondo_login rounded-t-[20px] w-full h-14 '> </div>
            <div className="flex flex-col  gap-[40px] ml-8  pb-12 pt-[38px] w-full h-full px-5 bg-white rounded-b-[20px] ">
                        
                <div className='flex flex-col gap-4'>
        
                    <div className='flex gap-10'>
        
                                <div className='flex flex-col gap-3 w-full'>
                                    <p className='pl-[1px]'>Nombres</p>
                                    <input placeholder='Ingrese nombres' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'/>
  
                                </div>
                                
                                <div className='flex flex-col gap-3 w-full'>
                                    <p className='pl-[1px]'>Apellidos</p>
                                    <input placeholder='Ingrese apellidos' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  />
                                        
                                </div>
        
                    </div>
        
                    <div className='flex  gap-10 '>
        
                                <div className='flex flex-col gap-3 w-full'>
                                    <p className='pl-[1px]'>Telefono</p>
                                    <input placeholder='Agregar Telefono' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />
                                            
                                </div>
                                <div className='flex flex-col gap-3 w-full'>
                                    <p className='pl-[1px]'>DNI</p>
                                    <input placeholder='Ingrese dni' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />
                                </div>
        
                    </div>
        
                    <div className='flex  gap-10 '>
                                    
                                <div className='flex flex-col gap-3 w-full'>
                                    <p className='pl-[1px]'>Contrato</p>
                                    <select  className='flex bg-[#F9F9F9] w-full h-[55px] rounded-lg text-[#808080] items-center p-4'  >
                                        <option value="">Plazo/Al contado/Individual</option>
                                        <option value="">Plazo/Al contado/Grupal</option>
                                        <option value="">Plazo/Cuotas/Individual</option>
                                        <option value="">Plazo/Cuotas/Grupal</option>
                                        <option value="">Avance/Al contado/Individual</option>
                                        <option value="">Avance/Al contado/Grupal</option>
                                        <option value="">Avance/Cuotas/Individual</option>
                                        <option value="">Avance/Cuotas/Grupal</option>
                                    </select>
                                </div>
                                <div className='flex flex-col gap-3 w-full'>
                                    <p className='pl-[1px]'>Tipo de Trabajo </p>
                                    <select className='flex bg-[#F9F9F9] w-full h-[55px] rounded-lg text-[#808080] items-center p-4'  >
                                         <option value="">Proyecto bachillerato</option>
                                         <option value="">Tesis</option>
                                         <option value="">Tesis Maestría</option>
                                         <option value="">Tesis Doctorado</option>
                                         <option value="">Proyecto </option>
                                         <option value="">Informe</option>
                                         <option value="">Plan de Negocio</option>
                                         <option value="">Revisión Sistemática</option>
                                         <option value="">Estudio de Perfectibilidad</option>
                                         <option value="">Insufiencia Profesional</option>
                                    </select>
                                </div>
                                    
                    </div>

                    <div className='flex  gap-10 '>
        
                                <div className='flex flex-col gap-3 w-full'>
                                    <p className='pl-[1px]'>Universidad</p>
                                    <input placeholder='Ingresar Universidad' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />
                                             
                                </div>
                                <div className='flex flex-col gap-3 w-full'>
                                    <p className='pl-[1px]'>Actual nivel educativo</p>
                                    <select className='flex bg-[#F9F9F9] w-full h-[55px] rounded-lg text-[#808080] items-center p-4'  >
                                            <option value="">Bachiller</option>
                                            <option value="">Titulado</option>
                                            <option value="">Maestria</option>
                                            <option value="">Doctorado</option>
                                    </select>
                                </div>
        
                    </div>

                            
        
                    <div className='flex  gap-10 '>
        
                                <div className='flex flex-col gap-3 w-full'>
                                    <p className='pl-[1px]'>Correo electrónico</p>
                                    <input placeholder='Ingrese Correo' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />
                                            
                                </div>
                                <div className='flex flex-col gap-3 w-full'>
                                   <p className='pl-[1px]'>Pais</p>
                                    <input placeholder='Ingrese pais' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'  />
                                </div>
        
                    </div> 

                    <div className='flex gap-10 items-end'>
        
                        <div className='flex flex-col gap-3 w-full'>
                            <p className='pl-[1px]'>Carrera</p>
                            <input placeholder='Ingrese la Carrera ' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'/>          
                        </div>
                                
                        <div className='flex w-full h-full gap-[50px] justify-center'>
                            <button onClick={handlerAtras} className=' h-[46px] w-[180px] flex justify-center items-center p-4 rounded-lg border border-black'>
                                        Cancelar
                             </button>
                             <button className=' h-[46px] w-[180px] flex justify-center items-center fondo_login text-white p-4 rounded-lg'>
                                        Añadir
                            </button>   
                        </div>
        
                    </div>
        
                </div>
                        
            </div>
                    
        </main>

    </LayoutApp>
    
  )
}

export default AgregarEstudiante