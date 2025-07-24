import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Menu from "../../assets/icons/IconEstudiante/BotonMenu.svg";
import LogoAleja from "../../assets/icons/IconEstudiante/LogoOscuro.svg";
import MenuRetraido from "../../assets/icons/menuRetra.svg";
//Logos
import HomeEstu from "../../assets/icons/IconEstudiante/HomeEstudent.svg";
import Reuniones from "../../assets/icons/IconEstudiante/ReunionEstudiante.svg";
import EntreRev from "../../assets/icons/IconEstudiante/EnvioEstudiante.svg";
import Calendario from "../../assets/icons/IconEstudiante/CalendarEstudiante.svg";
import Gestion from "../../assets/icons/IconAsesor/gestionAlum.svg";


const LINKS = [
  { icono: HomeEstu, path: "/asesor/home", title: "Home" },
  { icono: Reuniones, path: "/asesor/reuniones", title: "Zoom / Inducciones" },
  { 
    icono: EntreRev, 
    path: "/asesor/entrega", 
    title: "Entrega/Revisión", 
    subLinks: [
      { path: "/asesor/entrega/terminados"},
      { path: "/asesor/entrega/pendientes"},
    ]
  },
  { icono: Calendario, path: "/asesor/calendario", title: "Calendario" },
  { icono: Gestion, path: "/asesor/gestionarAlumno", title: "Gestionar Clientes" },
];

const AsesorSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = () => {
    setIsExpanded(false);
  };

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
            const active = isActive(link.path);
            return (
              <li
                key={link.path} // Añadido key única usando el path
                className={`flex items-center ${
                  isExpanded ? "w-[266px]" : "w-[100px]"
                } h-[77px]  cursor-pointer  bg-white z-30 transition-all duration-300 
                hover:bg-[#F0EFEF] ${
                  active ? "bg-[#EFEFEF] border-l-[5px] border-[#000]" : ""
                }`}
                onClick={handleItemClick}
              >
                <Link to={link.path} className="flex items-center  justify-start pl-5 gap-4 w-full h-full">
                
                  <img src={link.icono} className="w-6 h-6" alt={link.title} />
                  {isExpanded && (
                    <span className="text-sm font-medium text-gray-800">
                      {link.title}
                    </span>
                  )}
                
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default AsesorSidebar;