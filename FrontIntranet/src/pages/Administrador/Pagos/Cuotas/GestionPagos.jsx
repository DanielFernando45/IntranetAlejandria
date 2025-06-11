import React, { useState, useEffect } from 'react'
import ActualizarPago from '../../../../Components/Administrador/Pagos/ActualizarPago'
import EditarCuotaEdit from '../../../../Components/Administrador/Pagos/EditarCuotaEdit';
import tachoelimanar from '../../../../assets/icons/tacho.svg'

const GestionPagos = () => {
    const [actualizar, setActualizar] = useState(false);
    const [eliminar, setEliminar] = useState(false);
    const [pagos, setPagos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPago, setSelectedPago] = useState(null);

    useEffect(() => {
        const fetchPagos = async () => {
            try {
                const response = await fetch('http://localhost:3001/pagos/cuotas');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de pagos');
                }
                const data = await response.json();
                setPagos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPagos();
    }, []);

    const handleActualizarClick = (pago) => {
        setSelectedPago(pago);
        setActualizar(true);
    };

    if (loading) {
        return <div>Cargando datos de pagos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="flex justify-between text-[#495D72] font-medium p-[6px] pr-10 rounded-md">
                    <div className="w-[100px] flex justify-center">IdAsesoria</div>
                    <div className="w-[300px] flex justify-center">Delegado</div>
                    <div className="w-[210px] flex justify-center">Contrato</div>
                    <div className="w-[800px] flex justify-center">Pagos</div>
                    <div className="w-[250px] flex justify-center">Monto Total</div>
                    <div className="w-[200px] flex justify-center ml-5">Acción</div>
                </div>


                <div className="flex justify-between items-center text-[#2B2829] font-normal p-[6px] pr-10 rounded-md">
                    <div className="w-[100px] flex justify-center">0237</div>
                    <div className="w-[300px] flex justify-center">Antonio Jorge Cueva López</div>
                    <div className="w-[210px] flex justify-center">Plazo</div>
                    <div className="w-[800px] flex justify-between text-[#575051]">

                        <div className='flex w-[250px] h-[50px] bg-[#E9E7E7] text-[13px] rounded-3xl justify-between px-8 items-center'>
                            <h1 className='text-[18px] font-medium'>Pago 1</h1>
                            <div>
                               <p>Monto: 2500.00</p>
                               <p>Fecha: 13/09/24</p>    
                            </div>    
                        </div> 

                        <div className='flex w-[250px] h-[50px] bg-[#E9E7E7] text-[13px] rounded-3xl justify-between px-8 items-center'>
                            <h1 className='text-[18px] font-medium'>Pago 2</h1>
                            <div>
                               <p>Monto: 2500.00</p>
                               <div className='flex justify-center border border-[#FF1E00] rounded-2xl '>
                                <p className='text-[#FF1E00]'>Por pagar</p>  
                               </div>
                                 
                            </div>    
                        </div> 

                        <div className='flex w-[250px] h-[50px] bg-[#E9E7E7] text-[13px] rounded-3xl justify-between px-8 items-center'>
                            <h1 className='text-[18px] font-medium'>Pago 3</h1>
                            <div>
                               <p>Monto: 2500.00</p>
                               <p className='flex justify-center text-[#FF1E00] border border-[#FF1E00] rounded-2xl'>Por pagar</p>    
                            </div>    
                        </div> 
                        
                    </div>
                    <div className="w-[250px] flex justify-center">S/250</div>
                    <button className="w-[160px] font-medium rounded-md px-4 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]">
                        Actualizar Pagos
                    </button>
                    <button className='w-[30px]' onClick={() => setEliminar(true)} >
                        <img src={tachoelimanar} alt="" />
                    </button>
                </div>
                <div className="flex justify-between bg-[#E9E7E7] items-center text-[#2B2829] font-normal p-[6px] pr-10 rounded-md">
                    <div className="w-[100px] flex justify-center">0237</div>
                    <div className="w-[300px] flex justify-center">Antonio Jorge Cueva López</div>
                    <div className="w-[210px] flex justify-center">Plazo</div>
                    <div className="w-[400px] flex justify-center">15/05/24</div>
                    <div className="w-[250px] flex justify-center">S/250</div>
                    <button className="w-[160px] font-medium rounded-md px-4 py-1 bg-[#1C1C34] ml-5 flex justify-center text-white text-[14px]">
                        Actualizar Pagos
                    </button>
                    <button className='w-[30px]' onClick={() => setEliminar(true)} >
                        <img src={tachoelimanar} alt="" />
                    </button>
                </div>

            </div>

            {actualizar && selectedPago && (
                <ActualizarPago
                    onClose={() => {
                        setActualizar(false);
                        setSelectedPago(null);
                    }}
                    pagoData={selectedPago}
                />
            )}
            {eliminar && <EditarCuotaEdit Close={() => setEliminar(false)} />}
        </>
    )
}

export default GestionPagos;