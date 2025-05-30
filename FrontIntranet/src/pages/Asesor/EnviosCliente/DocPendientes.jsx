import React, { useEffect, useState } from 'react'
import arrowIcon from '../../../assets/icons/IconEstudiante/arriba.svg'
import axios from 'axios'
import { useOutletContext } from 'react-router-dom'
import FechaEstimada from '../../../Components/Asesor/FechaEstimada'
import EnviarAvance from '../../../Components/Asesor/EnviarAvance'

const DocPendientes = () => {
  const [pendientes, setPendientes] = useState([])
  const [openItems, setOpenItems] = useState({})
  const [showFechaEstimada, setShowFechaEstimada] = useState(null)
  const [checkedItems, setCheckedItems] = useState({})
  const [showEnviarAvance, setShowEnviarAvance] = useState(null)
  const idAsesoramiento = useOutletContext()

  useEffect(() => {
    if (idAsesoramiento) {
      fetchPendientes()
    }
  }, [idAsesoramiento])

  const fetchPendientes = () => {
    axios.get(`http://localhost:3001/asuntos/all/${idAsesoramiento}`)
      .then(response => {
        setPendientes(response.data)
        const initialChecked = {}
        response.data.forEach(item => {
          initialChecked[item.id_asunto] = !!item.fecha_terminado
        })
        setCheckedItems(initialChecked)
      })
      .catch(error => {
        console.error('Error al obtener los pendientes:', error)
      })
  }

  const toggleOpen = (id) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const toggleEnviarAvance = (id) => {
    setShowEnviarAvance(id)
  }

  const handleCloseEnviarAvance = () => {
    setShowEnviarAvance(null)
  }

  const handleCheckboxClick = (id) => {
    if (!checkedItems[id]) {
      setShowFechaEstimada(id)
    }
  }

  const handleCloseFechaEstimada = () => {
    setShowFechaEstimada(null)
  }

  const handleSubmitFecha = (id, fecha) => {
    const now = new Date();
    const fechaCompleta = `${fecha} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    
    axios.patch(`http://localhost:3001/asuntos/en_proceso/${id}`, {
      fecha_terminado: fechaCompleta
    })
    .then(response => {
      setCheckedItems(prev => ({
        ...prev,
        [id]: true
      }))
      setShowFechaEstimada(null)
      fetchPendientes()
    })
    .catch(error => {
      console.error('Error al asignar fecha:', error)
    })
  }

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  const formatTime = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const handleSubmitAvance = async (id, titulo, files) => {
    try {
      const formData = new FormData()
      formData.append('titulo', titulo)
      files.forEach(file => {
        formData.append('files', file)
      })

      await axios.patch(`http://localhost:3001/asuntos/finished/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      fetchPendientes()
      setShowEnviarAvance(null)
    } catch (error) {
      console.error('Error al enviar avance:', error)
    }
  }

  return (
    <div className="flex flex-col gap-3 relative">
      {pendientes.map((pendiente) => (
        <div key={pendiente.id_asunto} className="flex flex-col text-[#2B2829] font-normal bg-[#E9E7E7] p-[6px] rounded-md px-6 transition-all duration-300">
          <div className='flex justify-between items-center '>
            <div className="w-[300px] flex">{pendiente.titulo}</div>
            <div className="w-[250px] flex justify-center">
              {formatDate(pendiente.fecha_entrega)}
            </div>
            <button 
              onClick={() => toggleEnviarAvance(pendiente.id_asunto)}
              className='flex justify-center items-center w-[180px] h-[30px] font-medium rounded-3xl bg-[#0CB2D5] text-white'
            >
              ENVIAR AVANCE
            </button>
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
            <>
              <div className='flex flex-col transition-all duration-300 ease-in-out mt-5'>
                <div className='flex justify-between'>
                  <div>{pendiente.documento_0}</div>
                  <div className='flex w-[450px] gap-4'>
                    <p>Enviado: {formatDate(pendiente.fecha_entrega)}</p>
                  </div>
                  <div>{formatTime(pendiente.fecha_entrega)}</div>
                  <div className='flex gap-5'>
                    <div className='text-white bg-[#054755] rounded-md px-6'>
                      Entregado
                    </div>
                    <input 
                      className='w-[25px]' 
                      type="checkbox" 
                      checked={checkedItems[pendiente.id_asunto] || false}
                      onChange={() => handleCheckboxClick(pendiente.id_asunto)}
                      disabled={checkedItems[pendiente.id_asunto]}
                    />
                  </div>
                </div>
                
                {checkedItems[pendiente.id_asunto] && pendiente.fecha_terminado && (
                  <div className='flex justify-between mt-3'>
                    <div>{pendiente.documento_0}</div>
                    <div className='flex w-[450px] gap-4'>
                      <p>Estimado: {formatDate(pendiente.fecha_terminado)}</p>
                    </div>
                    <div>{formatTime(pendiente.fecha_terminado)}</div>
                    <div className='flex gap-5'>
                      <div className='text-white bg-[#0CB2D5] rounded-md px-8'>
                        {pendiente.estado}
                      </div>
                      <input 
                        className='w-[25px]' 
                        type="checkbox" 
                        checked={true}
                        disabled={true}
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      ))}
      
      {showFechaEstimada && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseFechaEstimada}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <FechaEstimada 
              onClose={handleCloseFechaEstimada}
              onSubmit={(fecha) => handleSubmitFecha(showFechaEstimada, fecha)}
            />
          </div>
        </div>
      )}
      
      {showEnviarAvance && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleCloseEnviarAvance}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <EnviarAvance
              show={true}
              onClose={handleCloseEnviarAvance}
              onSubmit={(titulo, files) => handleSubmitAvance(showEnviarAvance, titulo, files)}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default DocPendientes