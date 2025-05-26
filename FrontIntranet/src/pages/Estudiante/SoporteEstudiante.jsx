import React from 'react';
import LayoutApp from '../../layout/LayoutApp';
import PreguntasFrecuentes from '../../Components/Cliente/PreguntasFrecuentes';

const SoporteEstudiante = () => {
  return (
    <LayoutApp>
      <main className='flex mx-20 justify-between'>
        <div className='flex flex-col w-[50%] h-[850px] bg-white rounded-xl p-5 gap-24'>
          <div className='flex w-full justify-center text-[30px] font-semibold'>
            <h1>Formulario de soporte</h1>
          </div>
          <div className='flex flex-col gap-[31px]'>
            <h2 className='text-[20px]'>Asunto</h2>
            <select className='border p-5 rounded-lg '>
              <option value="">Seleccione un asunto</option>
            </select>
            <h2 className='text-[20px]'>Descripción</h2>
            <textarea className='border rounded-xl w-full h-[318px] p-6' placeholder='Ingrese una descripción'></textarea>
            <button className='w-full h-[79px] bg-[#1C1C34] text-white text-[20px] font-semibold rounded-lg'>
              Enviar
            </button>
          </div>
        </div>

        <div className='flex flex-col gap-10 w-[40%] h-[850px] bg-white rounded-xl p-10'>
          <h1 className='text-[30px]'>Soluciones Frecuentes</h1>
          <PreguntasFrecuentes />
        </div>
      </main>
    </LayoutApp>
  );
};

export default SoporteEstudiante;
