import React, { useState, useEffect } from 'react'
import Zoom from "../../../assets/icons/IconEstudiante/ZoomLink.svg";
import agregar from '../../../assets/icons/pluss.svg';
import CrearZoom from '../../../Components/Asesor/CrearZoom';
import eliminar from '../../../assets/icons/eliminarZoom.svg'
import { useOutletContext } from 'react-router-dom'
import axios from 'axios';

const ReunionProximo = () => {
  const [crear, SetCrear] = useState(false);
  const [reuniones, setReuniones] = useState([]);
  const [loading, setLoading] = useState(true);
  const { selectedAsesoriaId, asesorias } = useOutletContext();

  // Obtener el delegado correspondiente al asesoramiento seleccionado
  const delegado = asesorias.find(a => a.id === selectedAsesoriaId)?.delegado || '';

  useEffect(() => {
    const fetchReuniones = async () => {
      try {
        if (selectedAsesoriaId) {
          const response = await axios.get(`http://localhost:3001/reuniones/allReunionesProximas/${selectedAsesoriaId}`);
          setReuniones(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener las reuniones:', error);
        setLoading(false);
      }
    };

    fetchReuniones();
  }, [selectedAsesoriaId, crear]); // Se vuelve a ejecutar cuando cambia el asesoramiento o se crea una nueva reunión

  // Función para formatear la fecha
  const formatFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    const opcionesMes = { month: 'long' };
    const mes = new Intl.DateTimeFormat('es-ES', opcionesMes).format(fecha);
    const dia = fecha.getDate();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes().toString().padStart(2, '0');
    const ampm = horas >= 12 ? 'PM' : 'AM';
    const horas12 = horas % 12 || 12;
    
    return {
      mes: mes.charAt(0).toUpperCase() + mes.slice(1),
      dia,
      hora: `${horas12}:${minutos} ${ampm}`
    };
  };

  // Extraer meeting ID del enlace Zoom
  const extractMeetingId = (enlace) => {
    if (!enlace) return 'ID no disponible';
    const match = enlace.match(/j\/([^/?]+)/);
    return match ? match[1] : 'ID no disponible';
  };

  if (loading) {
    return <div>Cargando reuniones...</div>;
  }

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-8 flex-wrap">
        {/**BOTON CREAR */}
        <div className="flex gap-3 flex-col w-[310px] h-[150px] items-center justify-center bg-[#F0EFEF] border-[#AAA3A5] rounded-xl">
          <h1>Añadir una nueva reunion</h1>
          <button
            onClick={() => { SetCrear(true) }}
          >
            <img className="w-8" src={agregar} alt="" />
          </button>
        </div>

        {/**REUNIONES PROXIMOS DE ASESOR CON EL DELDEGADO */}
        {reuniones.map((reunion, index) => {
          const fechaFormateada = formatFecha(reunion.fecha_reunion);
          const meetingId = extractMeetingId(reunion.enlace);
          
          return (
            <div key={index} className="flex w-[310px] h-[150px] items-center">
              <div className="flex flex-col justify-center items-center rounded-l-xl h-full w-[104px] bg-[#1C1C34] p-4 text-white">
                <p>{fechaFormateada.mes}</p>
                <h1 className="text-[30px]">{fechaFormateada.dia}</h1>
                <p className="text-[12px]">{fechaFormateada.hora}</p>
              </div>
              <div className="flex flex-col w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
                <span className="flex flex-col gap-[6px]">
                  <div className='flex justify-between'>
                    <p className="font-medium">{reunion.titulo}</p>
                    <button>
                      <img src={eliminar} alt="" />
                    </button>
                  </div>
                  <h1 className="text-[#666666]">Meeting ID: {meetingId}</h1>
                </span>
                <div className="w-full px-5">
                  <button className="flex gap-4 justify-between px-1 h-12 items-center text-white rounded-2xl bg-[#1271ED]">
                    <a href={reunion.enlace} target="_blank" rel="noopener noreferrer" className="w-full flex justify-between items-center px-2">
                      <p className="font-medium">Enlace Zoom</p>
                      <img src={Zoom} alt="Zoom" className="w-6 h-6" />
                    </a>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {crear && (
        <CrearZoom
          Close={() => SetCrear(false)}
          idAsesoramiento={selectedAsesoriaId}
          delegado={delegado}
        />
      )}
    </div>
  )
}

export default ReunionProximo