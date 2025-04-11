import React, { useState, useRef, useEffect } from 'react';

const EnvioArchivo = ({ show, onClose }) => {
  const [asunto, setAsunto] = useState('');
  const [archivos, setArchivos] = useState([]);
  const fileInputRef = useRef(null);

  const tiposPermitidos = [
     // Documentos
    'application/pdf', 'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain', 'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    // Videos
    'video/mp4', 'video/webm', 'video/ogg',
    // Imágenes
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    // Comprimidos
    'application/zip', 'application/x-rar-compressed', 'application/x-7z-compressed'
  ];

  const handleFileChange = (e) => {
    const nuevosArchivos = Array.from(e.target.files);
    const archivosValidos = nuevosArchivos.filter(file => tiposPermitidos.includes(file.type));
    if (archivos.length + archivosValidos.length <= 7) {
      setArchivos(prev => [...prev, ...archivosValidos]);
    } else {
      alert('Solo puedes subir un máximo de 7 archivos.');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const eliminarArchivo = (index) => {
    setArchivos(prev => prev.filter((_, i) => i !== index));
  };

  const handleClickOutside = (e) => {
    if (e.target.id === 'modal-background') {
      onClose();
    }
  };

  const handleSubmit = () => {
    if (asunto.trim() === '' || archivos.length === 0) return;

    alert('¡Se envió correctamente!');
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  useEffect(() => {
    if (!show) {
      setAsunto('');
      setArchivos([]);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      id="modal-background"
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto transition-all duration-300">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
        >✕</button>
        <h2 className="text-xl font-semibold mb-4">Agregar Asunto</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Asunto</label>
          <input
            type="text"
            value={asunto}
            onChange={e => setAsunto(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Archivos</label>
          <div className="flex items-center gap-4">
            <button
              onClick={handleUploadClick}
              className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              Subir archivos
            </button>
            <input
              type="file"
              ref={fileInputRef}
              multiple
              accept={tiposPermitidos.join(',')}
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        {archivos.length > 0 && (
          <ul className="mb-4 text-sm text-gray-700 space-y-2">
            {archivos.map((file, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 px-3 py-1 rounded">
                <span className="truncate w-[80%]">{file.name}</span>
                <button
                  onClick={() => eliminarArchivo(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}

        {archivos.length < 7 && (
          <button
            onClick={handleUploadClick}
            className="text-blue-600 hover:underline mb-4"
          >
            Agregar más archivos
          </button>
        )}

        <button
          className={`w-full py-2 rounded text-white ${
            asunto.trim() !== '' && archivos.length > 0
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
          onClick={handleSubmit}
          disabled={asunto.trim() === '' || archivos.length === 0}
        >
          Subir
        </button>
      </div>
    </div>
  );
};

export default EnvioArchivo;

