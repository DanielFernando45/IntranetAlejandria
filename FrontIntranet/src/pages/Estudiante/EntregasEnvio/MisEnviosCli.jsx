import React from 'react'
import { useState, useEffect } from "react";
import arrowIcon from '../../../assets/icons/IconEstudiante/arriba.svg'
import descargar from '../../../assets/icons/Descargas.svg'

const MisEnviosCli = () => {
  const [isOpen, setIsOpen] = useState(false);
    const toggleOpen = () => {
      setIsOpen(!isOpen)
    }
  return (
    <div className="flex flex-col  ">
          <div className="flex justify-between text-[#495D72] font-medium   p-[6px] rounded-md">
            <div className="w-[300px] flex ">Titulo</div>
            <div className="w-[102px] flex justify-center">Estado</div>
            <div className="w-[100px] flex justify-center">Fecha</div>
            <div className="w-[250px] flex justify-center">Archivo</div>
            <div className="w-[65px] rounded-md px-3   flex justify-center "> Descargas </div>
          </div>
          <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7] p-[6px] rounded-md">
            <div className="w-[300px] flex ">Observaciones de la introducción</div>
            <button className='text-white bg-[#353563] rounded px-3 '>Terminado</button>
            <div className="w-[100px] flex justify-center">May 25,2025</div>
            <div className="w-[250px] flex justify-center">Puntos_importantes.pdf</div>
            <div className="w-[65px] flex justify-center ">
              <button onClick={toggleOpen} className="transition-transform duration-300">
                <img
                  src={arrowIcon}
                  alt="toggle"
                  className={`transform transition-transform duration-300  ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                />
              </button>
            </div>
    
          </div>
          {isOpen && (
            <div className="flex justify-between text-[#2B2829] font-normal  p-[6px] rounded-md items-center">
              <div className="w-[300px] flex ">Observaciones de la introducción</div>
              <button className='text-white bg-[#353563] rounded px-3 '>Terminado</button>
              <div className="w-[100px] flex flex-col justify-center gap-5">
    
                <p>May 22,2025</p>
    
              </div>
              <div className="w-[250px] flex flex-col justify-center gap-5 items-center">
                <p>Correcion.docx</p>
                <p>Puntos_importantes.pdf</p>
                <p>Analisis.docx</p>
              </div>
              <div className="flex flex-col gap-5 w-[65px] justify-center items-center">
                <button className="transition-transform duration-300">
                  <img src={descargar} alt="toggle" />
                </button>
                <button className="transition-transform duration-300">
                  <img src={descargar} alt="toggle" />
                </button>
                <button className="transition-transform duration-300">
                  <img src={descargar} alt="toggle" />
                </button>
              </div>
    
            </div>
    
    
          )}
    
    
    
        </div>
  )
}

export default MisEnviosCli