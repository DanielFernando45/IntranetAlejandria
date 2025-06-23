import React, { useState, useEffect } from 'react';

const Desactivados = () => {
  const [asesorias, setAsesorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAsesorias = async () => {
      try {
        // Obtener el ID del usuario del localStorage
        const userString = localStorage.getItem('user');
        const user = JSON.parse(userString);
        const id = user.id;

        // Hacer la petición a la API
        const response = await fetch(`http://localhost:3001/asesoramiento/misAsesoriasInactivas/${id}`);
        
        if (!response.ok) {
          throw new Error('No tienes  asesorías inactivas');
        }

        const data = await response.json();
        setAsesorias(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAsesorias();
  }, []);

  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', options);
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Cargando asesorías inactivas...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-64 text-red-500">Error: {error}</div>;
  }

  if (asesorias.length === 0) {
    return <div className="flex justify-center items-center h-64">No tienes asesorías inactivas</div>;
  }

  return (
    <div className="flex flex-col bg-white rounded-xl p-2">
      <div className="flex justify-between text-[#495D72] font-medium p-[6px] rounded-md">
        <div className="w-[50px] flex">ID</div>
        <div className="w-[300px] flex">Delegado</div>
        <div className="w-[250px] flex justify-center">Tipo Trabajo</div>
        <div className="w-[180px] flex justify-center">F.inicio</div>
        <div className="w-[180px] flex justify-center">F.vencimiento</div>
        <div className="w-[300px] flex justify-center">Carrera</div>
        <div className="w-[150px] rounded-md px-3 flex justify-center">Reuniones</div>
      </div>
      
      {asesorias.map((asesoria, index) => (
        <div 
          key={asesoria.id} 
          className={`flex justify-between text-[#2B2829] font-normal ${index % 2 === 0 ? 'bg-white' : 'bg-[#E9E7E7]'} p-[6px] rounded-md`}
        >
          <div className="w-[50px] flex">{asesoria.id}</div>
          <div className="w-[300px] flex">{asesoria.delegado}</div>
          <div className="w-[250px] flex justify-center">{asesoria.profesion_asesoria}</div>
          <div className="w-[180px] flex justify-center">{formatDate(asesoria.fecha_inicio)}</div>
          <div className="w-[180px] flex justify-center">-</div> {/* No hay fecha de vencimiento en la API */}
          <div className="w-[300px] flex justify-center">{asesoria.especialidad}</div>
          <div className="w-[150px] rounded-md px-3 border-[#1C1C34] border flex justify-center text-[#1C1C34] cursor-not-allowed">
            Finalizada
          </div>
        </div>
      ))}
    </div>
  );
};

export default Desactivados;