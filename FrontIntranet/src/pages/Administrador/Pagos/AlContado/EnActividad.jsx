import React, { useEffect, useState } from 'react'
import axios from "axios"
import EditarAlContado from '../../../../Components/Administrador/Pagos/EditarAlContado'

const EnActividad = () => {
    const [clientes, setClientes] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [editar, setEditar] = useState(false)
    const [clienteEdit, setClienteEdit] = useState(null)

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const response = await axios.get('http://localhost:3001/pagos/contado')
                setClientes(response.data)
                setLoading(false)
            } catch (err) {
                setError(err.message)
                setLoading(false)
                console.error("Error al obtener los datos:", err)
            }
        }

        fetchClientes()
    }, [])

    const formatearFecha = (fecha) => {
        if (!fecha) return '--/--/----'
        const date = new Date(fecha)
        return date.toLocaleDateString('es-PE', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        })
    }

    const handleEditarClick = (cliente) => {
        setClienteEdit(cliente)
        setEditar(true)
    }

    const handleActualizarPago = async (id, datosActualizados) => {
        try {
            await axios.patch(`http://localhost:3001/pagos/updateContado/${id}`, datosActualizados)
            
            // Actualizar el estado local
            setClientes(clientes.map(cliente => 
                cliente.id_infoPago === id 
                    ? { ...cliente, 
                        ultimo_monto: datosActualizados.pago_total,
                        fecha_ultimo_pago: datosActualizados.fecha_pago
                      } 
                    : cliente
            ))
            
            setEditar(false)
        } catch (err) {
            console.error("Error al actualizar el pago:", err)
        }
    }

    if (loading) {
        return <div className="flex justify-center py-4">Cargando datos...</div>
    }

    if (error) {
        return <div className="flex justify-center py-4 text-red-500">Error: {error}</div>
    }

    return (  
        <div className="flex flex-col">
            <div className="flex justify-between text-[#495D72] font-medium p-[6px] pr-10 rounded-md">
                <div className="w-[40px] flex justify-center">ID</div>
                <div className="w-[300px] flex justify-center">Alumno</div>
                <div className="w-[210px] flex justify-center">Asesoria</div>
                <div className="w-[160px] flex justify-center">Fecha Pago</div>
                <div className="w-[370px] flex justify-center">Monto del contrato</div>
                <div className="w-[120px] flex justify-center">Accion</div>
            </div>

            {clientes.map((cliente, index) => (
                <div 
                    key={cliente.id_infoPago}
                    className={`flex justify-between text-[#2B2829] ${
                        index % 2 === 0 ? 'bg-[#E9E7E7]' : 'bg-[#ffffff]'
                    } font-normal p-[6px] pr-10 rounded-md`}
                >
                    <div className="w-[40px] flex justify-center">{cliente.id_infoPago}</div>
                    <div className="w-[300px] flex justify-center">{cliente.delegado}</div>
                    <div className="w-[210px] flex justify-center">{cliente.contrato}</div>
                    <div className="w-[160px] flex justify-center">
                        {formatearFecha(cliente.fecha_ultimo_pago)}
                    </div>
                    <div className="w-[370px] flex justify-center">S/ {cliente.ultimo_monto.toLocaleString('es-PE')}</div>
                    <button 
                        onClick={() => handleEditarClick(cliente)}
                        className="w-[120px] font-medium rounded-md px-4 py-1 bg-[#0A8EAA] ml-1 flex justify-center text-white text-[14px]"
                    >
                        Editar
                    </button>
                </div>
            ))}
            {editar && (
              <EditarAlContado
                cliente={clienteEdit}
                onUpdate={handleActualizarPago}
                cerrar={() => setEditar(false)}
              />  
            )}
        </div>
    )
}

export default EnActividad