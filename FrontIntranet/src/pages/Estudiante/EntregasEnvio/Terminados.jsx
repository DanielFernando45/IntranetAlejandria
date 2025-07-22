import React, { useEffect, useState } from "react";
import documentosVacios from '../../../assets/icons/documentosVacios.png'
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const Terminados = () => {
  const [terminados, setTerminado] = useState([]);
  const [loading, setLoading] = useState(true);
  const idAsesoramiento = useOutletContext();

  useEffect(() => {
    if (idAsesoramiento) {
      setLoading(true);
      axios
        .get(`http://localhost:3001/asuntos/terminados/${idAsesoramiento}`)
        .then((response) => {
          setTerminado(() => {
            console.log("Terminados:", response.data);
            return response.data.map((item) => ({
              titulo: item.titulo,
              fecha_entregado: item.fecha_entregado,
              fecha_proceso: item.fecha_proceso,
              fecha_terminado: item.fecha_terminado,
              estado: item.estado,
            }));
          });
        })
        .catch((error) => {
          console.error("Error al obtener los pendientes:", error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [idAsesoramiento]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Componente Skeleton para filas
  const SkeletonRow = () => (
    <div className="flex justify-between bg-[#E9E7E7] p-[6px] rounded-md animate-pulse">
      <div className="w-[300px] h-6 bg-gray-300 rounded"></div>
      <div className="w-[300px] h-6 bg-gray-300 rounded"></div>
      <div className="w-[300px] h-6 bg-gray-300 rounded"></div>
      <div className="w-[300px] h-6 bg-gray-300 rounded"></div>
      <div className="w-[102px] h-6 bg-gray-300 rounded"></div>
      <div className="w-[102px] h-6 bg-gray-300 rounded"></div>
    </div>
  );

  return (
    <div className="flex flex-col gap-2">
      {loading ? (
        // Mostrar skeletons mientras carga
        <>
          <SkeletonRow />
          <SkeletonRow />
          <SkeletonRow />
        </>
      ) : terminados.length > 0 ? (
        // Mostrar datos cuando ya están cargados
        terminados.map((terminado, index) => (
          <div
            key={index}
            className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7] p-[6px] rounded-md"
          >
            <div className="w-[300px] flex">{terminado.titulo}</div>
            <div className="w-[300px] flex justify-center">
              Entregado: {formatDate(terminado.fecha_entregado)}
            </div>
            <div className="w-[300px] flex justify-center">
              Proceso: {formatDate(terminado.fecha_proceso)}
            </div>
            <div className="w-[300px] flex justify-center">
              Terminado: {formatDate(terminado.fecha_terminado)}
            </div>
            <div className="w-[102px] flex justify-center">
              {formatTime(terminado.fecha_terminado)}
            </div>
            <div className="rounded-md px-3 bg-[#353563] flex justify-center text-white">
              {terminado.estado}
            </div>
          </div>
        ))
      ) : (
        // Mostrar cuando no hay datos
        <div className="flex justify-center">
          <div className="flex flex-col border rounded-[12px] text-[12px] justify-center items-center w-[280px] sm:w-[370px] mn:w-[335px] lg:w-full h-[120px] sm:h-[190px] gap-5 text-[#82777A] shadow-[0px_4px_4px_4px_rgba(0,0,0,0.25)]">
            <img src={documentosVacios} alt="" />
            No hay envíos realizados
          </div>
        </div>
      )}
    </div>
  );
};

export default Terminados;