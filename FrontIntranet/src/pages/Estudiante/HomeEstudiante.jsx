
import LayoutApp from "../../layout/LayoutApp";
import portada from "../../assets/images/portadaMobile.png"
import flechaVer from "../../assets/icons/flechaMorada.svg"
import flechaAzul from "../../assets/icons/arrowAzul.svg"
import NoticiaUno from "../../assets/images/NoticiaAsesor.png"
import FeclaIzqui from "../../assets/icons/arrow-left.svg"
import FechaDerec from "../../assets/icons/arrow-right.svg"
import Zoom from "../../assets/icons/IconEstudiante/ZoomLink.svg";
import DocsAsesor from "../Estudiante/EntregasEnvio/EnvioAsesor"
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { asesoriasService } from "../../services/asesoriasService";
import { useSelector } from "react-redux";

const NoticiasRecientes = [
  { id: 1, imagen: NoticiaUno, texto: "Reunión de asesores el viernes a las 3 PM" },
  { id: 2, imagen: NoticiaUno, texto: "Nueva guía sobre redacción de tesis disponible." },
  { id: 3, imagen: NoticiaUno, texto: "Ebook para elaborar tu Marco Teorico" },
  { id: 4, imagen: NoticiaUno, texto: "Taller de metodología de investigación" },
  { id: 5, imagen: NoticiaUno, texto: "Convocatoria para presentación de avances" },
  { id: 6, imagen: NoticiaUno, texto: "Seminario de redacción académica" },
];

const HomeEstudiante = () => {
  // const [asesorias, setAsesorias] = useState([]);
  const [selectedAsesoriaId, setSelectedAsesoriaId] = useState('');
  const [proximasReuniones, setProximasReuniones] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  // const usuario = localStorage.getItem('user');
  const user = useSelector((state) => state.auth.user);
  const id = user.id;

  // Obtener asesorías del usuario
  const { data: asesorias, isLoading, isError, error, ref } = useQuery({
    queryKey: ['asesorias'],
    queryFn: () => asesoriasService.asesoriasPorEstudiante(id),
    refetchOnWindowFocus: false,
  });

  console.log("Asesorias", asesorias);

  useEffect(() => {
    if (selectedAsesoriaId) {
      fetch(`http://localhost:3001/reuniones/espera/${selectedAsesoriaId}`)
        .then(res => res.json())
        .then(data => {
          setProximasReuniones(data);
        })
        .catch(error => console.error('Error al obtener reuniones próximas:', error));
    }
  }, [selectedAsesoriaId])

  const handleChange = (e) => {
    const asesoriaId = e.target.value;
    setSelectedAsesoriaId(asesoriaId);
  }
  // Ajustar elementos visibles según el tamaño de pantalla
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width >= 1920) setVisibleItems(6);
      else if (width >= 1536) setVisibleItems(5);
      else if (width >= 1280) setVisibleItems(4);
      else if (width >= 900) setVisibleItems(3);
      else if (width >= 600) setVisibleItems(2);
      else setVisibleItems(1);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Función para manejar el click en ver noticia
  const handleVerNoticia = (id) => {
    console.log(`Ver noticia con ID: ${id}`);
    // Aquí puedes implementar la navegación o mostrar un modal
  };

  // Función para navegar manualmente
  const navigate = (direction) => {
    if (direction === 'prev') {
      setCurrentIndex(prev => (prev - 1 + NoticiasRecientes.length) % NoticiasRecientes.length);
    } else {
      setCurrentIndex(prev => (prev + 1) % NoticiasRecientes.length);
    }
  };

  // Función para obtener los elementos visibles con rotación circular
  const getVisibleNoticias = () => {
    const items = [];
    for (let i = 0; i < visibleItems; i++) {
      const index = (currentIndex + i) % NoticiasRecientes.length;
      items.push(NoticiasRecientes[index]);
    }
    return items;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: 'long' };
    return {
      month: new Intl.DateTimeFormat('es-ES', options).format(date),
      day: date.getUTCDate(),  // Usar getUTCDate para mantener consistencia
      time: date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'  // Forzar a usar UTC para la hora
      })
    };
  };

  if (isLoading) return <div role="status" className="max-w-sm animate-pulse">
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
  </div>;
  return (
    <LayoutApp>
      <main className="mx-1 sm:mx-8">

        {/*Portada */}
        <div className=" flex items-center relative flex-col  bg-[#17162E] text-white rounded-2xl  shadow-lg ">

          <div className="flex flex-col p-4 mn:p-9 w-full md:h-full md:pt-5">
            <p className="text-[12px] sm:text-[18px] lg:text-[22px] text-[#B5B5B5] ">12 de Febrero , 2025</p>
            <h2 className="lg:text-[38px]  text-[15px] sm:text-[25px] font-semibold mt-2 md:mt-1 ">
              Bienvenido Fernando Guzman al Intranet de asesoría de tesis
            </h2>
            <div className="absolute w-[140px] h-[85px] top-[1px] sm:top-[70px] sm:w-[200px]">
              <p className="lg:text-[22px] text-[10px] sm:text-[15px] text-[#B5B5B5] absolute top-[110px]  md:top-[70px] ">
                Aquí encontraras toda la información para tu  asesoría de tesis
              </p>
            </div>

          </div>

          <img
            src={portada}
            alt="Graduación"
            className="rounded-b-xl w-full h-full  object-cover  "
          />

        </div>

        {/*Noticias, Envios Asesor*/}
        <div className="flex justify-between md:flex-row flex-col mt-2">

          <div className="w-full flex flex-col gap-6">

            <section>
              <h2 className="mb-2 text-[12px] sm:text-[18px] font-semibold">Noticias Recientes</h2>

              <div className="flex justify-between w-full items-center">
                <button
                  onClick={() => navigate('prev')}
                  className="p-2 hover:bg-[#1C1C34] rounded-full transition-colors"
                >
                  <img src={FeclaIzqui} alt="Anterior" />
                </button>

                <div className="flex overflow-hidden justify-center flex-1">
                  <div className="flex gap-4">
                    {getVisibleNoticias().map((noticia, index) => (
                      <div
                        key={`${noticia.id}-${index}`}
                        className="bg-[#1C1C34] w-[192px] h-[204px] rounded-[10px] overflow-hidden hover:scale-105 transition-transform duration-300 flex-shrink-0"
                      >
                        <img
                          className="w-full h-[115px] object-cover"
                          src={noticia.imagen}
                          alt={`Noticia ${noticia.id}`}
                        />
                        <div className="m-4 gap-[13px]">
                          <p className="text-white text-[11px] line-clamp-3">{noticia.texto}</p>
                          <span className="flex justify-end gap-1 items-center mt-2">
                            <button
                              className="text-[#7373B4] text-[12px] hover:text-white transition-colors"
                              onClick={() => handleVerNoticia(noticia.id)}
                            >
                              ver
                            </button>
                            <img src={flechaVer} alt="Ver noticia" className="w-3 h-3" />
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigate('next')}
                  className="p-2 hover:bg-[#1C1C34] rounded-full transition-colors"
                >
                  <img src={FechaDerec} alt="Siguiente" />
                </button>
              </div>
            </section>

            <select
              onChange={handleChange}
              value={selectedAsesoriaId || ''}
              className='border rounded-t-md border-[#b4a6aa] text-[10px] sm:text-[13px] text-center '
            >
              <option value="">Servicios</option>
              {
                asesorias.isEmpty ?
                  <option value="" disabled>No hay asesorías disponibles</option>
                  :
                  Object.values(asesorias).map((asesoria, index) => (
                    <option key={index} value={asesoria.id}>
                      {asesoria.profesion_asesoria}
                    </option>
                  ))
              }

            </select>

            <div>
              <div className="flex justify-between">
                <h1 className="text-[12px] sm:text-[18px] font-semibold">Envios Asesor</h1>
                <span className="text-[8px] sm:text-[11px] flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                  <a href="">Ver todo</a>
                  <img src={flechaAzul} alt="" className="w-4" />
                </span>
              </div>
              <DocsAsesor
                key={selectedAsesoriaId}
                idAsesoramiento={selectedAsesoriaId}
              />
            </div>

          </div>

          <div className=" flex flex-col gap-5">

            <div className=" mt-5 flex justify-between ">
              <h2 className="text-[12px] sm:text-[18px] font-bold">Reuniones</h2>
              <span className="text-[8px] sm:text-[11px] flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                <a href="">Ver todo</a>
                <img src={flechaAzul} alt="" className="w-4" />
              </span>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex flex-wrap justify-start gap-6">
                {proximasReuniones.map((reunion, index) => {
                  const formattedDate = formatDate(reunion.fecha_reunion);
                  return (
                    <div key={index} className="flex  flex-row w-full   items-center ">

                      <div className={`flex flex-col justify-between items-center rounded-l-xl text-[10px] sm:text-[15px]
                        w-[100px] sm:w-[140px]  h-[120px] sm:h-[180px]  bg-[#17162E] p-4 text-white`}
                      >
                        <span className="flex flex-col items-center">
                          <p>{formattedDate.month}</p>
                          <h1 className="text-[16px] sm:text-[22px]">{formattedDate.day}</h1>
                        </span>

                        <p className="text-[10px]">{formattedDate.time}</p>
                      </div>
                      <div className="flex flex-col justify-between w-full h-full border border-[#AAA3A5] bg-[#FFFFFF] p-4 sm:p-6
                           rounded-r-xl">
                        <span className="flex flex-col gap-[6px]">
                          <p className="font-medium text-[10px] sm:text-[16px]">{reunion.titulo}</p>
                          <h1 className="text-[#666666] text-[10px] sm:text-[14px]">Codigo: {reunion.meetingId}</h1>
                        </span>
                        <div className=" pr-8">
                          <button className="flex w-full justify-between px-5 py-1 items-center text-white rounded-2xl bg-[#1271ED]">
                            <a href={reunion.enlace_zoom} target="_blank">
                              <p className="font-medium"> Zoom</p>
                            </a>
                            <img src={Zoom} alt="Zoom" className="w-6 h-6" />
                          </button>

                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>


            <video controls width="600">
              <source src={'https://f004.backblazeb2.com/file/IntranetAlejandria/seminarios/1752009785811-clase-de-ramos.mp4?Authorization=3_20250708214008_3cac7e2fb113747277f9fd06_1dca5d8a9dd38c3f0e7c1432ca40ab7ec1f75478_004_20250708224008_0043_dnld'} type="video/mp4" />
              Tu navegador no soporta el tag de video.
            </video>
          </div>

        </div>



      </main>
    </LayoutApp>

  );
}

export default HomeEstudiante;