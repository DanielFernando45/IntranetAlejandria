import React, { useEffect, useState } from 'react'
import agregar from '../../../assets/icons/IconAdmin/add-white.svg'
import AsignarExtra from '../../../Components/Administrador/Pagos/AsignarExtra';
import EditarExtra from '../../../Components/Administrador/Pagos/EditarExtra';
import axios from 'axios';

const ServiciosExtra = () => {
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [servicios, setServicios] = useState([]);
    const [servicioSeleccionado, setServicioSeleccionado] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:3001/pagos/listServicios')
            .then((res) => {
                setServicios(res.data)
            })
            .catch(error => {
                console.error('Error al cargar los datos', error);
            });
    }, []);

    const formatearFecha = (fecha) => {
        if (!fecha || fecha === "Por asignar") return "Por Asignar";
        const date = new Date(fecha);
        return date.toLocaleDateString("es-PE");
    };

    return (
        <>
            <div className="flex flex-col bg-white rounded-b-lg ml-8 p-5">
                <div className='flex w-full justify-between items-center'>
                    <h1 className='text-[20px] font-medium'>Servicos Extra</h1>
                    <button onClick={() => setOpen(true)} className='flex justify-between items-center bg-[#1C1C34] rounded-3xl px-2 text-white text-[16px] w-48 h-10 '>
                        Agregar servicio
                        <img src={agregar} alt="" className='h-8' />
                    </button>
                </div>

                <div className='mt-10'>
                    <div className="flex justify-between text-[#495D72] font-medium p-[6px] pr-10 rounded-md gap-6">
                        <div className="w-[40px] flex justify-center">IdAser.</div>
                        <div className="w-[300px] flex justify-start">Delegado/Cliente</div>
                        <div className="w-[210px] flex justify-start">Servicio Extra</div>
                        <div className="w-[160px] flex justify-center">Fecha Pago</div>
                        <div className="w-[90px] flex justify-center">Pago</div>
                        <div className="w-[280px] flex justify-center ">Accion</div>
                    </div>
                    {servicios.map((servicio, index) => (
                        <div 
                          key={servicio.id} 
                          className={`flex justify-between text-[#2B2829] font-normal p-[6px] pr-10 rounded-md gap-6 ${index % 2===0 ? 'bg-white':'bg-[#E9E7E7]'}`}>
                            <div className="w-[40px] flex justify-center">{servicio.id}</div>
                            <div className="w-[300px] flex justify-start">{servicio.delegado}</div>
                            <div className="w-[210px] flex justify-start">{servicio.titulo}</div>
                            <div className="w-[160px] flex justify-center">{formatearFecha(servicio.fecha_pago)}</div>
                            <div className="w-[90px] flex justify-center">S/. {servicio.pago_total}.00</div>
                            <div className='flex gap-1'>
                                <button 
                                    onClick={() => {
                                        setServicioSeleccionado(servicio);
                                        setEdit(true);
                                    }} 
                                    className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#1C1C34] flex justify-center text-white text-[14px]">
                                    Editar
                                </button>
                                <button className="w-[140px] font-medium rounded-md px-3 py-1 bg-[#E32323] flex justify-center text-white text-[14px]">Eliminar</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {open && <AsignarExtra close={() => setOpen(false)} />}
            {edit && <EditarExtra closeEdit={() => setEdit(false)} servicio={servicioSeleccionado} />}
        </>
    )
}

export default ServiciosExtra;