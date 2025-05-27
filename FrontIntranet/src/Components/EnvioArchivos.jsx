import React, { useState, useRef, useEffect } from 'react';
import agregar from "../assets/icons/IconEstudiante/add.svg";
import eliminar from "../assets/icons/delete.svg";

const EnvioArchivo = ({ show, onClose, asesoriaId }) => {
  const [asunto, setAsunto] = useState('');
  const [archivos, setArchivos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [authError, setAuthError] = useState(false);
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

  // Función mejorada para verificar el token según tu localStorage
  const verifyToken = async () => {
    try {
      // Obtener el token - en tu caso está en authToken
      const token = localStorage.getItem('authToken');
      
      // Obtener los datos del usuario - en tu caso está en 'user' pero con formato irregular
      const userDataString = localStorage.getItem('user');
      
      if (!token) {
        throw new Error('No se encontró el token de autenticación (authToken)');
      }

      if (!userDataString) {
        throw new Error('No se encontraron los datos del usuario');
      }

      // Procesamiento especial para el string de usuario que tiene formato irregular
      let user;
      try {
        // Intenta primero parsear como JSON válido
        user = JSON.parse(userDataString);
      } catch (e) {
        // Si falla, intenta extraer los datos del formato irregular
        try {
          const idMatch = userDataString.match(/id:(\d+)/);
          const nombreMatch = userDataString.match(/nombre:"([^"]+)"/);
          const roleMatch = userDataString.match(/role:"([^"]+)"/);

          user = {
            id: idMatch ? parseInt(idMatch[1]) : null,
            nombre: nombreMatch ? nombreMatch[1] : '',
            role: roleMatch ? roleMatch[1] : 'estudiante'
          };
        } catch (parseError) {
          console.error('Error al parsear datos de usuario:', parseError);
          throw new Error('Formato inválido para los datos del usuario');
        }
      }

      // Verificación final de los datos mínimos requeridos
      if (!user.role) {
        user.role = 'estudiante'; // Valor por defecto
      }

      console.log('Datos de usuario procesados:', user); // Para depuración

      // Verificación básica del token
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
          throw new Error('Token expirado');
        }
      } catch (e) {
        console.warn('Error al verificar token:', e);
        throw new Error('Token inválido o expirado');
      }

      return { token, user };
    } catch (error) {
      console.error('Error en verifyToken:', error);
      throw error;
    }
  };

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

  const handleSubmit = async () => {
    if (asunto.trim() === '' || archivos.length === 0) return;

    setIsSubmitting(true);
    setSubmitError(null);
    setAuthError(false);

    try {
      // Verificar token antes de enviar (con más manejo de errores)
      let authData;
      try {
        authData = await verifyToken();
      } catch (authError) {
        setAuthError(true);
        throw new Error(`Problema de autenticación: ${authError.message}`);
      }

      const { token, user } = authData;

      const formData = new FormData();
      formData.append('titulo', asunto);
      formData.append('subido_por', user.role);

      // Agregar cada archivo al FormData
      archivos.forEach((file) => {
        formData.append('files', file); // Cambiado de 'files' a 'documentos' según tu endpoint
      });

      const response = await fetch(`http://localhost:3001/asuntos/addWithDocument/${asesoriaId}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.status === 401) {
        setAuthError(true);
        throw new Error('Token inválido o expirado. Por favor, vuelve a iniciar sesión.');
      }

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Error al enviar los documentos');
      }

      setSubmitSuccess(true);
      setTimeout(() => onClose(), 1000);
    } catch (error) {
      console.error('Error completo:', error);
      setSubmitError(error.message);

      // Mensaje más específico para errores de autenticación
      if (error.message.includes('autenticación') || error.message.includes('token')) {
        setAuthError(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (!show) {
      setAsunto('');
      setArchivos([]);
      setSubmitSuccess(false);
      setSubmitError(null);
      setAuthError(false);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div
      id="modal-background"
      onClick={handleClickOutside}
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto"
    >
      <div className="bg-[#F8F7F7] flex flex-col gap-4 rounded-2xl shadow-2xl w-full max-w-lg p-6 relative max-h-[90vh] overflow-y-auto transition-all duration-300">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-lg"
        >✕</button>

        <div className='flex justify-center'>
          <h2 className="text-xl font-medium">Agregar Asunto</h2>
        </div>

        {authError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {submitError} Por favor, actualiza la página e intenta nuevamente.
          </div>
        )}

        {submitSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
            ¡Se envió correctamente!
          </div>
        )}

        {submitError && !authError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
            {submitError}
          </div>
        )}

        <div className="flex mb-4 gap-10 items-center">
          <label className="block text-sm mb-1">Asunto</label>
          <input
            type="text"
            value={asunto}
            onChange={e => setAsunto(e.target.value)}
            placeholder='Inserte el asunto'
            className="w-full rounded px-3 py-[2px] focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isSubmitting}
          />
        </div>

        <div className="flex gap-7">
          <label className="text-sm mb-1 mt-1">Archivos</label>

          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept={tiposPermitidos.join(',')}
            onChange={handleFileChange}
            className="hidden"
            disabled={isSubmitting}
          />
          {archivos.length > 0 && (
            <ul className="flex flex-col text-sm text-gray-700 gap-3">
              {archivos.map((file, index) => (
                <li key={index} className="flex w-[375px] justify-between items-center bg-white rounded">
                  <span className="truncate w-[80%]">{file.name}</span>
                  <button
                    onClick={() => !isSubmitting && eliminarArchivo(index)}
                    className="text-red-500 hover:text-red-700"
                    disabled={isSubmitting}
                  >
                    <img src={eliminar} alt="" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className='flex justify-center'>
          {archivos.length < 7 && (
            <button
              onClick={handleUploadClick}
              disabled={isSubmitting}
            >
              <img src={agregar} alt="" />
            </button>
          )}
        </div>

        <div className='flex justify-center'>
          <button
            className={`w-[130px] text-[13px] rounded-md ${asunto.trim() !== '' && archivos.length > 0 && !isSubmitting
                ? 'bg-[#DAD6D7] hover:bg-black text-white'
                : 'bg-[#DAD6D7] cursor-not-allowed'
              }`}
            onClick={handleSubmit}
            disabled={asunto.trim() === '' || archivos.length === 0 || isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Subir'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EnvioArchivo;