// src/layout/LayoutApp.jsx
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

import EstudianteSidebar from "../Components/Sidebar/EstudianteSidebar";
import AsesorSidebar from "../Components/Sidebar/AsesorSidebar";
import AdminSidebar from "../Components/Sidebar/AdminSidebar";
import Navbar from "../Components/Navbar";

const LayoutApp = ({ children }) => {
  const { state } = useContext(AuthContext);
  const user = state.user;

  if (!user) {
    return <div className="text-center p-10">Cargando datos del usuario...</div>;
  }

  const renderSidebar = () => {
    switch (user.role) {
      case 'estudiante':
        return <EstudianteSidebar />;
      case 'asesor':
        return <AsesorSidebar />;
      case 'admin':
        return <AdminSidebar />;
      default:
        return null;
    }
  };

  return (
    <div>
      {renderSidebar()}
      <Navbar user={user} />
      <div className="ml-[100px] mt-[70px] p-4"> {/* Ajuste de margen para layout */}
        {children}
      </div>
    </div>
  );
};

export default LayoutApp;
