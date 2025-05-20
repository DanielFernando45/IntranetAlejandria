import React, { useEffect, useState } from 'react';
import perfil from "../../assets/icons/PerfilIcon.svg";
import LayoutApp from '../../layout/LayoutApp';

const MiAsesor = () => {
  const [asesorias, setAsesorias] = useState([]);
  const [asesores, setAsesores] = useState([]);
  const [selectedAsesoriaId, setSelectedAsesoriaId] = useState(null);

  // Obtener asesorías al cargar el componente
  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const id = user.id;

      fetch(`http://localhost:3001/cliente/miAsesoramiento/${id}`)
        .then(res => res.json())
        .then(data => {
          const asesoriasArray = Object.values(data).map(item => ({
            id: item.id,
            profesion: item.profesion_asesoria
          }));
          setAsesorias(asesoriasArray);

          // Auto-seleccionar la primera asesoría si existe
          if (asesoriasArray.length > 0) {
            const primeraAsesoriaId = asesoriasArray[0].id;
            setSelectedAsesoriaId(primeraAsesoriaId);
            obtenerDatosAsesor(primeraAsesoriaId);
          }
        })
        .catch(error => console.error('Error al obtener asesorías:', error));
    }
  }, []);

  // Función para obtener los datos del asesor
  const obtenerDatosAsesor = (asesoriaId) => {
    fetch(`http://localhost:3001/asesor/datosbyAsesoramiento/${asesoriaId}`)
      .then(res => res.json())
      .then(data => {
        const asesoresArray = Object.values(data);
        setAsesores(asesoresArray);
      })
      .catch(error => console.error('Error al obtener datos del asesor:', error));
  };

  // Manejo de cambio de selección
  const handleChange = (e) => {
    const asesoriaId = e.target.value;
    setSelectedAsesoriaId(asesoriaId);
    obtenerDatosAsesor(asesoriaId);
  };

  return (
    <LayoutApp>
      <main className="m-32">
        <div className='ml-8 fondo_login rounded-t-[20px] w-full h-14 shadow-xl'></div>
        <div className="shadow-xl flex flex-col items-center gap-[22px] ml-8 pb-12 pt-[38px] w-full h-full px-12 bg-white rounded-b-[20px]">
          <div className='flex justify-start w-full'>
            <select
              className='border-2 rounded-md px-2 border-black'
              onChange={handleChange}
              value={selectedAsesoriaId || ''}
            >
              
              {asesorias.map((asesoria, index) => (
                <option key={index} value={asesoria.id}>{asesoria.profesion}</option>
              ))}
            </select>
          </div>

          <h1 className='text-xl font-medium'>Mi asesor</h1>
          <img src={perfil} alt="Perfil" className='w-[240px] h-[240px]' />

          {asesores.length > 0 ? (
            asesores.map((asesor, index) => (
              <div key={index} className='text-center'>
                <h1 className='text-xl font-medium'>{asesor.nombre} {asesor.apellido}</h1>
                <h2>{asesor.areaNombre}</h2>
                <p>{asesor.gradoAcademico}</p>
              </div>
            ))
          ) : (
            <p className='text-gray-500'>Selecciona una asesoría para ver los detalles</p>
          )}
        </div>
      </main>
    </LayoutApp>
  );
};

export default MiAsesor;
