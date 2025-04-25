import React from 'react'
import perfil from "../../assets/icons/PerfilIcon.svg"
import LayoutApp from '../../layout/LayoutApp'


const MiAsesor = () => {
   
  return (
     <LayoutApp>
        <main className="m-32">
            <div className='ml-8 fondo_login rounded-t-[20px] w-full h-14 shadow-xl'> </div>
                    <div className="shadow-xl flex flex-col items-center  gap-[22px] ml-8  pb-12 pt-[38px] w-full h-full px-12 bg-white rounded-b-[20px] ">           
                        <h1 className='text-xl font-medium' >Mi asesor</h1>
                        <img  src={perfil} alt="" className='w-[240px] h-[240px]' />    
                        <h1 className='text-xl font-medium'>Juan Alonso</h1> 
                        <h2>Area de Ciencias Sociales y Letras</h2> 
                        <p>Doctorado en Derecho laboral Internacional</p>   
                    </div>
            </main>
    </LayoutApp>
    
  )
}

export default MiAsesor
