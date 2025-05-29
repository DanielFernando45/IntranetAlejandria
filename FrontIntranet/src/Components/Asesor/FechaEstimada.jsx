import React from 'react'

const FechaEstimada = () => {
  return (
    <div className='flex flex-col justify-center bg-white rounded w-[440px]'>
        <div>Fecha de Entrega</div>
        <div className='w-[330px] flex gap-1'>
             <p>Estimado: </p>   
             <input className='bg-white rounded w-[330px]' type="date" placeholder='elija la fecha'/>
        </div>
        <button className='bg-[#DAD6D7] rounded-md px-5 w-[100px]'>Agregar</button>

    </div>
  )
}

export default FechaEstimada