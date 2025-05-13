// Código modificado sin usar estado en el arreglo para la animación
import React, { useState, useRef } from 'react'
import { useNavigate } from "react-router-dom";
import desactivado from "../../../assets/icons/delete.svg"
import activado from "../../../assets/icons/check.svg"
import flechaabajo from "../../../assets/icons/Flecha.svg";
import flechaarriba from "../../../assets/icons/arrow-up.svg";
import eliminar from "../../../assets/icons/tacho.svg"


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

const formatFecha = (fechaStr) => {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const [dia, mes, anio] = fechaStr.split("/");
  return `${dia} de ${meses[parseInt(mes) - 1]}, 20${anio}`;
};

const ListarAsignados = () => {
  const navigate = useNavigate();
  const [cambiar, setCambiar] = useState(false);
  const [expandedRows, setExpandedRows] = useState({});
  const [estadoLocal, setEstadoLocal] = useState({});
  const dropdownRef = useRef(null);

  const [areaSeleccionada, setAreaSeleccionada] = useState("");
  const [asesorSeleccionado, setAsesorSeleccionado] = useState("");

  const asesoresFiltrados = Asesor.filter(a => a.area === areaSeleccionada);

  const asignados = [
    {
      id: "0125",
      nombre: "Antonio Jorge Cueva Lopez",
      tipo: "Tesis Doctorado",
      fecha: "25/05/25",
      clientes: { cliente1: "Juan Pérez" },
      asesores: "Luis Fernando Ramirez"
    },
    {
      id: "0126",
      nombre: "Maria Garcia Fernandez",
      tipo: "Maestria",
      fecha: "26/05/25",
      clientes: { cliente1: "Juan Mateo Pérez Vinlof" },
      asesores: "Luis Fernando Ramirez"
    },
    {
      id: "0128",
      nombre: "Carlos Sanchez Rodriguez",
      tipo: "Licenciatura",
      fecha: "27/05/25",
      clientes: {
        cliente1: "Alonso Baldeon Timana",
        cliente2: "Yamir Juarez",
        cliente3: "Gabriel Ferran"
      },
      asesores: "Luis Fernando Ramirez"
    }
  ];

  const toggleEstadoVisual = (id) => {
    setEstadoLocal(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleClientes = (index) => {
    setExpandedRows(prev => ({ ...prev, [index]: !prev[index] }));
  }

  const handleNuevaAsesoria = () =>{
    navigate('/admin/asignaciones/asesoria-nueva')
  }

  return (
    <div>
      <div className='flex justify-end mb-4'>
        <div className='rounded-lg border border-black px-5'>Filtrar por fecha</div>
      </div>
      <div className="flex flex-col">
        <div className="flex justify-between text-[#495D72] font-medium p-[6px] rounded-md">
          <div className="w-[80px] flex justify-center">IdAsesoria</div>
          <div className="w-[300px] flex justify-center">Delegado</div>
          <div className="w-[250px] flex justify-center">Tipo Trabajo</div>
          <div className="w-[180px] flex justify-center">Fecha asignación</div>
          <div className="w-[300px] flex justify-center">Clientes</div>
          <div className="w-[300px] flex justify-center">Asesor</div>
          <div className="w-[60px] flex justify-center">Estado</div>
          <div className="w-[200px] flex justify-center ml-3">Acción</div>
          <div className='w-[40px]'></div>
        </div>
        {asignados.map((a, index) => {
          const clientes = Object.values(a.clientes);
          const mostrarFlecha = clientes.length > 1;
          const mostrarTodos = expandedRows[index];
          const primerCliente = clientes[0] + (clientes.length > 1 && !mostrarTodos ? '...' : '');
          const estadoActual = estadoLocal[a.id] ?? false;
          return (
            <div key={index} className={`flex justify-between items-center text-[#2B2829] font-normal ${index % 2 === 0 ? 'bg-[#E9E7E7]' : ''} p-[6px] rounded-md`}>
              <div className="w-[80px] flex justify-center">{a.id}</div>
              <div className="w-[300px] flex justify-center">{a.nombre}</div>
              <div className="w-[250px] flex justify-center">{a.tipo}</div>
              <div className="w-[180px] flex justify-center">{formatFecha(a.fecha)}</div>
              <div className="w-[300px] flex flex-col justify-center items-center">
                <div>{primerCliente}</div>
                {mostrarTodos && clientes.slice(1).map((c, i) => (
                  <div key={i}>{c}</div>
                ))}
              </div>
              <div className="w-[300px] flex justify-center">{a.asesores}</div>
              <div className="w-[60px] text-[8px] flex flex-col items-center">
                <button onClick={() => toggleEstadoVisual(a.id)}
                  className={`w-[60px] h-[25px] font-semibold rounded-3xl border border-black flex items-center transition-all duration-[700ms] ease-in-out ${estadoActual ? 'justify-end pr-1' : 'justify-start pl-1'}`}>
                  <img 
                    className='h-[20px] w-[20px] transition-transform duration-[700ms] ease-in-out' 
                    src={estadoActual ? activado : desactivado} 
                    alt="estado" 
                  />
                </button>
                {estadoActual ? 'Activado' : 'Desactivado'}
              </div>
              <div className="flex w-[200px] gap-1 items-center justify-center text-white ml-3">
                <button  className='bg-[#1C1C34] w-[100px] rounded-md px-3 py-1 flex justify-center'>
                  Editar
                </button>
                <button>
                  <img src={eliminar} alt="" />
                </button>
              </div>
              <div className='w-[40px]'>
                {mostrarFlecha && (
                  <img
                    src={mostrarTodos ? flechaarriba : flechaabajo}
                    alt="toggle"
                    className="cursor-pointer transition-transform duration-300 transform hover:scale-110"
                    onClick={() => toggleClientes(index)}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className='flex justify-end mt-4'>
        <button onClick={handleNuevaAsesoria} className='border-green-950 border-[3px] rounded-lg w-[180px] text-white bg-black'>Agregar Asesoría</button>
      </div>

      
    </div>
  );
};

export default ListarAsignados;
