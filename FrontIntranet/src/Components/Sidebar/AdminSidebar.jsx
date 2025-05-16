import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Menu from "../../assets/icons/IconEstudiante/BotonMenu.svg";
import LogoAleja from "../../assets/icons/IconEstudiante/LogoOscuro.svg";
import MenuRetraido from "../../assets/icons/menuRetra.svg";
//Logos
import Gestion from "../../assets/icons/IconAsesor/gestionAlum.svg";
import Asignaciones from "../../assets/icons/IconAdmin/asignar.svg";
import ConfIntranet from "../../assets/icons/IconAdmin/configurar.svg";
import GestionSoporte from "../../assets/icons/IconAdmin/SoporteTecnico.svg";
import Pagos from "../../assets/icons/IconEstudiante/PagosEstudiante.svg";

const LINKS = [
  {
    icono: Gestion,
    path: "/admin/gestionar-usuarios",
    title: "Gestionar Usuarios",
    // SubLinks ya no se renderizan en la barra lateral
    subLinks: [
      { path: "/admin/gestionar-usuarios/listar-estudiantes", title: "Listar Estudiantes" },
      { path: "/admin/gestionar-usuarios/listar-asesores", title: "Listar Asesores" },
    ],
  },
  {
    icono: Asignaciones,
    path: "/admin/asignaciones",
    title: "Asignaciones",
    subLinks: [
      { path: "/admin/asignaciones/listar-asignar", title: "Listar Sin Asignar" },
      { path: "/admin/asignaciones/listar-asignado", title: "Listar Asignados" },
    ],
  },
  { icono: Pagos, path: "/admin/pagos", title: "Pagos" },
  { icono: ConfIntranet, path: "/admin/confIntra", title: "Configuración de Intranet"},
  { icono: GestionSoporte, path: "/admin/calendario", title: "Gestion Soporte Tecnico" },
];

const AdminSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = () => {
    setIsExpanded(false);
  };

  // Verifica si la ruta o alguna de sus subrutas está activa
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {isExpanded && (
        <div
          className="fixed inset-0 bg-black/30 z-20"
          onClick={() => setIsExpanded(false)}
        />
      )}

      <nav
        className={`fixed left-0 top-0 h-full ${
          isExpanded ? "w-[266px]" : "w-[100px]"
        } flex-shrink-0 bg-white z-30 transition-all duration-300`}
      >
        <div className="flex flex-col items-center gap-[30px] py-5 px-5">
          <img src={LogoAleja} alt="Logo" />
          <button onClick={toggleMenu}>
            <img src={isExpanded ? Menu : MenuRetraido} alt="Toggle Menu" />
          </button>
        </div>

        <ul className="flex flex-col gap-1 items-start">
          {LINKS.map((link) => {
            // Verifica si la ruta principal o alguna de sus subrutas está activa
            const active = isActive(link.path);
            return (
              <div key={link.title}>
                {/* Solo renderizamos la ruta principal */}
                <Link to={link.path}>
                  <li
                    className={`flex items-center ${
                      isExpanded ? "w-[266px]" : "w-[100px]"
                    } h-[77px] px-[20px] py-[25px] cursor-pointer flex-shrink-0 bg-white z-30 transition-all duration-300 
                    hover:bg-[#F0EFEF] ${active ? "bg-[#EFEFEE] border-l-[5px] border-[#000]" : ""}`}
                    onClick={handleItemClick}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <img src={link.icono} className="w-6 h-6" />
                      {isExpanded && (
                        <span className="text-[17px] font-medium text-gray-800">
                          {link.title}
                        </span>
                      )}
                    </div>
                  </li>
                </Link>

                {/* Las subrutas ya no se renderizan en el sidebar */}
              </div>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default AdminSidebar;
