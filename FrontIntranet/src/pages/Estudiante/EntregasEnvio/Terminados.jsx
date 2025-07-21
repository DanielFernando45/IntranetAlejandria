import React, { useEffect, useState } from "react";
import arrowIcon from "../../../assets/icons/IconEstudiante/arriba.svg";
import axios from "axios";
import { useOutletContext } from "react-router-dom";

const Terminados = () => {
  const [terminados, setTerminado] = useState([]);
  const idAsesoramiento = useOutletContext();

  useEffect(() => {
    if (idAsesoramiento) {
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
        });
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

  return (
    <div className="flex flex-col gap-2 ">
      {terminados.map((terminado, index) => (
        <div
          key={index}
          className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md"
        >
          <div className="w-[300px] flex ">{terminado.titulo}</div>
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
          <div className="rounded-md px-3 bg-[#353563]  flex justify-center text-white">
            {" "}
            {terminado.estado}{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Terminados;
