import React, { useState, useEffect } from 'react'
import check from "../../../assets/icons/check.svg"

const ActualizarPago = ({ onClose, pagoData }) => {
    const [numeroCuotas, setNumeroCuotas] = useState(1);
    const [cuotasData, setCuotasData] = useState({
        monto1: '',
        fecha_pago1: '',
        monto2: '',
        fecha_pago2: '',
        monto3: '',
        fecha_pago3: ''
    });
    const [showCuota2, setShowCuota2] = useState(false);
    const [showCuota3, setShowCuota3] = useState(false);
    const [totalPagar, setTotalPagar] = useState('');

    useEffect(() => {
        if (pagoData) {
            // Establecer valores iniciales basados en pagoData
            setNumeroCuotas(pagoData.numero_cuotas || 1);
            setTotalPagar(pagoData.total_pagar || '');

            // Inicializar datos de cuotas si existen
            if (pagoData.monto1) setCuotasData(prev => ({...prev, monto1: pagoData.monto1}));
            if (pagoData.fecha_pago1) setCuotasData(prev => ({...prev, fecha_pago1: pagoData.fecha_pago1.split('T')[0]}));
            if (pagoData.monto2) {
                setCuotasData(prev => ({...prev, monto2: pagoData.monto2}));
                setShowCuota2(true);
            }
            if (pagoData.fecha_pago2) setCuotasData(prev => ({...prev, fecha_pago2: pagoData.fecha_pago2.split('T')[0]}));
            if (pagoData.monto3) {
                setCuotasData(prev => ({...prev, monto3: pagoData.monto3}));
                setShowCuota3(true);
            }
            if (pagoData.fecha_pago3) setCuotasData(prev => ({...prev, fecha_pago3: pagoData.fecha_pago3.split('T')[0]}));
        }
    }, [pagoData]);

    const handleNumeroCuotasChange = (e) => {
        const value = Number(e.target.value);
        setNumeroCuotas(value);
        setShowCuota2(value >= 2);
        setShowCuota3(value >= 3);
    };

    const handleInputChange = (e, field) => {
        setCuotasData({
            ...cuotasData,
            [field]: e.target.value
        });
    };

    const handleToggleCuota2 = () => {
        setShowCuota2(!showCuota2);
        if (!showCuota2) {
            setNumeroCuotas(2);
        } else if (numeroCuotas === 2) {
            setNumeroCuotas(1);
        }
    };

    const handleToggleCuota3 = () => {
        setShowCuota3(!showCuota3);
        if (!showCuota3) {
            setNumeroCuotas(3);
        } else if (numeroCuotas === 3) {
            setNumeroCuotas(2);
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                nombre1: "Primer pago",
                monto1: cuotasData.monto1,
                fecha_pago1: cuotasData.fecha_pago1 ? `${cuotasData.fecha_pago1}T00:00:00` : null,
                nombre2: showCuota2 ? "Segundo pago" : null,
                monto2: showCuota2 ? cuotasData.monto2 : null,
                fecha_pago2: showCuota2 && cuotasData.fecha_pago2 ? `${cuotasData.fecha_pago2}T00:00:00` : null,
                nombre3: showCuota3 ? "Tercer pago" : null,
                monto3: showCuota3 ? cuotasData.monto3 : null,
                fecha_pago3: showCuota3 && cuotasData.fecha_pago3 ? `${cuotasData.fecha_pago3}T00:00:00` : null
            };

            // Filtrar campos nulos
            const filteredPayload = Object.fromEntries(
                Object.entries(payload).filter(([_, v]) => v !== null)
            );

            const response = await fetch(`http://localhost:3001/pagos/updateCuotas/${pagoData.id_infoPago}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filteredPayload)
            });

            if (!response.ok) {
                throw new Error('Error al actualizar los pagos');
            }

            onClose();
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className='flex flex-col absolute gap-[15px] top-20 left-[500px] px-10 py-5 w-[875px] rounded-lg bg-white border border-[#D2CECF]'>
            <h1 className='text-[25px] font-semibold'>Actualizar pagos</h1>

            <div className='flex justify-between'>
                <div className='flex flex-col w-[369px] h-[82px] gap-[15px]'>
                    <h2 className='font-medium'>Alumno:</h2>
                    <input 
                        value={pagoData?.delegado || ''}
                        readOnly
                        className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' 
                    />
                </div>
                <div className='flex flex-col w-[169px] h-[82px] gap-[15px]'>
                    <h2 className='font-medium'>Numero de cuotas:</h2>
                    <select 
                        onChange={handleNumeroCuotasChange} 
                        value={numeroCuotas} 
                        className='flex items-center rounded-2xl w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <div className='flex flex-col w-[222px] h-[82px] gap-[15px]'>
                    <h2 className='font-medium'>Total a pagar:</h2>
                    <input 
                        value={totalPagar}
                        onChange={(e) => setTotalPagar(e.target.value)}
                        placeholder='Ingrese un monto' 
                        className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' 
                    />
                </div>
            </div>

            <h1 className='text-[25px] font-semibold'>Cuotas</h1>

            {/* Cuota 1 - Siempre visible */}
            <div className='flex flex-col justify-start gap-5 mt-5'>
                <div className='font-medium text-[20px]'>Cuota 1</div>
                <div className='flex justify-between'>
                    <div className='flex flex-col w-[390px] h-[82px] gap-[15px]'>
                        <h2 className='font-medium'>Monto:</h2>
                        <input 
                            value={cuotasData.monto1}
                            onChange={(e) => handleInputChange(e, 'monto1')}
                            placeholder='Ingrese un monto' 
                            className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' 
                        />
                    </div>
                    <div className='flex flex-col w-[390px] h-[82px] gap-[15px]'>
                        <h2 className='font-medium'>Fecha Pago:</h2>
                        <input 
                            type='date' 
                            value={cuotasData.fecha_pago1}
                            onChange={(e) => handleInputChange(e, 'fecha_pago1')}
                            className='flex justify-end rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' 
                        />
                    </div>
                </div>
            </div>

            {/* Cuota 2 - Condicional */}
            {numeroCuotas >= 2 && (
                <div className='flex flex-col justify-start gap-5 mt-5'>
                    <div className='font-medium text-[20px]'>Cuota 2</div>
                    <div className='flex justify-between'>
                        <div className='flex flex-col w-[390px] h-[82px] gap-[15px]'>
                            <h2 className='font-medium'>Monto:</h2>
                            <input 
                                value={cuotasData.monto2}
                                onChange={(e) => handleInputChange(e, 'monto2')}
                                placeholder='Ingrese un monto' 
                                className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' 
                            />
                        </div>
                        <div className='flex flex-col w-[390px] h-[82px] gap-[15px]'>
                            <h2 className='font-medium'>Fecha Pago:</h2>
                            <input 
                                type='date' 
                                value={cuotasData.fecha_pago2}
                                onChange={(e) => handleInputChange(e, 'fecha_pago2')}
                                className='flex justify-end rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' 
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Cuota 3 - Condicional */}
            {numeroCuotas >= 3 && (
                <div className='flex flex-col justify-start gap-5 mt-5'>
                    <div className='font-medium text-[20px]'>Cuota 3</div>
                    <div className='flex justify-between'>
                        <div className='flex flex-col w-[390px] h-[82px] gap-[15px]'>
                            <h2 className='font-medium'>Monto:</h2>
                            <input 
                                value={cuotasData.monto3}
                                onChange={(e) => handleInputChange(e, 'monto3')}
                                placeholder='Ingrese un monto' 
                                className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' 
                            />
                        </div>
                        <div className='flex flex-col w-[390px] h-[82px] gap-[15px]'>
                            <h2 className='font-medium'>Fecha Pago:</h2>
                            <input 
                                type='date' 
                                value={cuotasData.fecha_pago3}
                                onChange={(e) => handleInputChange(e, 'fecha_pago3')}
                                className='flex justify-end rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium' 
                            />
                        </div>
                    </div>
                </div>
            )}

            <div className='flex w-full py-4 px-1 h-[68px] justify-end gap-4'>
                <button 
                    onClick={handleSubmit}
                    className='h-7 w-[100px] border border-black rounded-[4px] text-[11px] font-bold text-[#02242B]'
                >
                    Actualizar
                </button>
                <button 
                    onClick={onClose} 
                    className='h-7 w-[100px] border bg-black rounded-[4px] text-[11px] font-bold text-white'
                >
                    Cancelar
                </button>
            </div>
        </div>
    )
}

export default ActualizarPago;