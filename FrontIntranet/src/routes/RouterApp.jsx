// src/routes/RouterApp.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

// Páginas por rol
import HomeEstudiante from '../pages/Estudiante/HomeEstudiante';
import ReunionesEstudiante from '../pages/Estudiante/ReunionesEstudiante';
import EntregaRevisionEst from '../pages/Estudiante/EntregaRevisionEst';

import HomeAsesor from '../pages/Asesor/HomeAsesor';

import GestionarUsuarios from '../pages/Administrador/GestionUser';

import Unauthorized from '../pages/Unauthorized';
import ErrorScreen from '../pages/ErrorScreen';
import ResetPassword from '../pages/ResetPassword';
import NuevaContraseña from '../pages/NuevaContraseña';

const RouterApp = () => {
  return (
    <Routes>

      {/* RUTAS ESTUDIANTE */}
      <Route element={<ProtectedRoutes allowedRoles={['estudiante']} />}>
        <Route path="/estudiante/home" element={<HomeEstudiante />} />
        <Route path="/estudiante/reuniones" element={<ReunionesEstudiante />} />
        <Route path="/estudiante/entrega" element={<EntregaRevisionEst />} />
      </Route>

      {/* RUTAS ASESOR */}
      <Route element={<ProtectedRoutes allowedRoles={['asesor']} />}>
        <Route path="/asesor/home" element={<HomeAsesor />} />
      </Route>

      {/* RUTAS ADMIN */}
      <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>
        <Route path="/admin/gestionar-usuarios" element={<GestionarUsuarios />} />
      </Route>

      {/* RUTA NO AUTORIZADA */}
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* CATCH ALL */}
      <Route path="*" element={<ErrorScreen />} />

      {/* RECUPERAR CONTRASEÑA */}
      <Route path="/recuperarContraseña" element={<ResetPassword/>} />
      <Route path='/cambiarContraseña' element={<NuevaContraseña/>} />
    </Routes>
  );
};

export default RouterApp;
