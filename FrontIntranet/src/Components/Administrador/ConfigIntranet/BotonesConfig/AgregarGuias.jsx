import React, { useState } from 'react';

const AgregarGuias = ({ close }) => {
  const [formData, setFormData] = useState({
    titulo:'',
    descripcion:'',
    url_imagen: null,
    doc_url: null
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfName, setPdfName] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Manejar campos de texto normales
    if (name === 'titulo' || name === 'descripcion') {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (!file) return;

    if (name === 'url_imagen') {
      // Validar que sea una imagen
      if (!file.type.match('image.*')) {
        setError('Por favor, selecciona un archivo de imagen válido (JPG, PNG, GIF)');
        return;
      }

      // Crear previsualización de la imagen
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target.result);
      };
      reader.readAsDataURL(file);

      // Actualizar el estado con el archivo
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      setError(null);
    }

    if (name === 'doc_url') {
      // Validar que sea un PDF
      if (file.type !== 'application/pdf') {
        setError('Por favor, selecciona un archivo PDF válido');
        return;
      }

      // Mostrar nombre del PDF
      setPdfName(file.name);

      // Actualizar el estado con el archivo
      setFormData(prev => ({
        ...prev,
        [name]: file
      }));
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('descripcion', formData.descripcion);
      
      // Adjuntar archivos si existen
      if (formData.url_imagen) {
        formDataToSend.append('url_imagen', formData.url_imagen);
      }
      if (formData.doc_url) {
        formDataToSend.append('doc_url', formData.doc_url);
      }

      const response = await fetch('http://localhost:3001/recursos/guias/add', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Error al agregar la guía');
      }

      location.reload();
      close();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F0EFEF] p-6 rounded-lg w-1/3">
        <h2 className="text-xl font-medium mb-4 text-[#2B2829]">Añadir Guía</h2>
        
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Título</label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder='Ej: Guía de Normas APA'
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder='Ej: Instrucciones para citar y referenciar...'
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows="3"
              required
            />
          </div>
          
          {/* Campo para subir imagen */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Imagen</label>
            <input
              type="file"
              name="url_imagen"
              onChange={handleFileChange}
              accept="image/*"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {imagePreview && (
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Vista previa:</h3>
                <img 
                  src={imagePreview} 
                  alt="Vista previa de la imagen" 
                  className="max-h-40 rounded"
                />
                <p className="text-xs text-gray-500 mt-1">Formatos aceptados: JPG, PNG, GIF</p>
              </div>
            )}
          </div>
          
          {/* Campo para subir PDF */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Documento PDF</label>
            <input
              type="file"
              name="doc_url"
              onChange={handleFileChange}
              accept="application/pdf"
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {pdfName && (
              <div className="mt-2">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Documento seleccionado:</h3>
                <p className="text-sm text-gray-700">{pdfName}</p>
                <p className="text-xs text-gray-500 mt-1">Solo se aceptan archivos PDF</p>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-16 py-2 bg-[#1C1C34] text-white rounded hover:bg-[#2a2a4a] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Añadiendo...' : 'Añadir'}
            </button>
            <button
              onClick={close}
              type="button"
              disabled={isSubmitting}
              className="px-16 py-2 border border-[#1C1C34] rounded text-[#1C1C34] hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AgregarGuias;