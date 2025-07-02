import React, { useState, useEffect } from 'react';

const AgregarTutoriales = ({ close }) => {
  const [formData, setFormData] = useState({
    titulo: '',
    enlace: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [youtubeEmbedUrl, setYoutubeEmbedUrl] = useState(null);

  // Extraer el ID del video de YouTube cuando cambia el enlace
  useEffect(() => {
    if (formData.enlace.includes('youtube.com') || formData.enlace.includes('youtu.be')) {
      const videoId = extractYoutubeId(formData.enlace);
      if (videoId) {
        setYoutubeEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
      }
    } else {
      setYoutubeEmbedUrl(null);
    }
  }, [formData.enlace]);

  const extractYoutubeId = (url) => {
    // Extraer ID para diferentes formatos de URL de YouTube
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3001/recursos/tutoriales/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      location.reload();
      if (!response.ok) {
        throw new Error('Error al agregar el tutorial');
      }

      close();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F0EFEF] p-6 rounded-lg w-1/4">
        <h2 className="text-xl font-medium mb-4 text-[#2B2829]">Añadir Tutorial</h2>
        
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
              placeholder='Ej: Cómo usar Zotero'
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Enlace de YouTube</label>
            <input
              type="url"
              name="enlace"
              value={formData.enlace}
              onChange={handleChange}
              placeholder='https://www.youtube.com/watch?v=...'
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            {youtubeEmbedUrl && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 mb-1">Vista previa:</h3>
                <div className="aspect-w-16 aspect-h-9">
                  <iframe
                    src={youtubeEmbedUrl}
                    title="Vista previa del video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-48 rounded"
                  ></iframe>
                </div>
                <p className="text-xs text-gray-500 mt-1">Esta es una vista previa del video que se añadirá</p>
              </div>
            )}
            <p className="text-xs text-gray-500 mt-1">Solo enlaces de YouTube son soportados</p>
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

export default AgregarTutoriales;