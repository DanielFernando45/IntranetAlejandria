// src/pages/Unauthorized.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-4">No tienes permiso para acceder a esta página</h1>
      <Link to="/" className="text-blue-500 underline">Volver al inicio</Link>
    </div>
  );
};

export default Unauthorized;
