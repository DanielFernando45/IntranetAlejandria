import React, { useEffect, useState } from 'react'
import Zoom from "../../../assets/icons/IconEstudiante/ZoomLink.svg";
import { useOutletContext } from 'react-router-dom'

const ReunionAnteriores = () => {
  const { selectedAsesoriaId } = useOutletContext();
  const [reuniones, setReuniones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReuniones = async () => {
      try {
        const response = await fetch(`http://localhost:3001/reuniones/allReunionesAnteriores/${selectedAsesoriaId}`);
        if (!response.ok) {
          throw new Error('Error al obtener las reuniones');
        }
        const data = await response.json();
        setReuniones(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (selectedAsesoriaId) {
      fetchReuniones();
    }
  }, [selectedAsesoriaId]);

  // Función para formatear la fecha
  const formatFecha = (fechaString) => {
    const fecha = new Date(fechaString);
    const opcionesMes = { month: 'long' };
    const mes = new Intl.DateTimeFormat('es-ES', opcionesMes).format(fecha);
    const dia = fecha.getDate();
    const horas = fecha.getHours();
    const minutos = fecha.getMinutes();
    const ampm = horas >= 12 ? 'PM' : 'AM';
    const horas12 = horas % 12 || 12;
    const minutosFormateados = minutos < 10 ? `0${minutos}` : minutos;

    return {
      mes: mes.charAt(0).toUpperCase() + mes.slice(1),
      dia,
      hora: `${horas12}:${minutosFormateados} ${ampm}`
    };
  };

  if (loading) return <div>Cargando reuniones...</div>;
  if (error) return <div>Error: {error}</div>;
  if (reuniones.length === 0) return <div>No hay reuniones anteriores registradas</div>;

  // Agrupar reuniones en grupos de 3 para el diseño
  const gruposDeReuniones = [];
  for (let i = 0; i < reuniones.length; i += 3) {
    gruposDeReuniones.push(reuniones.slice(i, i + 3));
  }

  return (
    <div className="flex flex-col gap-5">
      {gruposDeReuniones.map((grupo, grupoIndex) => (
        <div key={grupoIndex} className="flex gap-8">
          {grupo.map((reunion, index) => {
            const fechaFormateada = formatFecha(reunion.fecha_reunion);

            return (
              <div key={`${reunion.ID}-${index}`} className="flex w-[310px] h-[150px] items-center">
                <div className="flex flex-col justify-center items-center rounded-l-xl h-full w-[104px] bg-[#17162E] p-4 text-white">
                  <p>{fechaFormateada.mes}</p>
                  <h1 className="text-[30px]">{fechaFormateada.dia}</h1>
                  <p className="text-[12px]">{fechaFormateada.hora}</p>
                </div>
                <div className="flex flex-col w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
                  <span className="flex flex-col gap-[6px]">
                    <p className="font-medium">Título: {reunion.titulo}</p>
                  </span>
                  <button className="flex gap-4 justify-between px-1 h-12 items-center text-white rounded-2xl bg-[#1271ED]">
                    <a href={reunion.enlace} target="_blank" rel="noopener noreferrer" className="w-full flex justify-between items-center px-2">
                      <p className="font-medium">Enlace Zoom</p>
                      <img src={Zoom} alt="Zoom" className="w-6 h-6" />
                    </a>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

export default ReunionAnteriores;