import React, { useState, useRef } from 'react'
import eliminar from "../../../assets/icons/delete.svg"


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

const clientesMock = [
  {
    id: "0125",
    nombre: "Juan Mateo Pérez Vinlof",
    contrato: "Plazo/Al contado/Grupal",
    fecha: "25/07/24",
    carrera: "Administracion de empresas Internacionales"
  },
  {
    id: "0126",
    nombre: "Liora Estel Marvanez Quiroga",
    contrato: "Plazo/Al contado/Grupal",
    fecha: "25/07/24",
    carrera: "Administracion de empresas Internacionales"
  },
  {
    id: "0127",
    nombre: "Darian Eloi Vasquel Tironez",
    contrato: "Plazo/Al contado/Grupal",
    fecha: "25/07/24",
    carrera: "Administracion de empresas Internacionales"
  },
  {
    id: "0128",
    nombre: "Selma Irien Fonbré Lurian",
    contrato: "Avance/Al contado/Individual",
    fecha: "25/07/24",
    carrera: "Administracion de empresas Internacionales"
  },
  {
    id: "0129",
    nombre: "Thiago Emrik Valtrán Ormuez",
    contrato: "Avance/Al contado/Individual",
    fecha: "25/07/24",
    carrera: "Administracion de empresas Internacionales"
  },
  {
    id: "0130",
    nombre: "Nayeli Auren Zevallo Quinterez",
    contrato: "Avance/Al contado/Individual",
    fecha: "25/07/24",
    carrera: "Administracion de empresas Internacionales"
  },
  {
    id: "0131",
    nombre: "Cael Idris Montrel Viedan",
    contrato: "Avance/Al contado/Individual",
    fecha: "25/07/24",
    carrera: "Administracion de empresas Internacionales"
  }
];



const ListarSinAsignar = () => {

  const [clientesSeleccionados, setClientesSeleccionados] = useState([]);
  const [clientesOcultos, setClientesOcultos] = useState([]);
  const [areaSeleccionada, setAreaSeleccionada] = useState("");
  const [asesorSeleccionado, setAsesorSeleccionado] = useState("");
  

  const handleElegirCliente = (cliente) => {
    if (clientesSeleccionados.length < 5 && !clientesSeleccionados.find(c => c.id === cliente.id)) {
      setClientesSeleccionados([...clientesSeleccionados, cliente]);
      setClientesOcultos([...clientesOcultos, cliente.id]);
    }
  };

  const handleEliminarCliente = (clienteId) => {
    setClientesSeleccionados(clientesSeleccionados.filter(c => c.id !== clienteId));
    setClientesOcultos(clientesOcultos.filter(id => id !== clienteId));
  };

  const asesoresFiltrados = Asesor.filter(a => a.area === areaSeleccionada);


  return (
    <>
      <div className="flex flex-col gap-[12px]">
        <h2 className="text-2xl font-semibold">Clientes Sin Asignar</h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-3">
            <h2 className="text-[20px] font-semibold mt-1">Principal:</h2>
            {clientesSeleccionados[0] && (
              <div className="flex items-center border gap-1 rounded px-2 py-[5px] bg-white shadow-sm">
                <span className="text-sm">{clientesSeleccionados[0].nombre}</span>
                <button onClick={() => handleEliminarCliente(clientesSeleccionados[0].id)}>
                  <img src={eliminar} alt="" />
                </button>
              </div>
            )}
          </div>

          {clientesSeleccionados.length > 1 && (
            <div className="flex  gap-2  mt-2">
              {clientesSeleccionados.slice(1).map((cliente) => (
                <div key={cliente.id} className="flex items-center border rounded px-2 py-1 bg-white shadow-sm">
                  <span className="text-sm">{cliente.nombre}</span>
                  <button onClick={() => handleEliminarCliente(cliente.id)}>
                    <img src={eliminar} alt="" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>


      </div>

      <div className="flex justify-between text-[#495D72] font-medium p-[6px] rounded-md">
        <div className="w-[40px] flex justify-center">ID</div>
        <div className="w-[300px] flex justify-center">Alumno</div>
        <div className="w-[250px] flex justify-center">Contrato</div>
        <div className="w-[160px] flex justify-center">Fecha de Creacion</div>
        <div className="w-[360px] flex justify-center">Carrera</div>
        <div className="w-[110px] flex justify-center">Accion</div>
      </div>

      {clientesMock.map(cliente => (
        !clientesOcultos.includes(cliente.id) && (
          <div key={cliente.id} className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7] p-[6px] rounded-md">
            <div className="w-[40px] flex justify-center">{cliente.id}</div>
            <div className="w-[300px] flex justify-center">{cliente.nombre}</div>
            <div className="w-[250px] flex justify-center">{cliente.contrato}</div>
            <div className="w-[160px] flex justify-center">{cliente.fecha}</div>
            <div className="w-[360px] flex justify-center">{cliente.carrera}</div>
            <button onClick={() => handleElegirCliente(cliente)} className="w-[110px] rounded-md px-3 bg-[#1C1C34] flex justify-center text-white">Elegir</button>
          </div>
        )
      ))}

      <div className='flex flex-col gap-4 mt-6'>
        <h2 className='text-[20px] font-medium'>Asesor</h2>
        {!asesorSeleccionado ? (
          <div className='flex justify-between'>
            <select value={areaSeleccionada} onChange={(e) => { setAreaSeleccionada(e.target.value); setAsesorSeleccionado(""); }} className='border border-black rounded-md px-[14px] w-[275px]'>
              <option value="" disabled>Areas</option>
              {[...new Set(Asesor.map(a => a.area))].map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>

            <select value={asesorSeleccionado} onChange={(e) => setAsesorSeleccionado(e.target.value)} className='border border-black rounded-md px-[14px] w-[555px]'>
              <option value="" disabled>Asesor</option>
              {asesoresFiltrados.map(asesor => (
                <option key={asesor.id} value={asesor.asesor}>{asesor.asesor}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex items-center border rounded px-2 py-1 w-fit">
            {asesorSeleccionado}
            <button onClick={() => setAsesorSeleccionado("")} className="ml-2 text-white border bg-[#0900FF] rounded-full w-5 h-5 flex items-center justify-center">×</button>
          </div>
        )}
      </div>

      <div className='flex flex-col gap-4 mt-4'>
        <h2 className='text-[20px] font-medium'>Fechas</h2>
        <div className='flex justify-start gap-28'>
          <div className='flex gap-4'>
            <p>Fecha inicio:</p>
            <input type="date" className='border border-black rounded-md px-[14px] w-[275px]' />
          </div>
          <div className='flex gap-4'>
            <p>Fecha final:</p>
            <input type="date" className='border border-black rounded-md px-[14px] w-[275px]' />
          </div>
        </div>
      </div>

      <div className='flex gap-5 justify-end'>
        <div className="flex justify-center w-[140px] h-8 rounded font-semibold border border-black px-6 py-1">
          <p>Cancelar</p>
        </div>
        <div className="flex justify-center text-white w-[140px] h-8 rounded font-semibold bg-[#1C1C34] px-6 py-1">
          <p>Asignar</p>
        </div>
      </div>
    </>
  )
}

export default ListarSinAsignar