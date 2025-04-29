import React from 'react'
import LayoutApp from '../../layout/LayoutApp';
import { useNavigate } from "react-router-dom";

const EditarAsesor = () => {
  const navigate = useNavigate();
  const handlerAtras = () => {
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
                <input placeholder='Juan Alonso' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />

              </div>

              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>Apellidos</p>
                <input placeholder='Perez Castro' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />

              </div>

            </div>

            <div className='flex  gap-10 '>

              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>Area </p>
                <select className='flex bg-[#F9F9F9] w-full h-[55px] rounded-lg text-[#808080] items-center p-4'  >
                  <option value="">Ingeneria</option>
                  <option value="">Social</option>
                  <option value="">Salud</option>
                  <option value="">Legal</option>
                  <option value="">Negocio </option>
                </select>
              </div>
              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>Especialidad</p>
                <input placeholder='Ing. Industrial' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />
              </div>

            </div>

            <div className='flex  gap-10 '>

              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>Universidad</p>
                <input placeholder='UPC' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />

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
                <input placeholder='alonsoCastro14@gmail.com' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />

              </div>
              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>Teléfono</p>
                <input placeholder='934327810' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />
              </div>

            </div>

            <div className='flex gap-10 items-end'>

              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>DNI</p>
                <input placeholder='7192734321' className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />
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

export default EditarAsesor