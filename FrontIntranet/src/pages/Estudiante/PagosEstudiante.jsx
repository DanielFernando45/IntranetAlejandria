import React, { useState } from 'react'
import LayoutApp from '../../layout/LayoutApp'

const PagosEstudiante = () => {
  const [pagos,setPagos] = useState([]);

  
  
  return (
    <LayoutApp>
      <main className='ml-5 mr-20 bg-white rounded-[20px]  h-[658px] p-10'>
        <div className='flex flex-col gap-7'>
          <div className='w-full'>
            <h1 className='text-[20px] font-bold'>Estado de cuenta </h1>
          </div>

          <div className='flex justify-between'>
            <div className='w-[80%]'>
              <div className='flex flex-row justify-between p-2'>
                <div className='flex justify-center w-[170px]'>Titulo</div>
                <div className='flex justify-center w-[80px]'>Monto</div>
                <div className='flex justify-center w-[160px]'>Fecha vencimiento</div>
                <div className='flex justify-center w-[100px]'>Estado</div>
              </div>
              <div className='flex flex-row justify-between bg-[#E9E7E7] p-2 rounded-lg'>
                <div className='flex justify-center w-[170px]'>Cuota 1</div>
                <div className='flex justify-center w-[80px]'>S/1100</div>
                <div className='flex justify-center w-[160px]'>25 de Marzo 2025</div>
                <div className='flex justify-center w-[100px] text-[#1DEE43] border border-[#1DEE43] rounded-lg '>Pagado</div>
              </div>
              <div className='flex flex-row justify-between p-2'>
                <div className='flex justify-center w-[170px]'>Cuota 1</div>
                <div className='flex justify-center w-[80px]'>S/1100</div>
                <div className='flex justify-center w-[160px]'>13 de Abril 2025</div>
                <div className='flex justify-center w-[100px] text-[#1DEE43] border border-[#1DEE43] rounded-lg '>Pagado</div>
              </div>
              <div className='flex flex-row justify-between bg-[#E9E7E7] p-2 rounded-lg'>
                <div className='flex justify-center w-[170px]'>Cuota 1</div>
                <div className='flex justify-center w-[80px]'>S/1100</div>
                <div className='flex justify-center w-[160px]'>25 de Febrero 2025</div>
                <div className='flex justify-center w-[100px] text-[#1DEE43] border border-[#1DEE43] rounded-lg '>Pagado</div>
              </div>
            </div>
            <div className='flex flex-col gap-4 w-[230px] '>
              <select className='border rounded-t-md border-[#b4a6aa]'>
                <option value="">Servicios</option>
                <option value="">Derecho contable</option>
                <option >Derecho administrativo</option>
                <option value="">Derecho internacional</option>
              </select>
              <div className='flex justify-between'>
                <h2>Deuda total:</h2>
                <h2 className='text-[#82777A]'>S/.3300</h2>
              </div>
              <div className='flex justify-between'>
                <h2>Deuda pendiente:</h2>
                <h2 className='text-[#82777A]'>S/.3300</h2>
              </div>
            </div>
          </div>
          <div className='w-full'>
            <h1 className='text-[20px] font-bold'>Otros Pagos </h1>
          </div>

          <div className=''>
            <div className='w-[full]'>
              <div className='flex flex-row justify-between p-2'>
                <div className='flex justify-center w-[300px]'>Titulo</div>
                <div className='flex justify-center w-[80px]'>Monto</div>
                <div className='flex justify-center w-[160px]'>Fecha vencimiento</div>
                <div className='flex justify-center w-[100px]'>Estado</div>
              </div>
              <div className='flex flex-row justify-between bg-[#E9E7E7] p-2 rounded-lg'>
                <div className='flex justify-center w-[300px]'>Prueba de turnitin</div>
                <div className='flex justify-center w-[80px]'>S/1100</div>
                <div className='flex justify-center w-[160px]'>25 de Marzo 2025</div>
                <div className='flex justify-center w-[100px] text-[#1DEE43] border border-[#1DEE43] rounded-lg '>Pagado</div>
              </div>
              <div className='flex flex-row justify-between p-2'>
                <div className='flex justify-center w-[300px]'>Elaboración de paper</div>
                <div className='flex justify-center w-[80px]'>S/1100</div>
                <div className='flex justify-center w-[160px]'>13 de Abril 2025</div>
                <div className='flex justify-center w-[100px] text-[#1DEE43] border border-[#1DEE43] rounded-lg '>Pagado</div>
              </div>
              <div className='flex flex-row justify-between bg-[#E9E7E7] p-2 rounded-lg'>
                <div className='flex justify-center w-[300px]'>Especialista usando proteus</div>
                <div className='flex justify-center w-[80px]'>S/1100</div>
                <div className='flex justify-center w-[160px]'>25 de Febrero 2025</div>
                <div className='flex justify-center w-[100px] text-[#1DEE43] border border-[#1DEE43] rounded-lg '>Pagado</div>
              </div>
            </div>
            
          </div>
          
        </div>
        <div></div>
      </main>
    </LayoutApp>

  )
}

export default PagosEstudiante