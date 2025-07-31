import React, { useEffect, useState } from 'react';
import LayoutApp from '../../../layout/LayoutApp';
import perfil from "../../../assets/icons/PerfilIcon.svg";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const MiPerfil = () => {
    const navigate = useNavigate();
    const [perfilData, setPerfilData] = useState(null);

    useEffect(() => {
        // Obtener ID desde localStorage
        const userString = localStorage.getItem('user');
        if (userString) {
            const user = JSON.parse(userString);
            const id = user.id;

            // Llamada a la API
            axios.get(`${import.meta.env.VITE_API_PORT_ENV}/cliente/${id}`)
                .then(response => {
                    setPerfilData(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener datos del perfil:', error);
                });
        }
    }, []);

    const handlerEdit = () => {
        navigate('/estudiante/miperfiledit');
    };

    if (!perfilData) {
        return <LayoutApp><main className="m-20">Cargando perfil...</main></LayoutApp>;
    }

    return (
        <LayoutApp>
            <main className="m-20">
                <div className='ml-8 fondo_login rounded-t-[20px] w-full h-14 '></div>
                <div className="flex flex-col gap-[40px] ml-8 pb-12 pt-[38px] w-full h-full px-5 bg-white rounded-b-[20px]">
                    
                    <div className='flex justify-between gap-[22px] items-center'>
                        <div className='flex gap-[22px] items-center'>
                            <img src={perfil} alt="" className='w-[94px] h-[94px]' />
                            <div> 
                                <h3 className='text-[20px] font-medium'>{perfilData.nombre} {perfilData.apellido}</h3> 
                                <p className='text-[#808080]'>{perfilData.email}</p>
                            </div>  
                        </div>

                        <button onClick={handlerEdit} className='flex justify-center items-center text-white bg-black rounded-lg w-[87px] h-[41px]'>
                            Edit
                        </button>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div className='flex gap-10'>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Nombres</p>
                                <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'>
                                    {perfilData.nombre}
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Apellidos</p>
                                <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'>
                                    {perfilData.apellido}
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-10'>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Carrera</p>
                                <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'>
                                    {perfilData.carrera}
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Tipo de trabajo</p>
                                <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'>
                                    {/* Suponiendo que tipo de trabajo no viene, puedes modificar aquí si lo agregas */}
                                    Suficiencia profesional
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-10'>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Universidad</p>
                                <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'>
                                    {perfilData.universidad}
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Actual nivel educativo</p>
                                <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'>
                                    {perfilData.gradoAcademico?.nombre}
                                </div>
                            </div>
                        </div>

                        <div className='flex gap-10'>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Correo electrónico</p>
                                <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'>
                                    {perfilData.email}
                                </div>
                            </div>
                            <div className='flex flex-col gap-3 w-full'>
                                <p className='pl-[1px]'>Pais</p>
                                <div className='flex bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] items-center p-4'>
                                    {perfilData.pais}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </LayoutApp>
    );
}

export default MiPerfil;
