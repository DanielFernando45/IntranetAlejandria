import React from 'react'
import busqueda from "../../../assets/icons/busqueda.svg"

const Buscar = () => {
  return (
    <div className="flex gap-5">
      <div className="w-full h-8 rounded-md px-[10px] py-[6px] bg-[#E4E2E2]">
        <img src={busqueda} alt="" />
      </div>
      <div className="flex justify-center text-white w-[113px] h-8 rounded font-semibold  bg-[#1B435D] px-6 py-1">
        Buscar
      </div>
    </div>
  )
}

export default Buscar