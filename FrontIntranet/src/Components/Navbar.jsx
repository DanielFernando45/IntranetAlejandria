// src/components/Navbar.jsx
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";

import logoaleja from "../assets/images/LogoAlejandriaSIN.png";
import perfil from "../assets/icons/PerfilIcon.svg";
import flechaabajo from "../assets/icons/Flecha.svg";
import flechaarriba from "../assets/icons/arrow-up.svg";

import miperfil from "../assets/icons/miPerfil.svg";
import micontrato from "../assets/icons/miContrato.svg";
import miasesor from "../assets/icons/miAsesor.svg";
import candadoblack from "../assets/icons/candadoPass.svg";
import cerrarsesion from "../assets/icons/cerrarSesion.svg";

const Navbar = ({ user }) => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(`/estudiante/${path}`);
    setIsMenuOpen(false); // opcional: cerrar menú al navegar
  };

  return (
    <nav className="bg-white fixed top-0 left-[100px] w-[calc(100%-100px)] flex h-[70px] p-[5px_19px] justify-between items-center shadow-md z-10">
      <img src={logoaleja} alt="Logo Aleja" className=" w-40" />

      <div className="inline-flex items-center gap-4 relative">
        <img src={perfil} alt="Icono de perfil" />

        <div className="flex gap-2 items-center">
          <div className="flex flex-col text-right leading-tight">
            <span className="font-medium">{user?.nombre}</span>
            <span className="text-sm text-gray-500 capitalize">{user?.role}</span>
          </div>

          <button onClick={toggleMenu}>
            <img src={isMenuOpen ? flechaarriba : flechaabajo} alt="Toggle menú" />
          </button>
        </div>

        {isMenuOpen && (
          <div className="text-[#575051] absolute right-0 top-[60px] flex flex-col bg-white border rounded-lg shadow-md min-w-[230px] p-2 z-50">
            {user?.role === 'estudiante' && (
              <>
                <button onClick={() => handleNavigation('miperfil')} className="flex justify-between text-left px-2 py-1 hover:bg-gray-100">
                  Mi perfil <img src={miperfil} alt="Icono" />
                </button>
                <button onClick={() => handleNavigation('miasesor')} className="flex justify-between text-left px-2 py-1 hover:bg-gray-100">
                  Mi asesor <img src={micontrato} alt="Icono" />
                </button>
                <button onClick={() => handleNavigation('micontrato')} className="flex justify-between text-left px-2 py-1 hover:bg-gray-100">
                  Mi contrato <img src={miasesor} alt="Icono" />
                </button>
                <button onClick={() => handleNavigation('cambiarcontraseña')} className="flex justify-between text-left px-2 py-1 hover:bg-gray-100">
                  Cambiar contraseña <img src={candadoblack} alt="Icono" />
                </button>
              </>
            )}
            {user?.role === 'asesor' && (
              <>
                <button className="flex justify-between text-left px-2 py-1 hover:bg-gray-100">
                  Mi perfil <img src={miperfil} alt="Icono" />
                </button>
                <button className="flex justify-between text-left px-2 py-1 hover:bg-gray-100">
                  Cambiar Contraseña <img src={candadoblack} alt="Icono" />
                </button>
              </>
            )}
            {user?.role === 'admin' && (
              <>
                <button className="text-left px-2 py-1 hover:bg-gray-100">Panel de control</button>
                <button className="text-left px-2 py-1 hover:bg-gray-100">Configuración</button>
              </>
            )}
            <hr className="my-1" />
            <button onClick={handleLogout} className="flex justify-between text-left px-2 py-1 hover:bg-gray-100 text-red-500">
              Cerrar sesión <img src={cerrarsesion} alt="Icono" />
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
