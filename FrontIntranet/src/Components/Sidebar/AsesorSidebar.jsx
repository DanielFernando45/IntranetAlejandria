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
  { icono: Reuniones, path: "/asesor/reuniones", title: "Reuniones" },
  { icono: EntreRev, path: "/asesor/entrega", title: "Entrega/Revisión" },
  { icono: Calendario, path: "/asesor/calendario", title: "Calendario" },
  { icono: Gestion, path: "/asesor/soporte", title: "Gestionar Alumnos" },
];

const AsesorSidebar =() =>{
 const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = () => {
    setIsExpanded(false);
  };

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
            const isActive = location.pathname === link.path;
            return (
                <Link to={link.path}>
                <li
                key={link.title}
                className={`flex items-center ${
                  isExpanded ? "w-[266px]" : "w-[100px]"
                } h-[77px] px-[20px] py-[25px] cursor-pointer flex-shrink-0 bg-white z-30 transition-all duration-300 
                hover:bg-[#F0EFEF] ${
                  isActive ? "bg-[#EFEFEF] border-l-[5px] border-[#000]" : ""
                }`}
                onClick={handleItemClick}
              >
                <Link to={link.path} className="flex items-center gap-4 w-full">
                  <img src={link.icono} className="w-6 h-6" />
                  {isExpanded && (
                    <span className="text-sm font-medium text-gray-800">
                      {link.title}
                    </span>
                  )}
                </Link>
              </li>
                </Link>
              
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export default AsesorSidebar;