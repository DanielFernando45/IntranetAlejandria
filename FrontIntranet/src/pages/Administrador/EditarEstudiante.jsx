import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import LayoutApp from '../../layout/LayoutApp'

const EditarEstudiante = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [estudiante, setEstudiante] = useState(null);

    const handlerAtras = () => {
        navigate('/admin/gestionar-usuarios')
    }

    useEffect(() => {
        // En una aplicación real, aquí harías una llamada a la API
        const estudiantesEjemplo = [
            {
                id: 1,
                nombre: "Antonio Jorge",
                apellido: "Cueva Lopez",
                telefono: "923382932",
                dni: "79829382",
                contrato: "Plazo/Al contado/Individual",
                tipoTrabajo: "Informe",
                universidad: "UPC",
                nivelEducativo: "Bachiller",
                correo: "alonsoCastro14@gmail.com",
                pais: "Peru",
                carrera: "Administrador Negocios"
            },
            {
                id: 2,
                nombre: "Juan Mateo ",
                apellido: "Pérez Vinlof",
                telefono: "923382932",
                dni: "79829382",
                contrato: "Plazo/Al contado/Individual",
                tipoTrabajo: "Informe",
                universidad: "UPC",
                nivelEducativo: "Bachiller",
                correo: "alonsoCastro14@gmail.com",
                pais: "Peru",
                carrera: "Administrador Negocios"
            },
            // ... otros estudiantes
        ];

        const estudianteEncontrado = estudiantesEjemplo.find(e => e.id === Number(id));
        setEstudiante(estudianteEncontrado || null);
    }, [id]);

    if (!estudiante) {
        return <div>Cargando...</div>;
    }


    return (
        <LayoutApp>
            <main className="m-20">

                <div className='ml-8 fondo_login rounded-t-[20px] w-full h-14 '>

                </div>
                <div className="flex flex-col  gap-[40px] ml-8  pb-12 pt-[38px] w-full h-full px-5 bg-white rounded-b-[20px] ">

                    <div className='flex flex-col gap-4'>

                        <div className='flex gap-10'>

                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Nombres</p>
                                <input placeholder={estudiante.nombre} className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />

                            </div>

                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Apellidos</p>
                                <input placeholder={estudiante.apellido} className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />

                            </div>

                        </div>

                        <div className='flex  gap-10 '>

                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Telefono</p>
                                <input placeholder={estudiante.telefono} className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />

                            </div>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>DNI</p>
                                <input placeholder={estudiante.dni} className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />
                            </div>

                        </div>

                        <div className='flex  gap-10 '>

                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Contrato</p>
                                <select className='flex bg-[#F9F9F9] w-full h-[55px] rounded-lg text-[#808080] items-center p-4'  >
                                    <option value="Plazo/Al contado/Individual" selected={estudiante.Contrato === "Plazo/Al contado/Individual"}>
                                        Plazo/Al contado/Individual
                                    </option>
                                    <option value="Plazo/Al contado/Grupal" selected={estudiante.Contrato === "Plazo/Al contado/Grupal"}>
                                        Plazo/Al contado/Grupal
                                    </option>
                                    <option value="Plazo/Cuotas/Individual" selected={estudiante.Contrato === "Plazo/Cuotas/Individual"}>
                                        Plazo/Cuotas/Individual
                                    </option>
                                    <option value="Plazo/Cuotas/Grupal" selected={estudiante.Contrato === "Plazo/Cuotas/Grupal"}>
                                        Plazo/Cuotas/Grupal
                                    </option>
                                    <option value="Avance/Al contado/Individual" selected={estudiante.Contrato === "Avance/Al contado/Individual"}>
                                        Avance/Al contado/Individual
                                    </option>
                                    <option value="Avance/Al contado/Grupal" selected={estudiante.Contrato === "Avance/Al contado/Grupal"}>
                                        Avance/Al contado/Grupal
                                    </option>
                                    <option value="Avance/Cuotas/Individual" selected={estudiante.Contrato === "Avance/Cuotas/Individual"}>
                                        Avance/Cuotas/Individual
                                    </option>
                                    <option value="Avance/Cuotas/Grupal" selected={estudiante.Contrato === "Avance/Cuotas/Grupal"}>
                                        Avance/Cuotas/Grupal
                                    </option>
                                </select>
                            </div>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Tipo de Trabajo </p>
                                <select className='flex bg-[#F9F9F9] w-full h-[55px] rounded-lg text-[#808080] items-center p-4'  >
                                    <option value="Proyecto bachillerato" selected={estudiante.tipoTrabajo === "Proyecto bachillerato"}>
                                        Proyecto bachillerato
                                    </option>
                                    <option value="Tesis" selected={estudiante.tipoTrabajo === "Tesis"}>
                                        Tesis
                                    </option>
                                    <option value="Tesis Maestría" selected={estudiante.tipoTrabajo === "Tesis Maestría"}>
                                        Tesis Maestría
                                    </option>
                                    <option value="Tesis Doctorado" selected={estudiante.tipoTrabajo === "Tesis Doctorado"}>
                                        Tesis Doctorado
                                    </option>
                                    <option value="Proyecto" selected={estudiante.tipoTrabajo === "Proyecto"}>
                                        Proyecto
                                    </option>
                                    <option value="Informe" selected={estudiante.tipoTrabajo === "Informe"}>
                                        Informe
                                    </option>
                                    <option value="Plan de Negocio" selected={estudiante.tipoTrabajo === "Plan de Negocio"}>
                                        Plan de Negocio
                                    </option>
                                    <option value="Revisión Sistemática" selected={estudiante.tipoTrabajo === "Revisión Sistemática"}>
                                        Revisión Sistemática
                                    </option>
                                    <option value="Estudio de Perfectibilidad" selected={estudiante.tipoTrabajo === "Estudio de Perfectibilidad"}>
                                        Estudio de Perfectibilidad
                                    </option>
                                    <option value="Insufiencia Profesional" selected={estudiante.tipoTrabajo === "Insufiencia Profesional"}>
                                        Insufiencia Profesional
                                    </option>
                                </select>
                            </div>

                        </div>

                        <div className='flex  gap-10 '>

                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Universidad</p>
                                <input placeholder={estudiante.universidad} className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />

                            </div>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Actual nivel educativo</p>
                                <select className='flex bg-[#F9F9F9] w-full h-[55px] rounded-lg text-[#808080] items-center p-4'  >
                                    <option value="">Bachiller</option>
                                    <option value="">Titulado</option>
                                    <option value="">Maestria</option>
                                    <option value="">Doctorado</option>
                                </select>
                            </div>

                        </div>



                        <div className='flex  gap-10 '>

                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Correo electrónico</p>
                                <input placeholder={estudiante.correo} className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />

                            </div>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Pais</p>
                                <input placeholder={estudiante.pais} className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />
                            </div>

                        </div>

                        <div className='flex gap-10 items-end'>

                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Carrera</p>
                                <input placeholder={estudiante.carrera} className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4' />
                            </div>

                            <div className='flex w-full h-full gap-[50px] justify-center'>
                                <button onClick={handlerAtras} className=' h-[46px] w-[180px] flex justify-center items-center p-4 rounded-lg border border-black'>
                                    Cancelar
                                </button>
                                <button className=' h-[46px] w-[180px] flex justify-center items-center fondo_login text-white p-4 rounded-lg'>
                                    Modificar
                                </button>
                            </div>

                        </div>

                    </div>

                </div>

            </main>

        </LayoutApp>
    )

}

export default EditarEstudiante