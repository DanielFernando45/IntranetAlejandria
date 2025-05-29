import React from 'react'
import Zoom from "../../../assets/images/zoom.svg";
import agregar from '../../../assets/icons/pluss.svg';

const ReunionProximo = () => {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-8 ">
        <div className="flex gap-3 flex-col w-[310px] h-[150px] items-center justify-center bg-[#F0EFEF] border-[#AAA3A5] rounded-xl">
          <h1>Añadir una nueva reunion</h1>
          <button>
            <img className="w-8" src={agregar} alt="" />
          </button>
        </div>

        <div className="flex w-[310px] h-[150px] items-center ">
          <div className="flex flex-col justify-center items-center rounded-l-xl h-full w-[104px] bg-[#054755] p-4 text-white">
            <p>Marzo</p>
            <h1 className="text-[30px]">2</h1>
            <p className="text-[12px]">12:00 PM</p>
          </div>
          <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
            <span className="flex flex-col gap-[6px]">
              <p className="font-medium">Entrega de avance</p>
              <h1 className="text-[#666666]">Entrega del avance de metodologia</h1>
            </span>
            <span className="flex gap-8">
              <a href=""><p className="font-medium">Enlace</p> </a>
              <img src={Zoom} alt="" />
            </span>

          </div>
        </div>

        <div className="flex w-[310px] h-[150px] items-center ">
          <div className="flex flex-col justify-center items-center rounded-l-xl h-full w-[104px] bg-[#0A8EAA] p-4 text-white">
            <p>Marzo</p>
            <h1 className="text-[30px]">2</h1>
            <p className="text-[12px]">12:00 PM</p>
          </div>
          <div className="flex flex-col   w-full h-full  border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
            <span className="flex flex-col gap-[6px]">
              <p className="font-medium">Reunion</p>
              <h1 className="text-[#666666]">Reunión con el asesor para ver el estado del arte</h1>
            </span>
            <span className="flex gap-8">
              <a href=""><p className="font-medium">Enlace</p> </a>
              <img src={Zoom} alt="" />
            </span>

          </div>
        </div>

        <div className="flex w-[310px] h-[150px] items-center ">
          <div className="flex flex-col justify-center items-center rounded-l-xl h-full w-[104px] bg-[#0A8EAA] p-4 text-white">
            <p>Marzo</p>
            <h1 className="text-[30px]">2</h1>
            <p className="text-[12px]">12:00 PM</p>
          </div>
          <div className="flex flex-col   w-full h-full  border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
            <span className="flex flex-col gap-[6px]">
              <p className="font-medium">Reunion</p>
              <h1 className="text-[#666666]">Reunión con el asesor para ver el estado del arte</h1>
            </span>
            <span className="flex gap-8">
              <a href=""><p className="font-medium">Enlace</p> </a>
              <img src={Zoom} alt="" />
            </span>

          </div>
        </div>

        <div className="flex w-[310px] h-[150px] items-center ">
          <div className="flex flex-col justify-center items-center rounded-l-xl h-full w-[104px] bg-[#054755] p-4 text-white">
            <p>Marzo</p>
            <h1 className="text-[30px]">2</h1>
            <p className="text-[12px]">12:00 PM</p>
          </div>
          <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
            <span className="flex flex-col gap-[6px]">
              <p className="font-medium">Entrega de avance</p>
              <h1 className="text-[#666666]">Entrega del avance de metodologia</h1>
            </span>
            <span className="flex gap-8">
              <a href=""><p className="font-medium">Enlace</p> </a>
              <img src={Zoom} alt="" />
            </span>

          </div>
        </div>

      </div>

      <div className="flex gap-8 ">
        <div className="flex w-[310px] h-[150px] items-center ">
          <div className="flex flex-col justify-center items-center  rounded-l-xl  h-full w-[104px] bg-[#17162E] p-4 text-white">
            <p>Marzo</p>
            <h1 className="text-[30px]">2</h1>
            <p className="text-[12px]">12:00 PM</p>
          </div>
          <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl  ">
            <span className="flex flex-col gap-[6px]">
              <p className="font-medium">Reunion</p>
              <h1 className="text-[#666666]">Reunión con el asesor para ver el estado del arte</h1>
            </span>
            <span className="flex gap-8">
              <a href=""><p className="font-medium">Enlace</p> </a>
              <img src={Zoom} alt="" />
            </span>

          </div>
        </div>

        <div className="flex w-[310px] h-[150px] items-center ">
          <div className="flex flex-col justify-center items-center rounded-l-xl h-full w-[104px] bg-[#054755] p-4 text-white">
            <p>Marzo</p>
            <h1 className="text-[30px]">2</h1>
            <p className="text-[12px]">12:00 PM</p>
          </div>
          <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
            <span className="flex flex-col gap-[6px]">
              <p className="font-medium">Entrega de avance</p>
              <h1 className="text-[#666666]">Entrega del avance de metodologia</h1>
            </span>
            <span className="flex gap-8">
              <a href=""><p className="font-medium">Enlace</p> </a>
              <img src={Zoom} alt="" />
            </span>

          </div>
        </div>

        <div className="flex w-[310px] h-[150px] items-center ">
        </div>

      </div>


    </div>
  )
}

export default ReunionProximo