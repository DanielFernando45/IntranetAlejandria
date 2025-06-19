import React, { useEffect, useState } from 'react'
import LayoutApp from '../../layout/LayoutApp'

const PagosEstudiante = () => {
  const [asesorias, setAsesorias] = useState([]);
  const [selectedAsesoriaId, setSelectedAsesoriaId] = useState(null);
  const [pagosAsesoria, setPagosAsesoria] = useState([]);
  const [pagosServicios, setPagosServicios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const usuario = localStorage.getItem('user');
    if (usuario) {
      const user = JSON.parse(usuario);
      const id = user.id;

      fetch(`http://localhost:3001/cliente/miAsesoramiento/${id}`)
        .then(res => res.json())
        .then(data => {
          const asesoriasArray = Object.values(data).map(item => ({
            id: item.id,
            profesion: item.profesion_asesoria
          }));
          setAsesorias(asesoriasArray);

          if (asesoriasArray.length > 0) {
            const primeraAsesoriaId = asesoriasArray[0].id;
            setSelectedAsesoriaId(primeraAsesoriaId);
          }
        })
        .catch(error => console.error('Error al obtener asesorías:', error))
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    if (selectedAsesoriaId) {
      // Obtener pagos de asesoría
      fetch(`http://localhost:3001/pagos/misAsesorias/${selectedAsesoriaId}`)
        .then(res => res.json())
        .then(data => setPagosAsesoria(data))
        .catch(error => console.error('Error al obtener pagos de asesoría:', error));

      // Obtener pagos de servicios
      fetch(`http://localhost:3001/pagos/misServicios/${selectedAsesoriaId}`)
        .then(res => res.json())
        .then(data => setPagosServicios(data))
        .catch(error => console.error('Error al obtener pagos de servicios:', error));
    }
  }, [selectedAsesoriaId]);

  const handleChange = (e) => {
    const asesoriaId = e.target.value;
    setSelectedAsesoriaId(asesoriaId);
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }

  const calcularTotalDeuda = () => {
    const total = [...pagosAsesoria, ...pagosServicios].reduce((sum, pago) => sum + pago.monto, 0);
    return total;
  }

  const calcularDeudaPendiente = () => {
    const pendiente = [...pagosAsesoria, ...pagosServicios]
      .filter(pago => pago.estado_pago === 'pendiente')
      .reduce((sum, pago) => sum + pago.monto, 0);
    return pendiente;
  }

  if (loading) {
    return (
      <LayoutApp>
        <main className='ml-5 mr-20 bg-white rounded-[20px] h-[658px] p-10 flex items-center justify-center'>
          <div>Cargando...</div>
        </main>
      </LayoutApp>
    );
  }

  return (
    <LayoutApp>
      <main className='ml-5 mr-20 bg-white rounded-[20px] h-[658px] p-10'>
        <div className='flex flex-col gap-7'>
          <div className='w-full'>
            <h1 className='text-[20px] font-bold'>Estado de cuenta</h1>
          </div>

          <div className='flex justify-between'>
            <div className='w-[80%]'>
              <div className='flex flex-row justify-between p-2'>
                <div className='flex justify-center w-[170px]'>Título</div>
                <div className='flex justify-center w-[80px]'>Monto</div>
                <div className='flex justify-center w-[250px]'>Fecha de pago</div>
                <div className='flex justify-center w-[100px]'>Estado</div>
              </div>
              
              {pagosAsesoria.length > 0 ? (
                pagosAsesoria.map((pago, index) => (
                  <div 
                    key={index} 
                    className={`flex flex-row justify-between ${index % 2 === 0 ? 'bg-[#E9E7E7]' : ''} p-2 rounded-lg`}
                  >
                    <div className='flex justify-center w-[170px]'>{pago.titulo}</div>
                    <div className='flex justify-center w-[80px]'>S/{pago.monto}</div>
                    <div className='flex justify-center w-[250px]'>{formatDate(pago.fecha_pago)}</div>
                    <div className={`flex justify-center w-[100px] ${
                      pago.estado_pago === 'pagado' ? 'text-[#1DEE43] border-[#1DEE43]' : 'text-[#EE1D1D] border-[#EE1D1D]'
                    } border rounded-lg`}>
                      {pago.estado_pago === 'pagado' ? 'Pagado' : 'Pendiente'}
                    </div>
                  </div>
                ))
              ) : (
                <div className='text-center py-4 bg-[#E9E7E7] rounded-xl'>No hay pagos de asesoría registrados</div>
              )}
            </div>
            
            <div className='flex flex-col gap-4 w-[230px]'>
              <select 
                onChange={handleChange}
                value={selectedAsesoriaId || ''}
                className='border rounded-t-md border-[#b4a6aa]'
              >
                {asesorias.map((asesoria, index) => (
                  <option key={index} value={asesoria.id}>{asesoria.profesion}</option>
                ))}
              </select>

              <div className='flex justify-between'>
                <h2>Deuda total:</h2>
                <h2 className='text-[#82777A]'>S/.{calcularTotalDeuda()}</h2>
              </div>
              <div className='flex justify-between'>
                <h2>Deuda pendiente:</h2>
                <h2 className='text-[#82777A]'>S/.{calcularDeudaPendiente()}</h2>
              </div>
            </div>
          </div>
          
          <div className='w-full'>
            <h1 className='text-[20px] font-bold'>Otros Pagos</h1>
          </div>

          <div className='w-full'>
            <div className='flex flex-row justify-between p-2'>
              <div className='flex justify-center w-[300px]'>Título</div>
              <div className='flex justify-center w-[80px]'>Monto</div>
              <div className='flex justify-center w-[160px]'>Fecha de pago</div>
              <div className='flex justify-center w-[100px]'>Estado</div>
            </div>
            
            {pagosServicios.length > 0 ? (
              pagosServicios.map((pago, index) => (
                <div 
                  key={index} 
                  className={`flex flex-row justify-between ${index % 2 === 0 ? 'bg-[#E9E7E7]' : ''} p-2 rounded-lg`}
                >
                  <div className='flex justify-center w-[300px]'>{pago.titulo}</div>
                  <div className='flex justify-center w-[80px]'>S/{pago.monto}</div>
                  <div className='flex justify-center w-[160px]'>{formatDate(pago.fecha_pago)}</div>
                  <div className={`flex justify-center w-[100px] ${
                    pago.estado_pago === 'pagado' ? 'text-[#1DEE43] border-[#1DEE43]' : 'text-[#EE1D1D] border-[#EE1D1D]'
                  } border rounded-lg`}>
                    {pago.estado_pago === 'pagado' ? 'Pagado' : 'Pendiente'}
                  </div>
                </div>
              ))
            ) : (
              <div className='text-center py-4 bg-[#E9E7E7] rounded-xl'>No hay otros pagos registrados</div>
            )}
          </div>
        </div>
      </main>
    </LayoutApp>
  )
}

export default PagosEstudiante