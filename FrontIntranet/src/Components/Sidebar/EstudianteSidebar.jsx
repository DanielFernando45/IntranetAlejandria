import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import Menu from "../../assets/icons/IconEstudiante/BotonMenu.svg";
import LogoAleja from "../../assets/icons/IconEstudiante/LogoOscuro.svg";
import MenuRetraido from "../../assets/icons/menuRetra.svg";
//Logos
import HomeEstu from "../../assets/icons/IconEstudiante/HomeEstudent.svg";
import Reuniones from "../../assets/icons/IconEstudiante/ReunionEstudiante.svg";
import EntreRev from "../../assets/icons/IconEstudiante/EnvioEstudiante.svg";
import Calendario from "../../assets/icons/IconEstudiante/CalendarEstudiante.svg";
import Recursos from "../../assets/icons/IconEstudiante/RecursosEstudiante.svg";
import Pagos from "../../assets/icons/IconEstudiante/PagosEstudiante.svg";
import Soporte from "../../assets/icons/IconEstudiante/SoporteEstudiante.svg";

const LINKS = [
  { icono: HomeEstu, path: "/estudiante/home", title: "Home" },
  { icono: Reuniones, path: "/estudiante/reuniones", title: "Reuniones" },
  {
    icono: EntreRev,
    path: "/estudiante/entrega",
    title: "Entrega/Revisión",
    subLinks: [
      { path: "/estudiante/entrega/terminados" },
      { path: "/estudiante/entrega/pendientes" },
    ]
  },
  { icono: Calendario, path: "/estudiante/calendario", title: "Calendario" },
  { icono: Recursos, path: "/estudiante/recursos", title: "Recursos" },
  { icono: Pagos, path: "/estudiante/pagos", title: "Pagos" },
  { icono: Soporte, path: "/estudiante/soporte", title: "Soporte" },
];

const EstudianteSidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 900);
      if (window.innerWidth >= 900) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsExpanded(!isExpanded);
  };

  const handleItemClick = () => {
    if (isMobile) {
      setIsExpanded(false);
    }
  };

  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <>
      {isExpanded && isMobile && (
        <div
          className="fixed inset-0 bg-black/30 z-20 "
          onClick={() => setIsExpanded(false)}
        />
      )}

      <nav
        className={`fixed left-0 top-0  
            ${isMobile
            ? (isExpanded ? "w-[266px] h-full" : "w-[101px] h-[70px] shadow-md")
            : (isExpanded ? "w-[266px] " : "w-[100px] h-full")
          } flex-shrink-0 bg-white z-30 transition-[width] duration-500 ease-in-out overflow-hidden`}
      >
        {!isMobile || isExpanded ? (
          <div className="flex flex-col items-center gap-[30px] py-5 px-5">
            <img src={LogoAleja} alt="Logo" />
            <button onClick={toggleMenu} >
              <img src={isExpanded ? Menu : MenuRetraido} alt="Toggle Menu" />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center py-5">
            <button onClick={toggleMenu} className="p-2">
              <img src={MenuRetraido} alt="Toggle Menu" />
            </button>
          </div>
        )}

        {(!isMobile || isExpanded) && (
          <ul className="flex flex-col gap-1 items-start ">
            {LINKS.map((link) => {
              const active = isActive(link.path);
              return (
                <div key={link.title}>
                  <Link to={link.path}>
                    <li
                      className={`flex items-center ${isExpanded ? "w-[266px]" : "w-[100px]"} h-[77px] px-[20px] py-[25px] cursor-pointer flex-shrink-0
                                  z-30 transition-all duration-300 ease-in-out hover:bg-[#F0EFEE] ${active ? "bg-[#F0EFEE] border-l-[5px] border-[#000]" : ""}`}
                      onClick={handleItemClick}
                    >
                      <div className="flex items-center gap-4 w-full transition-all duration-300 ease-in-out">
                        <img src={link.icono} className="w-6 h-6 transition-all duration-300 ease-in-out" />
                        <span
                          className={`text-[17px] font-medium text-gray-800 transition-opacity duration-300 ease-in-out ${isExpanded ? "opacity-100 ml-1" : "opacity-0 ml-[-10px]"
                            }`}
                        >
                          {link.title}
                        </span>
                      </div>
                    </li>

                  </Link>
                </div>
              );
            })}
          </ul>
        )}
      </nav>
    </>
  );
};

export default EstudianteSidebar;