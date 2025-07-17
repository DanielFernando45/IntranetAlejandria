import React from 'react'
import { useState, useEffect } from "react";
import arrowIcon from '../../../assets/icons/IconEstudiante/arriba.svg'
import descargar from '../../../assets/icons/Descargas.svg'
import axios from 'axios';
import documentosVacios from '../../../assets/icons/documentosVacios.png'

const EnvioAsesor = ({ idAsesoramiento }) => {
  const [misEnvios, setMisEnvios] = useState([]);
  const [openItems, setOpenItems] = useState({});

  useEffect(() => {
    if (idAsesoramiento) {
      axios.get(`http://localhost:3001/documentos/asesor/list/${idAsesoramiento}`)
        .then(response => {
          setMisEnvios(response.data);
          // Inicializar el estado de apertura para cada item
          const initialOpenState = {};
          response.data.forEach((envio, index) => {
            initialOpenState[index] = false;
          });
          setOpenItems(initialOpenState);
        })
        .catch(error => {
          console.error('Error al obtener los pendientes:', error);
        });
    }
  }, [idAsesoramiento]);

  const toggleOpen = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const options = { month: 'short', day: 'numeric', year: 'numeric' }
    return date.toLocaleDateString('en-US', options)
  }

  // Función para extraer todos los documentos de un envio
  const getDocuments = (envio) => {
    const documents = [];
    let i = 1;

    while (envio[`nombreDoc${i}`] && envio[`ruta${i}`]) {
      // Extraer el pathFile de la URL (última parte después de /)
      const urlParts = envio[`ruta${i}`].split('/');
      const pathFile = urlParts[urlParts.length - 1];

      documents.push({
        name: envio[`nombreDoc${i}`],
        url: envio[`ruta${i}`],
        pathFile: pathFile
      });
      i++;
    }

    return documents;
  };

  // Función para descargar archivos directamente desde la URL proporcionada
  const handleDownload = async (url, filename) => {
    try {
      // Crear un enlace temporal para descargar el archivo
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();

      // Limpiar
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      alert('Error al descargar el archivo');
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between text-[#495D72] font-medium p-[6px] rounded-md">
        <div className="w-[160px] flex text-[8px] sm:text-[12px] lg:text-[17px]">Titulo</div>
        <div className="w-[102px] justify-center hidden lg:text-[17px] 1xl:flex">Estado</div>
        <div className="w-[100px] flex justify-center text-[8px] sm:text-[12px] lg:text-[17px]">Fecha</div>
        <div className="w-[250px] justify-center hidden md:flex md:text-[12px] lg:text-[17px]">Archivo</div>
        <div className="w-[100px] rounded-md px-3 flex justify-center text-[8px] sm:text-[12px] lg:text-[17px]">Descargas</div>
      </div>

      {misEnvios.map((envio, index) => {
        const documents = getDocuments(envio);
        const hasDocuments = documents.length > 0;

        return (
          <React.Fragment key={envio.id_asunto || index}>
            <div className="flex justify-between text-[#2B2829] font-normal  bg-[#E9E7E7] p-[6px] rounded-md items-center">
              <div className="w-[160px] flex text-[8px] sm:text-[12px] lg:text-[14px]">{envio.asunto}</div>
              <div className='text-white bg-[#353563] rounded px-3 hidden lg:text-[14px] 1xl:flex '>{envio.estado}</div>
              <div className="w-[100px] flex justify-center text-[8px] sm:text-[12px] lg:text-[14px]">{formatDate(envio.fecha)}</div>
              <div className="w-[250px] justify-center hidden md:flex md:text-[10px] lg:text-[14px]">
                {hasDocuments ? documents[0].name : 'No hay archivos'}
              </div>
              <div className="w-[100px]  flex justify-center ">
                {hasDocuments && (
                  <button onClick={() => toggleOpen(index)} className="transition-transform duration-300">
                    <img
                      src={arrowIcon}
                      alt="toggle"
                      className={`w-[10px] sm:w-[14px] transform transition-transform duration-300 ${openItems[index] ? 'rotate-180' : 'rotate-0'}`}
                    />
                  </button>
                )}
              </div>
            </div>

            {openItems[index] && hasDocuments && (
              <div className="bg-white shadow-md rounded-md p-1 my-1">
                {documents.slice(0).map((doc, docIndex) => (
                  <div key={docIndex} className="flex justify-between items-center py-1 border-b last:border-b-0">
                    <div className="w-[160px] flex text-[8px] sm:text-[10px]">{envio.asunto}</div>
                    <div className="w-[102px] hidden 1xl:flex 1xl:justify-center sm:text-[10px] ">{envio.estado}</div>
                    <div className="w-[100px] flex justify-center text-[8px] sm:text-[10px]">{formatDate(envio.fecha)}</div>
                    <div className="w-[250px] justify-center hidden md:flex md:text-[10px]">{doc.name}</div>
                    <div className="w-[100px] flex justify-center text-[8px] sm:text-[10px]">
                      <button
                        onClick={() => handleDownload(doc.pathFile, doc.name)}
                        className="transition-transform duration-300 hover:scale-110"
                      >
                        <img src={descargar} alt="Descargar" className='w-[10px] sm:w-[12px]' />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </React.Fragment>
        );
      })}

      {misEnvios.length === 0 && (
        <div className="flex justify-center mt-5">
          <div className="flex flex-col border rounded-[12px] text-[12px] justify-center items-center w-[280px] sm:w-[370px] mn:w-[335px] lg:w-full   h-[120px] sm:h-[180px] lg:h-[220px] xl:h-[200px]  5xl:h-[150px] gap-5 text-[#82777A] shadow-[0px_4px_4px_4px_rgba(0,0,0,0.25)] " >
            <img src={documentosVacios} alt="" />
            No hay envíos realizados
          </div>
        </div>
      )}
    </div>
  );
}

export default EnvioAsesor