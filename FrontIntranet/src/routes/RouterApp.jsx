// src/routes/RouterApp.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

// Páginas Estudiante
import HomeEstudiante from '../pages/Estudiante/HomeEstudiante';
import ReunionesEstudiante from '../pages/Estudiante/ReunionesEstudiante';
import EntregaRevisionEst from '../pages/Estudiante/EntregaRevisionEst';
import CalendarioEstudiante from '../pages/Estudiante/CalendarioEstudiante';
import MiPerfil from '../pages/Estudiante/MiPerfil';
import MiAsesor from '../pages/Estudiante/MiAsesor';
import MiContrato from '../pages/Estudiante/MiContrato';
import CambiarContraseña from '../pages/Estudiante/CambiarContraseña';
import MiPerfilEdit from '../pages/Estudiante/MiPerfilEdit';

//Paginas Asesor
import HomeAsesor from '../pages/Asesor/HomeAsesor';

//Paginas Admin
import GestionarUsuarios from '../pages/Administrador/GestionUser';
import Asignaciones from '../pages/Administrador/Asignaciones';
import Pagos from '../pages/Administrador/Pagos';
import AgregarEstudiante from '../pages/Administrador/GestionarUsuario/AgregarEstudiante';
import AgregarAsesor from '../pages/Administrador/GestionarUsuario/AgregarAsesor';
import EditarEstudiante from '../pages/Administrador/GestionarUsuario/EditarEstudiante';
import EditarAsesor from '../pages/Administrador/GestionarUsuario/EditarAsesor';
import ListarSinAsignar from '../pages/Administrador/Asignaciones/ListarSinAsignar';
import ListarAsignado from '../pages/Administrador/Asignaciones/ListarAsignados';
import AsesoriaNueva from '../pages/Administrador/Asignaciones/AsesoriaNueva'
//Paginas Errores
import Unauthorized from '../pages/Unauthorized';
import ErrorScreen from '../pages/ErrorScreen';

//Pagina Recuperar Contraseña
import ResetPassword from '../pages/ResetPassword';
import NuevaContraseña from '../pages/NuevaContraseña';
import ListarEstudiante from '../pages/Administrador/GestionarUsuario/ListarEstudiante';
import ListarAsesor from '../pages/Administrador/GestionarUsuario/ListarAsesor';


const RouterApp = () => {
  return (
    <Routes>

      {/* RUTAS ESTUDIANTE */}
      <Route element={<ProtectedRoutes allowedRoles={['estudiante']} />}>
        <Route path="/estudiante/home" element={<HomeEstudiante />} />
        <Route path="/estudiante/reuniones" element={<ReunionesEstudiante />} />
        <Route path="/estudiante/entrega" element={<EntregaRevisionEst />} />
        <Route path="/estudiante/calendario" element={<CalendarioEstudiante/>}/>
        <Route path="/estudiante/miperfil" element={<MiPerfil/>}/>
        <Route path="/estudiante/miperfiledit" element={<MiPerfilEdit/>}/>
        <Route path="/estudiante/miasesor" element={<MiAsesor/>}/>
        <Route path="/estudiante/micontrato" element={<MiContrato/>}/>
        <Route path="/estudiante/cambiarcontraseña" element={<CambiarContraseña/>}/>
        
      </Route>

      {/* RUTAS ASESOR */}
      <Route element={<ProtectedRoutes allowedRoles={['asesor']} />}>
        <Route path="/asesor/home" element={<HomeAsesor />} />
      </Route>

      {/* RUTAS ADMIN */}
      <Route element={<ProtectedRoutes allowedRoles={['admin']} />}>

        <Route path="/admin/gestionar-usuarios" element={<GestionarUsuarios />}>
              <Route index element={<Navigate to="listar-estudiantes" replace />} />
              <Route path="listar-estudiantes" element={<ListarEstudiante/>} />
              <Route path="listar-asesores" element={<ListarAsesor/>} />
        </Route> 

        <Route path="/admin/asignaciones" element={<Asignaciones/>}>
              <Route index element={<Navigate to="listar-asignar" replace />}/>
              <Route path ="listar-asignar" element={<ListarSinAsignar/>}/>
              <Route path ="listar-asignado" element={<ListarAsignado/>}/>
        </Route>

        <Route path="/admin/asignaciones/asesoria-nueva" element={<AsesoriaNueva/>}/>
        <Route path="/admin/gestionar-usuarios/agregar-estudiante" element={<AgregarEstudiante/>} />
        <Route path="/admin/gestionar-usuarios/agregar-asesor" element={<AgregarAsesor/>} />
        <Route path="/admin/gestionar-usuarios/editar-estudiante/:id" element={<EditarEstudiante/>} />
        <Route path="/admin/gestionar-usuarios/editar-asesor/:id" element={<EditarAsesor/>} />

        
        <Route path="/admin/pagos" element={<Pagos/>}/>

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
