import React, { useState,useRef,useEffect } from 'react';
import LayoutApp from '../../layout/LayoutApp';
import check from "../../assets/icons/check.svg";
import desactivar from "../../assets/icons/desactivar.svg";

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
  { id: "0125", nombre: "Juan Mateo Pérez Vinlof", contrato: "Plazo/Al contado/Grupal", fecha: "25/07/24", carrera: "Administracion de empresas Internacionales" },
  { id: "0126", nombre: "Juan Mateo Pérez Vinlof", contrato: "Plazo/Al contado/Grupal", fecha: "25/07/24", carrera: "Administracion de empresas Internacionales" },
  { id: "0127", nombre: "Juan Mateo Pérez Vinlof", contrato: "Plazo/Al contado/Grupal", fecha: "25/07/24", carrera: "Administracion de empresas Internacionales" },
  { id: "0128", nombre: "Antonio Jorge Cueva Lopez", contrato: "Avance/Al contado/Individual", fecha: "25/07/24", carrera: "Administracion de empresas Internacionales" }
];

const Asignaciones = () => {
  const [vista, setVista] = useState("Sin Asignar");
  const [clientesSeleccionados, setClientesSeleccionados] = useState([]);
  const [clientesOcultos, setClientesOcultos] = useState([]);
  const [areaSeleccionada, setAreaSeleccionada] = useState("");
  const [asesorSeleccionado, setAsesorSeleccionado] = useState("");
  const [cambiar, setCambiar] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);



  const handleElegirCliente = (cliente) => {
    if (clientesSeleccionados.length < 2 && !clientesSeleccionados.find(c => c.id === cliente.id)) {
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
    <LayoutApp>
      <main className="flex flex-col mx-32 my-24 items-start">
        <div className="ml-8 flex w-full border-b-2 gap-3 border-black font-normal">
          <button
            className={`px-3 rounded-t-[5px] w-[115px] ${vista === "Sin Asignar" ? "bg-[#17162E] text-white" : ""}`}
            onClick={() => setVista("Sin Asignar")}
          >
            Sin Asignar
          </button>
          <button
            className={`px-3 rounded-t-[5px] w-[105px] ${vista === "Asignados" ? "bg-[#17162E] text-white" : ""}`}
            onClick={() => setVista("Asignados")}
          >
            Asignados
          </button>
        </div>

        <div className="flex flex-col gap-[10px] ml-8 pt-3 p-[30px] w-full bg-white rounded-b-[10px] drop-shadow-lg">
          {vista === "Sin Asignar" ? (
            <>
              <div className="flex flex-col gap-[12px]">
                <h2 className="text-2xl font-semibold">Clientes Sin Asignar</h2>
                <div className="flex flex-col gap-2">
                  {clientesSeleccionados.map(cliente => (
                    <div key={cliente.id} className="flex items-center border rounded px-2 py-1 w-[250px]">
                      {cliente.nombre}
                      <button onClick={() => handleEliminarCliente(cliente.id)} className="ml-2 text-white bg-red-500 rounded-full w-5 h-5 flex items-center justify-center">×</button>
                      
                    </div>
                  ))}
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
          ) : (
            // Sección Asignados
            <div>
              <div className='flex justify-end'>
                <div className=' rounded-lg border border-black px-5'>
                  Filtrar por fecha
                </div>
              </div>
              <div className="flex flex-col  ">
                <div className="flex justify-between text-[#495D72] font-medium p-[6px] rounded-md">
                  <div className="w-[40px] flex justify-center">ID</div>
                  <div className="w-[300px] flex justify-center">Alumno</div>
                  <div className="w-[250px] flex justify-center">Contrato</div>
                  <div className="w-[160px] flex justify-center">Fecha asignación</div>
                  <div className="w-[300px] flex justify-center">Alumno 2</div>
                  <div className="w-[300px] flex justify-center">Asesor</div>
                  <div className="w-[60px] flex justify-center">Estado</div>
                  <div className="w-[200px] flex justify-center ml-3">Accion</div>
                </div>
                {[1,2,3,4,5].map((item, index) => (
                  <div key={index} className={`flex justify-between text-[#2B2829] font-normal ${index % 2 === 0 ? 'bg-[#E9E7E7]' : ''} p-[6px] rounded-md`}>
                    <div className="w-[40px] flex justify-center">0125</div>
                    <div className="w-[300px] flex justify-center">Antonio Jorge Cueva Lopez</div>
                    <div className="w-[250px] flex justify-center">Plazo/Al contado/Grupal</div>
                    <div className="w-[160px] flex justify-center">25/07/24</div>
                    <div className="w-[300px] flex justify-center">{index % 2 === 0 ? '------------------------------' : 'Juan Mateo Pérez Vinlof'}</div>
                    <div className="w-[300px] flex justify-center">Luis Fernando Ramirez</div>
                    <div className="w-[60px] justify-center text-[8px] flex flex-col items-center">
                      <div className='w-[40px] font-semibold h-[20px] rounded-3xl border border-black items-center flex justify-center'>
                        <img className='h-[22px] w-[20px]' src={index % 2 === 0 ? check : desactivar} alt="" />
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
              onClick={() =>  setCambiar(false)}
              className="px-3 py-1 bg-[#1C1C34] text-white rounded "
            >
              Cambiar
            </button>
          </div>
        </div>
      )} 


            </div>  
          )}
        </div>
          
           

      </main>
    </LayoutApp>
  );
};

export default Asignaciones;
