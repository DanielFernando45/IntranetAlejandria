import React, { useEffect, useState } from 'react';
import LayoutApp from '../../layout/LayoutApp';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const EditarAsesor = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    areaAsesor: null,
    especialidad: "",
    universidad: "",
    gradoAcademico: null,
    email: "",
    telefono: null,
    dni: "",
    url_imagen: ""
  });

  // Obtener los datos actuales del asesor
  useEffect(() => {
    const fetchAsesor = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/asesor/${id}`);
        setFormData(response.data);
      } catch (error) {
        console.error("Error al obtener datos del asesor:", error);
      }
    };

    fetchAsesor();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = ["telefono", "areaAsesor", "gradoAcademico"].includes(name)
      ? parseInt(value) || ""
      : value;
    setFormData(prev => ({ ...prev, [name]: parsedValue }));
  };

  const handleGuardar = async () => {
    try {
      await axios.patch(`http://localhost:3001/asesor/update/${id}`, formData);
      alert("Asesor actualizado correctamente");
      navigate('/admin/gestionar-usuarios/listar-asesores');
    } catch (error) {
      console.error("Error al guardar cambios:", error);
      alert("Error al actualizar asesor.");
    }
  };

  const handlerAtras = () => {
    navigate('/admin/gestionar-usuarios/listar-asesores');
  };

  return (
    <LayoutApp>
      <main className="m-20">
        <div className='ml-8 fondo_login rounded-t-[20px] w-full h-14'></div>
        <div className="flex flex-col gap-[40px] ml-8 pb-12 pt-[38px] w-full h-full px-5 bg-white rounded-b-[20px]">
          <div className='flex flex-col gap-4'>

            <div className='flex gap-10'>
              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>Nombres</p>
                <input
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder='Nombre'
                  className='bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] p-4'
                />
              </div>

              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>Apellidos</p>
                <input
                  name="apellido"
                  value={formData.apellido}
                  onChange={handleChange}
                  placeholder='Apellido'
                  className='bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] p-4'
                />
              </div>
            </div>

            <div className='flex gap-10'>
              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>Área</p>
                <select
                  name="areaAsesor"
                  value={formData.areaAsesor || ""}
                  onChange={handleChange}
                  className='bg-[#F9F9F9] w-full h-[55px] rounded-lg text-[#808080] p-4'
                >
                  <option value="">Seleccione Área</option>
                  <option value={1}>Negocio</option>
                  <option value={2}>Social</option>
                  <option value={3}>Salud</option>
                  <option value={4}>Ingeniería</option>
                  <option value={5}>Legal</option>
                </select>
              </div>

              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>Especialidad</p>
                <input
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleChange}
                  placeholder='Especialidad'
                  className='bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] p-4'
                />
              </div>
            </div>

            <div className='flex gap-10'>
              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>Universidad</p>
                <input
                  name="universidad"
                  value={formData.universidad}
                  onChange={handleChange}
                  placeholder='Universidad'
                  className='bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] p-4'
                />
              </div>

              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>Nivel educativo</p>
                <select
                  name="gradoAcademico"
                  value={formData.gradoAcademico || ""}
                  onChange={handleChange}
                  className='bg-[#F9F9F9] w-full h-[55px] rounded-lg text-[#808080] p-4'
                >
                  <option value="">Seleccione nivel</option>
                  <option value={1} >Estudiante Pregrado</option>
                  <option value={2} >Bachiller</option>
                  <option value={3} >Titulado</option>
                  <option value={4} >Maestría</option>
                  <option value={5} >Doctorado</option>
                </select>
              </div>
            </div>

            <div className='flex gap-10'>
              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>Correo electrónico</p>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder='Correo'
                  className='bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] p-4'
                />
              </div>

              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>Teléfono</p>
                <input
                  name="telefono"
                  type="number"
                  value={formData.telefono || ""}
                  onChange={handleChange}
                  placeholder='Teléfono'
                  className='bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] p-4'
                />
              </div>
            </div>

            <div className='flex gap-10 items-end'>
              <div className='flex flex-col gap-3 w-full'>
                <p className='pl-[1px]'>DNI</p>
                <input
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  placeholder='DNI'
                  className='bg-[#F9F9F9] w-full h-[49px] rounded-lg text-[#808080] p-4'
                />
              </div>

              <div className='flex w-full h-full gap-[50px] justify-center'>
                <button onClick={handlerAtras} className='h-[46px] w-[180px] flex justify-center items-center p-4 rounded-lg border border-black'>
                  Cancelar
                </button>
                <button onClick={handleGuardar} className='h-[46px] w-[180px] flex justify-center items-center fondo_login text-white p-4 rounded-lg'>
                  Guardar cambios
                </button>
              </div>
            </div>

          </div>
        </div>
      </main>
    </LayoutApp>
  );
};

export default EditarAsesor;
