import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import desactivado from "../../../assets/icons/delete.svg"
import activado from "../../../assets/icons/check.svg"
import flechaabajo from "../../../assets/icons/Flecha.svg";
import flechaarriba from "../../../assets/icons/arrow-up.svg";
import eliminar from "../../../assets/icons/tacho.svg"
import axios from "axios";

const formatFecha = (fechaISO) => {
  const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const fecha = new Date(fechaISO);
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const anio = fecha.getFullYear();
  return `${dia} de ${mes}, ${anio}`;
};

const ListarAsignados = () => {
  const navigate = useNavigate();
  const [expandedRows, setExpandedRows] = useState({});
  const [estadoLocal, setEstadoLocal] = useState({});
  const [asesoramientos, setAsesoramientos] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/asesoramiento/listar")
      .then((res) => {
        setAsesoramientos(res.data);
      })
      .catch((err) => console.error("Error al obtener asesoramientos:", err));
  }, []);

  const toggleEstadoVisual = (id) => {
    setEstadoLocal(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleClientes = (index) => {
    setExpandedRows(prev => ({ ...prev, [index]: !prev[index] }));
  }

  const handleNuevaAsesoria = () => {
    navigate('/admin/asignaciones/asesoria-nueva')
  }

  // Función para obtener todos los estudiantes de un asesoramiento
  const obtenerEstudiantes = (asesoramiento) => {
    const estudiantes = [];
    for (let i = 2; i <= 5; i++) {
      const key = `estudiante${i}`;
      if (asesoramiento[key]) {
        estudiantes.push(asesoramiento[key]);
      }
    }
    return estudiantes;
  };

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
        {asesoramientos.map((a, index) => {
          const estudiantes = obtenerEstudiantes(a);
          const tieneEstudiantes = estudiantes.length > 0;
          const mostrarFlecha = estudiantes.length > 1;
          const mostrarTodos = expandedRows[index];
          const primerCliente = tieneEstudiantes ? 
            (estudiantes.length > 1 && !mostrarTodos ? `${estudiantes[0]}...` : estudiantes[0]) 
            : "----------------------";
          const estadoActual = estadoLocal[a.id_asesoramiento] ?? (a.estado === "activo");

          return (
            <div key={a.id_asesoramiento} className={`flex justify-between items-center text-[#2B2829] font-normal ${index % 2 === 0 ? 'bg-[#E9E7E7]' : ''} p-[6px] rounded-md`}>
              <div className="w-[80px] flex justify-center">{a.id_asesoramiento}</div>
              <div className="w-[300px] flex justify-center">{a.delegado || "----------------------"}</div>
              <div className="w-[250px] flex justify-center">{a.tipo_trabajo}</div>
              <div className="w-[180px] flex justify-center">{formatFecha(a.fecha_inicio)}</div>
              <div className="w-[300px] flex flex-col justify-center items-center">
                <div>{primerCliente}</div>
                {mostrarTodos && estudiantes.slice(1).map((estudiante, i) => (
                  <div key={i}>{estudiante}</div>
                ))}
              </div>
              <div className="w-[300px] flex justify-center">{a.asesor}</div>
              <div className="w-[60px] text-[8px] flex flex-col items-center">
                <button onClick={() => toggleEstadoVisual(a.id_asesoramiento)}
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
                <button className='bg-[#1C1C34] w-[100px] rounded-md px-3 py-1 flex justify-center'>
                  Editar
                </button>
                <button>
                  <img src={eliminar} alt="" />
                </button>
              </div>
              <div className='w-[40px] flex justify-center'>
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