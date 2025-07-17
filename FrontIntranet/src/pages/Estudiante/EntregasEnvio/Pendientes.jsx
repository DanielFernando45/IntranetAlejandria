import React, { useEffect, useState } from 'react'
import arrowIcon from '../../../assets/icons/IconEstudiante/arriba.svg'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom';

const Pendientes = () => {
  const [pendientes, setPendientes] = useState([])
  const [openItems, setOpenItems] = useState({})

  const idAsesoramiento = useOutletContext();

  useEffect(() => {
    if (idAsesoramiento) {
      axios.get(`http://localhost:3001/asuntos/all/${idAsesoramiento}`)
        .then(response => {
          setPendientes(response.data)
        })
        .catch(error => {
          console.error('Error al obtener los pendientes:', error)
        })
    }
  }, [idAsesoramiento])

  const toggleOpen = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    return date.toLocaleDateString('es-PE', options)
  }

  const formatDateExpan = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const options = { month: 'short', day: 'numeric' }
    return date.toLocaleDateString('es-PE', options)
  }

  const formatTime = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleTimeString('es-PE', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,           // <-- Esto activa el formato 12 horas
      timeZone: 'America/Lima'
    })
  }
  const cortarTexto = (texto) =>{
    const index = texto.indexOf('-');
    if (index !== -1) {
      return texto.substring(index + 1);     
    }
    return texto; // Si no se encuentra el guion, devuelve el texto original
  }

  return (
    <div className="flex flex-col gap-3">
      {pendientes.map((pendiente) => (
        <div key={pendiente.id_asunto} className="flex flex-col text-[#2B2829] font-normal bg-[#E9E7E7] p-[6px] rounded-md px-6 transition-all duration-300">
          <div className='flex justify-between items-center py-1'>
            <div className="w-[300px] flex">{pendiente.titulo}</div>
            <div className="w-[250px] flex justify-center">
              {formatDate(pendiente.fecha_entrega)}
            </div>
            <div className='text-white bg-[#054755] rounded-md px-6'>
                  {pendiente.estado === 'entregado' ? 'Entregado' : pendiente.estado}
                </div>
            <button 
              onClick={() => toggleOpen(pendiente.id_asunto)} 
              className="transition-transform duration-300"
            >
              <img 
                src={arrowIcon} 
                alt="toggle" 
                className={`transform transition-transform duration-300 ${openItems[pendiente.id_asunto] ? 'rotate-180' : 'rotate-0'}`} 
              />
            </button>
          </div>

          {openItems[pendiente.id_asunto] && (
            <div className='flex flex-col gap-2 transition-all duration-300 ease-in-out mt-5'>
              <div className='flex justify-between'>
                <div>{cortarTexto(pendiente.documento_0)}</div>
                <div className='flex w-[450px] gap-4'>
                  <p>Enviado: {formatDateExpan(pendiente.fecha_entrega)}</p>
                  <p>Estimado: {formatDateExpan(pendiente.fecha_terminado)}</p>
                </div>
                <div>{formatTime(pendiente.fecha_terminado)}</div>
                <div className='text-white bg-[#054755] rounded-md px-6'>
                  {pendiente.estado === 'entregado' ? 'Entregado' : pendiente.estado}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      
    </div>
  )
}

export default Pendientes