import React, { useEffect, useState } from 'react';
import Buscar from "../../../Components/Administrador/GestionarUsuario/Buscar";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ListarEstudiante = () => {
  const navigate = useNavigate();
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudiantesBase, setEstudiantesBase] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/cliente")
      .then((res) => {
        setEstudiantes(res.data);
        setEstudiantesBase(res.data);
      })
      .catch((err) => console.error("Error al obtener estudiantes:", err));
  }, []);

  const handlerAgregarEstudiante = () => {
    navigate('/admin/gestionar-usuarios/agregar-estudiante');
  };

  const handlerEditarEstudiante = (id) => {
    navigate(`/admin/gestionar-usuarios/editar-estudiante/${id}`);
  };

  const formatearFecha = (fecha) => {
    if (!fecha || fecha === "Por asignar") return "Por Asignar";
    const date = new Date(fecha);
    return date.toLocaleDateString("es-PE");
  };

  const handleBuscar = (query) => {
    const filtro = query.toLowerCase();
    const resultado = estudiantesBase.filter(est => {
      return (
        est.id.toString().includes(filtro) ||
        est.dni?.toString().includes(filtro) ||
        `${est.nombre} ${est.apellido}`.toLowerCase().includes(filtro)
      );
    });
    setEstudiantes(resultado);
  };

  const handleReset = () => {
    setEstudiantes(estudiantesBase);
  };

  return (
    <>
      <div className="flex flex-col gap-[12px]">
        <div className="flex justify-start">
          <h2 className="text-2xl font-bold">CRUD</h2>
        </div>
        <Buscar onBuscar={handleBuscar} onReset={handleReset} />
      </div>

      <div className="flex flex-col">
        <div className="flex justify-between text-[#495D72] font-medium p-[6px] rounded-md">
          <div className="w-[40px] flex justify-center">ID</div>
          <div className="w-[300px] flex justify-center">Alumno</div>
          <div className="w-[100px] flex justify-center">F.Inicio</div>
          <div className="w-[110px] flex justify-center">F.Vencimiento</div>
          <div className="w-[360px] flex justify-center">Carrera</div>
          <div className="w-[250px] flex justify-center">Contrato</div>
          <div className="w-[110px] flex justify-center">Editar</div>
          <div className="w-[110px] flex justify-center">Eliminar</div>
        </div>

        {estudiantes.map((estudiante, index) => (
          <div
            key={estudiante.id}
            className={`flex justify-between items-center text-[#2B2829] font-normal p-[6px] rounded-md ${index % 2 === 0 ? 'bg-white' : 'bg-[#E9E7E7]'}`}
          >
            <div className="w-[40px] flex justify-center">{estudiante.id}</div>
            <div className="w-[300px] flex justify-start">{estudiante.nombre} {estudiante.apellido}</div>
            <div className="w-[100px] flex justify-center">{formatearFecha(estudiante.datos_asesoramiento.fecha_inicio)}</div>
            <div className="w-[110px] flex justify-center">{formatearFecha(estudiante.datos_asesoramiento.fecha_fin)}</div>
            <div className="w-[360px] flex justify-start">{estudiante.carrera}</div>
            <div className="w-[250px] flex justify-start">{estudiante.datos_asesoramiento.contrato.nombre}{estudiante.datos_asesoramiento.contrato.message}</div>
            <button
              onClick={() => handlerEditarEstudiante(estudiante.id)}
              className="w-[110px] rounded-md px-3 py-1 bg-[#1C1C34] flex justify-center text-white"
            >Editar</button>
            <button className="w-[110px] rounded-md px-3 py-1 bg-[#8F1313] flex justify-center text-white">Eliminar</button>
          </div>
        ))}
      </div>

      <button
        onClick={handlerAgregarEstudiante}
        className="flex justify-between text-white w-[230px] h-8 rounded font-semibold bg-[#1B435D] px-6 py-1 mt-5"
      >
        <p>Agregar Estudiante</p>
      </button>
    </>
  );
};

export default ListarEstudiante;