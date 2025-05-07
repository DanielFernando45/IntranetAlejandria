import React, { useState,useRef } from 'react'
import eliminar from "../../../assets/icons/delete.svg"
import check from "../../../assets/icons/check.svg"


const Asesor = [
  { id: 1, area: "Ingeneria", asesor: "Emanuel Flores" },
  { id: 2, area: "Ingeneria", asesor: "Haider" },
  { id: 3, area: "Ingeneria", asesor: "Gabriela" },
  { id: 4, area: "Economia", asesor: "Daniel Lope" },
  { id: 5, area: "Negocios", asesor: "Brenda" },
  { id: 6, area: "Legal", asesor: "Victor" },
  { id: 7, area: "Negocios", asesor: "Daniel Lope" },
  { id: 8, area: "Salud", asesor: "Diana Solis" },
  { id: 9, area: "Salud", asesor: "Tony" }
];

const ListarAsignados = () => {

  const [cambiar, setCambiar] = useState(false);
  const dropdownRef = useRef(null);

  const [areaSeleccionada, setAreaSeleccionada] = useState("");
  const [asesorSeleccionado, setAsesorSeleccionado] = useState("");


  const asesoresFiltrados = Asesor.filter(a => a.area === areaSeleccionada);
  return (
    <>
      <div className='flex justify-end'>
        <div className=' rounded-lg border border-black px-5'>
          Filtrar por fecha
        </div>
      </div>
      <div className="flex flex-col  ">
        <div className="flex justify-between text-[#495D72] font-medium p-[6px] rounded-md">
          <div className="w-[80px] flex justify-center">IdAsesoria</div>
          <div className="w-[300px] flex justify-center">Delegado</div>
          <div className="w-[250px] flex justify-center">Contrato</div>
          <div className="w-[160px] flex justify-center">Fecha asignación</div>
          <div className="w-[300px] flex justify-center">Clientes</div>
          <div className="w-[300px] flex justify-center">Asesor</div>
          <div className="w-[60px] flex justify-center">Estado</div>
          <div className="w-[200px] flex justify-center ml-3">Accion</div>
        </div>
        {[1, 2, 3, 4, 5].map((item, index) => (
          <div key={index} className={`flex justify-between text-[#2B2829] font-normal ${index % 2 === 0 ? 'bg-[#E9E7E7]' : ''} p-[6px] rounded-md`}>
            <div className="w-[80px] flex justify-center">0125</div>
            <div className="w-[300px] flex justify-center">Antonio Jorge Cueva Lopez</div>
            <div className="w-[250px] flex justify-center">Plazo/Al contado/Grupal</div>
            <div className="w-[160px] flex justify-center">25/07/24</div>
            <div className="w-[300px] flex justify-center">{index % 2 === 0 ? '------------------------------' : 'Juan Mateo Pérez Vinlof'}</div>
            <div className="w-[300px] flex justify-center">Luis Fernando Ramirez</div>
            <div className="w-[60px] justify-center text-[8px] flex flex-col items-center">
              <div className='w-[40px] font-semibold h-[20px] rounded-3xl border border-black items-center flex justify-start'>
                <img className='h-[22px] w-[20px]' src={index % 2 === 0 ? check : eliminar} alt="" />
              </div>
              {index % 2 === 0 ? 'Activado' : 'Desactivado'}
            </div>
            <div className="w-[200px] text-white ml-3">
              <button
                onClick={() => setCambiar(!cambiar)}
                className='bg-[#1C1C34] w-[160px] rounded-md px-3 py-1 flex justify-center'
              >
                Cambiar asesor
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-end mt-4'>
        <button className=' border-green-950 border-[3px]  rounded-lg w-[180px] text-white bg-black'>
          Agregar Asesoria
        </button>
      </div>

      {cambiar && (
        <div
          ref={dropdownRef}
          className="absolute top-12 ml-96 bg-[#F8F7F7] border border-gray-300 rounded shadow-lg p-4 w-64 pb-10"
        >
          <div className='w-full flex justify-center text-[20px] mb-5'>
            <h1>Nuevo asesor</h1>
          </div>

          <div className="mb-4">
            <select value={areaSeleccionada} onChange={(e) => { setAreaSeleccionada(e.target.value); setAsesorSeleccionado(""); }} className="w-full  rounded px-2 py-1">
              <option value="" disabled>Areas</option>
              {[...new Set(Asesor.map(a => a.area))].map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">

            <select value={asesorSeleccionado} onChange={(e) => setAsesorSeleccionado(e.target.value)} className="w-full  rounded px-2 py-1">
              <option value="" disabled>Asesor</option>
              {asesoresFiltrados.map(asesor => (
                <option key={asesor.id} value={asesor.asesor}>{asesor.asesor}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-center gap-4 mt-7">
            <button
              onClick={() => setCambiar(false)}
              className="px-3 py-1 border border-black rounded hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              onClick={() => setCambiar(false)}
              className="px-3 py-1 bg-[#1C1C34] text-white rounded "
            >
              Cambiar
            </button>
          </div>
        </div>
      )}

    </>
  )
}

export default ListarAsignados