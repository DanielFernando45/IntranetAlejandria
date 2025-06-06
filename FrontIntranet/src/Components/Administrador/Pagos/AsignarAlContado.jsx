import React, { useState, useEffect } from 'react'

const AsignarAlContado = ({ close, asesoramiento }) => {
    const [formData, setFormData] = useState({
        titulo: '',
        pago_total: '',
        fecha_pago: '',
        id_asesoramiento: asesoramiento.id_asesoramiento
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Función para obtener la fecha y hora actual en formato para la API
    const getCurrentDateTime = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    };

    useEffect(() => {
        setFormData(prev => ({
            ...prev,
            fecha_pago: getCurrentDateTime()
        }));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage('');
        
        try {
            // Validación de campos antes del envío
            if (!formData.titulo.trim() || !formData.pago_total) {
                throw new Error('Todos los campos son obligatorios');
            }

            if (isNaN(formData.pago_total) || parseFloat(formData.pago_total) <= 0) {
                throw new Error('El monto debe ser un número positivo');
            }

            const payload = {
                titulo: formData.titulo.trim(),
                pago_total: parseFloat(formData.pago_total),
                fecha_pago: formData.fecha_pago,
                id_asesoramiento: asesoramiento.id_asesoramiento
            };

            console.log('Enviando datos:', payload); // Para depuración

            const response = await fetch('http://localhost:3001/pagos/alContado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json(); // Leer la respuesta JSON siempre

            if (!response.ok) {
                // Si la API devuelve un mensaje de error, usarlo
                throw new Error(data.message || 'Error al registrar el pago');
            }

            close(); // Cerrar el modal después de éxito
            
        } catch (error) {
            console.error('Error completo:', error);
            setErrorMessage(error.message || 'Ocurrió un error al registrar el pago');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDisplayDate = (dateTimeString) => {
        if (!dateTimeString) return 'Cargando fecha...';
        const [date, time] = dateTimeString.split(' ');
        const [hours, minutes] = time.split(':');
        return `${date} ${hours}:${minutes}`;
    };

    return (
        <div className='flex flex-col absolute gap-[15px] top-60 left-96 px-10 py-12 w-[875px] h-[450px] rounded-lg bg-white border border-[#D2CECF]'>
            <h1 className='text-lg font-bold'>Asignar al Contado</h1>

            {errorMessage && (
                <div className="text-red-500 mb-4 p-2 bg-red-50 rounded">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className='flex justify-between'>
                    <div className='flex flex-col w-[369px] h-[82px] gap-[15px]'>
                        <h2 className='font-medium'>Alumno:</h2>
                        <input
                            value={asesoramiento.delegado}
                            readOnly
                            className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'
                        />
                    </div>
                </div>

                <div className='flex justify-between'>
                    <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                        <h2 className='font-medium'>Titulo:</h2>
                        <input
                            name="titulo"
                            value={formData.titulo}
                            onChange={handleChange}
                            placeholder='Digite un titulo'
                            className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'
                            required
                        />
                    </div>
                </div>

                <div className='flex justify-between gap-[15px]'>
                    <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                        <h2 className='font-medium'>Monto Total:</h2>
                        <input
                            name="pago_total"
                            type="number"
                            value={formData.pago_total}
                            onChange={handleChange}
                            placeholder='Ingrese el monto'
                            className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'
                            required
                            step="0.01"
                        />
                    </div>

                    <div className='flex flex-col w-full h-[82px] gap-[15px]'>
                        <h2 className='font-medium'>Fecha Pago:</h2>
                        <div className='flex items-center rounded-2xl text-[#1C1C34] w-full h-[43px] bg-[#E9E7E7] px-4 font-medium'>
                            {formatDisplayDate(formData.fecha_pago)}
                        </div>
                    </div>
                </div>

                <div className='flex w-full py-4 px-1 h-[68px] justify-end gap-4'>
                    <button
                        type="submit"
                        className={`h-7 w-[100px] border border-black rounded-[4px] text-[11px] font-bold text-[#02242B] ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Enviando...' : 'Agregar'}
                    </button>
                    <button
                        type="button"
                        onClick={close}
                        className='h-7 w-[100px] border bg-black rounded-[4px] text-[11px] font-bold text-white'
                        disabled={isSubmitting}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AsignarAlContado