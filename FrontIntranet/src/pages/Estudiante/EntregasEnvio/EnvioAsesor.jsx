import React from 'react'
import { useState, useEffect } from "react";
import arrowIcon from '../../../assets/icons/IconEstudiante/arriba.svg'
import descargar from '../../../assets/icons/Descargas.svg'
import axios from 'axios';

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
  
    // Función para descargar archivos usando la nueva API
    const handleDownload = async (pathFile, filename) => {
      try {
        const response = await axios.get(
          `http://localhost:3001/documentos/download/${pathFile}`,
          {
            responseType: 'blob' // Importante para descargar archivos
          }
        );
        
        // Crear un enlace temporal para descargar el archivo
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        
        // Limpiar
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error al descargar el archivo:', error);
        alert('Error al descargar el archivo');
      }
    };
  
    return (
      <div className="flex flex-col">
        <div className="flex justify-between text-[#495D72] font-medium p-[6px] rounded-md">
          <div className="w-[300px] flex">Titulo</div>
          <div className="w-[102px] flex justify-center">Estado</div>
          <div className="w-[100px] flex justify-center">Fecha</div>
          <div className="w-[250px] flex justify-center">Archivo</div>
          <div className="w-[65px] rounded-md px-3 flex justify-center">Descargas</div>
        </div>
  
        {misEnvios.map((envio, index) => {
          const documents = getDocuments(envio);
          const hasDocuments = documents.length > 0;
          
          return (
            <React.Fragment key={envio.id_asunto || index}>
              <div className="flex justify-between text-[#2B2829] font-normal mt-2 bg-[#E9E7E7] p-[6px] rounded-md items-center">
                <div className="w-[300px] flex">{envio.asunto}</div>
                <div className='text-white bg-[#353563] rounded px-3'>{envio.estado}</div>
                <div className="w-[100px] flex justify-center">{formatDate(envio.fecha)}</div>
                <div className="w-[250px] flex justify-center">
                  {hasDocuments ? documents[0].name : 'No hay archivos'}
                </div>
                <div className="w-[65px] flex justify-center">
                  {hasDocuments && (
                    <button onClick={() => toggleOpen(index)} className="transition-transform duration-300">
                      <img
                        src={arrowIcon}
                        alt="toggle"
                        className={`transform transition-transform duration-300 ${openItems[index] ? 'rotate-180' : 'rotate-0'}`}
                      />
                    </button>
                  )}
                </div>
              </div>
  
              {openItems[index] && hasDocuments && (
                <div className="bg-white shadow-md rounded-md p-4 my-2">
                  {documents.slice(0).map((doc, docIndex) => (
                    <div key={docIndex} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div className="w-[300px] flex">{envio.asunto}</div>
                      <div className="w-[102px]">{envio.estado}</div>
                      <div className="w-[100px] flex justify-center">May 22,2025</div>
                      <div className="w-[250px] flex justify-center">{doc.name}</div>
                      <div className="w-[65px] flex justify-center">
                        <button 
                          onClick={() => handleDownload(doc.pathFile, doc.name)}
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
    );
}

export default EnvioAsesor