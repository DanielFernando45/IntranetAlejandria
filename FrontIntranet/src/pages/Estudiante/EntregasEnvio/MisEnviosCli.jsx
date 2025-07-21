import React from "react";
import { useState, useEffect } from "react";
import arrowIcon from "../../../assets/icons/IconEstudiante/arriba.svg";
import descargar from "../../../assets/icons/Descargas.svg";
import axios from "axios";

const MisEnviosCli = ({ idAsesoramiento }) => {
  const [misEnvios, setMisEnvios] = useState([]);
  const [loadMisEnvios, setLoadMisEnvios] = useState(false);
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    if (idAsesoramiento) {
      setLoadMisEnvios(true);
      axios
        .get(
          `http://localhost:3001/documentos/estudiante/list/${idAsesoramiento}`
        )
        .then((response) => {
          setMisEnvios(response.data);
          // Inicializar el estado de apertura para cada item
          const initialOpenState = {};
          response.data.forEach((envio, index) => {
            initialOpenState[index] = false;
          });
          setOpenItems(initialOpenState);
          setLoadMisEnvios(false);
        })
        .catch((error) => {
          setLoadMisEnvios(false);
          console.error("Error al obtener los pendientes:", error);
        });
    }
  }, [idAsesoramiento]);

  const toggleOpen = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  // Función para extraer todos los documentos de un envio
  const getDocuments = (envio) => {
    const documents = [];
    let i = 1;

    while (envio[`nombreDoc${i}`] && envio[`ruta${i}`]) {
      // Extraer el pathFile de la URL (última parte después de /)
      const urlParts = envio[`ruta${i}`].split("/");
      const pathFile = urlParts[urlParts.length - 1];

      documents.push({
        name: envio[`nombreDoc${i}`],
        url: envio[`ruta${i}`],
        pathFile: pathFile,
      });
      i++;
    }

    return documents;
  };

  const cortarTexto = (texto) => {
    const index = texto.indexOf("-");
    if (index !== -1) {
      return texto.substring(index + 1);
    }
    return texto; // Si no se encuentra el guion, devuelve el texto original
  };
  // Función para descargar archivos directamente desde la URL proporcionada
  const handleDownload = async (url, filename) => {
    try {
      // Crear un enlace temporal para descargar el archivo
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      // Limpiar
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al descargar el archivo:", error);
      alert("Error al descargar el archivo");
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-[#495D72] font-medium p-[6px] rounded-md">
        <div className="w-[300px] flex">Titulo</div>
        <div className="w-[102px] flex justify-center">Estado</div>
        <div className="w-[100px] flex justify-center">Fecha</div>
        <div className="w-[250px] flex justify-center">Archivo</div>
        <div className="w-[65px] rounded-md px-3 flex justify-center">
          Descargas
        </div>
      </div>

      {loadMisEnvios ? (
        <div role="status" className="flex flex-col items-center">
          <svg
            aria-hidden="true"
            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="block">Cargando...</span>
        </div>
      ) : (
        <div>
          {misEnvios.map((envio, index) => {
            const documents = getDocuments(envio);
            const hasDocuments = documents.length > 0;

            return (
              <React.Fragment key={envio.id_asunto || index}>
                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7] p-[6px] rounded-md items-center mt-2">
                  <div className="w-[300px] flex">{envio.asunto}</div>
                  <div className="text-white bg-[#353563] rounded px-3">
                    {envio.estado}
                  </div>
                  <div className="w-[150px] flex justify-center">
                    {formatDate(envio.fecha)}
                  </div>
                  <div className="w-[250px] flex justify-center">
                    {hasDocuments
                      ? cortarTexto(documents[0].name)
                      : "No hay archivos"}
                  </div>
                  <div className="w-[65px] flex justify-center">
                    {hasDocuments && (
                      <button
                        onClick={() => toggleOpen(index)}
                        className="transition-transform duration-300"
                      >
                        <img
                          src={arrowIcon}
                          alt="toggle"
                          className={`transform transition-transform duration-300 ${
                            openItems[index] ? "rotate-180" : "rotate-0"
                          }`}
                        />
                      </button>
                    )}
                  </div>
                </div>

                {openItems[index] && hasDocuments && (
                  <div className="bg-white shadow-md rounded-md p-4 my-2">
                    {documents.slice(0).map((doc, docIndex) => (
                      <div
                        key={docIndex}
                        className="flex justify-between items-center py-2 border-b last:border-b-0"
                      >
                        <div className="w-[300px] flex">{envio.asunto}</div>
                        <div className="w-[102px]">{envio.estado}</div>
                        <div className="w-[100px] flex justify-center">
                          {formatDate(envio.fecha)}
                        </div>
                        <div className="w-[250px] flex justify-center">
                          {cortarTexto(doc.name)}
                        </div>
                        <div className="w-[65px] flex justify-center">
                          <button
                            onClick={() =>
                              handleDownload(doc.pathFile, doc.name)
                            }
                            className="transition-transform duration-300 hover:scale-110"
                          >
                            <img src={descargar} alt="Descargar" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MisEnviosCli;
