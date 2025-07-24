import LayoutApp from "../../layout/LayoutApp";
import portada from "../../assets/images/portadaMobile.png"
import portada2 from "../../assets/images/portada.png"
import flechaVer from "../../assets/icons/flechaMorada.svg"
import flechaAzul from "../../assets/icons/arrowAzul.svg"
import NoticiaUno from "../../assets/images/NoticiaAsesor.png"
import FeclaIzqui from "../../assets/icons/arrow-left.svg"
import FechaDerec from "../../assets/icons/arrow-right.svg"
import flechaCirculo from "../../assets/icons/arrow-left-circulo.svg";
import Zoom from "../../assets/icons/IconEstudiante/ZoomLink.svg";
import DocsAsesor from "../Estudiante/EntregasEnvio/EnvioAsesor"
import videoOff from "../../assets/icons/video-off.svg";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { asesoriasService } from "../../services/asesoriasService";
import { useSelector } from "react-redux";

const HomeEstudiante = () => {
  const [NoticiasRecientes, setNoticiasRecientes] = useState([]);
  const [selectedAsesoriaId, setSelectedAsesoriaId] = useState('');
  const [proximasReuniones, setProximasReuniones] = useState([]);
  const [verNoticias, setVerNoticias] = useState(null); // ahora guarda el objeto de la noticia seleccionada
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);
  const [loadingNoticias, setLoadingNoticias] = useState(true);

  const usuario = localStorage.getItem('user');
  const user = useSelector((state) => state.auth.user);
  const id = user.id;

  // Obtener asesorías del usuario
  const { data: asesorias, isLoading } = useQuery({
    queryKey: ['asesorias'],
    queryFn: () => asesoriasService.asesoriasPorEstudiante(id),
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (
      asesorias &&
      !asesorias.isEmpty &&
      !selectedAsesoriaId &&
      Array.isArray(Object.values(asesorias)) &&
      Object.values(asesorias).length > 0
    ) {
      const primeraAsesoria = Object.values(asesorias)[0];
      setSelectedAsesoriaId(primeraAsesoria.id);
    }
  }, [asesorias]);

  useEffect(() => {
    const fetchNoticias = async () => {
      try {
        setLoadingNoticias(true);
        const res = await fetch('http://localhost:3001/recursos/noticias/all');
        if (!res.ok) throw new Error('Error al obtener noticias');
        const data = await res.json();
        setNoticiasRecientes(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Error al obtener noticias recientes:', error);
      } finally {
        setLoadingNoticias(false);
      }
    };

    fetchNoticias();
  }, []);

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
      if (width >= 1912) setVisibleItems(7);
      else if (width >= 1636) setVisibleItems(6);
      else if (width >= 1536) setVisibleItems(5);
      else if (width >= 1440) setVisibleItems(5);
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
    const noticiaSeleccionada = NoticiasRecientes.find(noticia => noticia.id === id);
    setVerNoticias(noticiaSeleccionada);

  };

  // Función para navegar manualmente
  const navigate = (direction) => {
    if (NoticiasRecientes.length === 0) return;

    if (direction === 'prev') {
      setCurrentIndex(prev => (prev - 1 + NoticiasRecientes.length) % NoticiasRecientes.length);
    } else {
      setCurrentIndex(prev => (prev + 1) % NoticiasRecientes.length);
    }
  };

  // Función para obtener los elementos visibles con rotación circular
  const getVisibleNoticias = () => {
    if (NoticiasRecientes.length === 0) return [];

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
      day: date.getUTCDate(),
      time: date.toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'UTC'
      })
    };
  };

  if (isLoading || loadingNoticias) return <div role="status" className="max-w-sm animate-pulse">
    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
    <span className="sr-only">Loading...</span>
  </div>;

  const fecha = new Date();
  const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  const dia = fecha.getDate();
  const mes = meses[fecha.getMonth()];
  const año = fecha.getFullYear();

  const cliente = localStorage.getItem('user');
  const clienteNombre = JSON.parse(cliente);

  return (
    <LayoutApp>
      <main className="mx-1 sm:mx-8 ">

        {/*Portada */}
        <div className="xl:relative xl:justify-end flex items-center relative flex-col xl:flex-row  bg-[#17162E] text-white rounded-2xl  shadow-lg ">

          <div className="xl:absolute flex flex-col p-4 mn:p-9 lg:p-16 w-full md:h-full md:pt-7 lg:pt-14 xl:p-10 xl:px-[55px]">
            <p className="text-[12px] sm:text-[18px] md:text-[22px] lg:text-[35px] text-[#B5B5B5] xl:text-[20px] ">{dia} de {mes}, {año}</p>
            <div className="xl:w-[620px]">
              <h2 className="  text-[15px] sm:text-[25px] md:text-[30px] lg:text-[40px] xl:text-[30px] 1xl:text-[35px] font-semibold mt-2 md:mt-1 ">
                Bienvenido aso {clienteNombre.nombre} al Intranet de asesoría de tesis
              </h2>
            </div>

            <div className="absolute w-[140px] h-[85px] top-[1px] sm:top-[70px] lg:top-[150px] xl:top-[50px] sm:w-[200px] md:w-[250px] lg:w-[400px] xl:w-[630px] ">
              <p className="lg:text-[29px] text-[10px] sm:text-[15px] md:text-[20px] xl:text-[17px] 1xl:text-[20px]  text-[#B5B5B5] absolute top-[110px]  md:top-[110px] lg:top-[140px] ">
                Aquí encontraras toda la información para tu  asesoría de tesis
              </p>
            </div>

          </div>

          <img
            src={portada}
            alt="Graduación"
            className="rounded-b-xl w-full h-full  object-cover xl:hidden "
          />

          <div className="max-xl:hidden">
            <img
              src={portada2}
              alt="Graduación"
              className=" rounded-b-xl w-full h-full    "
            />
          </div>

        </div>

        {/*Noticias, Envios Asesor*/}
        <section className="max-xl:hidden xl:mt-5">
          <h2 className="mb-2 text-[12px] sm:text-[18px] lg:text-[30px] xl:text-[25px] font-semibold">Noticias Recientes</h2>

          <div className="flex justify-between w-full items-center">
            <button
              onClick={() => navigate('prev')}
              className="pr-2 hover:bg-[#1C1C34] rounded-full transition-colors 5xl:p-0"
              disabled={NoticiasRecientes.length === 0}
            >
              <img src={FeclaIzqui} alt="Anterior" className="w-6" />
            </button>

            <div className="flex overflow-hidden justify-center flex-1">
              {NoticiasRecientes.length > 0 ? (
                <div className="flex gap-4 xl:gap-9 1xl:gap-2 2xl:gap-8 3xl:gap-2 4xl:gap-5 5xl:gap-3 6xl:gap-2">
                  {getVisibleNoticias().map((noticia, index) => (
                    <div
                      key={`${noticia.id}-${index}`}
                      className="bg-[#1C1C34] w-[192px] lg:w-[230px] h-[204px] lg:h-[242px] rounded-[10px] overflow-hidden hover:scale-105 transition-transform duration-300 flex-shrink-0"
                    >
                      <img
                        className="w-full h-[115px] lg:h-[153px] object-cover"
                        src={noticia.imagen}
                        alt={`Noticia ${noticia.id}`}
                      />
                      <div className="m-4 gap-[13px]">
                        <p className="text-white text-[11px] lg:text-[13px] line-clamp-3">{noticia?.titulo || "Título no disponible"}</p>
                        <span className="flex justify-end gap-1 items-center mt-2">
                          <button
                            className="text-[#7373B4] text-[12px] lg:text-[14px] hover:text-white transition-colors"
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
              ) : (
                <div className="text-center py-10 text-gray-500">
                  No hay noticias disponibles
                </div>
              )}
            </div>

            <button
              onClick={() => navigate('next')}
              className="pl-2 hover:bg-[#1C1C34] rounded-full transition-colors 5xl:p-0"
              disabled={NoticiasRecientes.length === 0}
            >
              <img src={FechaDerec} alt="Siguiente" />
            </button>
          </div>
        </section>

        <div className="flex justify-between  flex-col mt-2 xl:flex-row ">

          <div className="w-full xl:w-auto flex flex-col gap-6 xl:pt-2 ">

            <section className="xl:hidden">
              <h2 className="mb-2 text-[12px] sm:text-[18px] lg:text-[30px] font-semibold">Noticias Recientes</h2>

              <div className="flex justify-between w-full items-center">
                <button
                  onClick={() => navigate('prev')}
                  className="p-2 hover:bg-[#1C1C34] rounded-full transition-colors"
                  disabled={NoticiasRecientes.length === 0}
                >
                  <img src={FeclaIzqui} alt="Anterior" className="w-6" />
                </button>

                <div className="flex overflow-hidden justify-center flex-1">
                  {NoticiasRecientes.length > 0 ? (
                    <div className="flex gap-4">
                      {getVisibleNoticias().map((noticia, index) => (
                        <div
                          key={`${noticia.id}-${index}`}
                          className="bg-[#1C1C34] w-[192px] lg:w-[230px] h-[204px] lg:h-[242px] rounded-[10px] overflow-hidden hover:scale-105 transition-transform duration-300 flex-shrink-0"
                        >
                          <img
                            className="w-full h-[115px] lg:h-[153px] object-cover"
                            src={noticia.imagen}
                            alt={`Noticia ${noticia.id}`}
                          />
                          <div className="m-4 gap-[13px]">
                            <p className="text-white text-[11px] lg:text-[13px] line-clamp-3">{noticia?.titulo || "Título no disponible"}</p>
                            <span className="flex justify-end gap-1 items-center mt-2">
                              <button
                                className="text-[#7373B4] text-[12px] lg:text-[14px] hover:text-white transition-colors"
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
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      No hay noticias disponibles
                    </div>
                  )}
                </div>

                <button
                  onClick={() => navigate('next')}
                  className="p-2 hover:bg-[#1C1C34] rounded-full transition-colors"
                  disabled={NoticiasRecientes.length === 0}
                >
                  <img src={FechaDerec} alt="Siguiente" />
                </button>
              </div>
            </section>

            <select
              onChange={handleChange}
              value={selectedAsesoriaId || ''}
              className='border rounded-t-md border-[#b4a6aa] text-[10px] sm:text-[13px] lg:text-[15px] text-center '
            >
              {asesorias.isEmpty ?
                <option value="" disabled>No hay asesorías disponibles</option>
                :
                Object.values(asesorias).map((asesoria, index) => (
                  <option key={index} value={asesoria.id}>
                    {asesoria.profesion_asesoria}
                  </option>
                ))
              }
            </select>

            <div className="xl:hidden">
              <div className="flex justify-between ">
                <h1 className="text-[12px] sm:text-[18px] lg:text-[30px] font-semibold">Envios Asesor</h1>
                <span className="text-[8px] sm:text-[11px] flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                  <a href=""></a>
                  <img src={flechaAzul} alt="" className="w-4" />
                </span>
              </div>
              <DocsAsesor
                key={selectedAsesoriaId}
                idAsesoramiento={selectedAsesoriaId}
              />
            </div>

            <div className="max-xl:hidden flex flex-col gap-5 xl:gap-2">
              <div className="flex justify-between ">
                <h2 className="text-[12px] sm:text-[18px] lg:text-[30px] xl:text-[20px] font-semibold">Reuniones</h2>
                <span className="text-[8px] sm:text-[11px] flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                  <a href=""></a>
                  <img src={flechaAzul} alt="" className="w-4" />
                </span>
              </div>
              <div className="flex flex-col gap-5 md:px-20 xl:px-0">
                <div className="flex flex-wrap justify-start gap-6 ">
                  {proximasReuniones.map((reunion, index) => {
                    const formattedDate = formatDate(reunion.fecha_reunion);
                    return (
                      <div key={index} className="flex flex-row w-full items-center xl:h-[150px]">
                        <div className={`flex flex-col justify-between items-center rounded-l-xl text-[10px] sm:text-[15px]
                        w-[100px] sm:w-[140px] h-[120px] sm:h-[180px] lg:h-[220px] xl:h-full bg-[#17162E] p-4 text-white`}>
                          <span className="flex flex-col items-center">
                            <p className="lg:text-[20px] xl:text-[15px] uppercase">{formattedDate.month}</p>
                            <h1 className="text-[16px] sm:text-[22px] lg:text-[30px]">{formattedDate.day}</h1>
                          </span>
                          <p className="text-[10px] lg:text-[18px] xl:text-[15px]">{formattedDate.time}</p>
                        </div>

                        <div className="flex flex-col justify-between w-[235px] h-full border border-[#AAA3A5] bg-[#FFFFFF] p-4 sm:p-6 rounded-r-xl">
                          <span className="flex flex-col gap-[6px]">
                            <p className="font-medium text-[10px] sm:text-[16px] lg:text-[25px] xl:text-[15px]">{reunion.titulo}</p>
                            <h1 className="text-[#666666] text-[10px] sm:text-[14px] lg:text-[20px] xl:text-[15px]">Codigo: {reunion.meetingId}</h1>
                          </span>
                          <div className="px-10 sm:px-24 xl:px-4">
                            <button className="flex w-full justify-between px-1 sm:px-5 lg:p-4 py-1 xl:py-[4px] items-center text-white rounded-2xl bg-[#1271ED]">
                              <a href={reunion.enlace_zoom} target="_blank" rel="noopener noreferrer">
                                <p className="font-medium"> Zoom</p>
                              </a>
                              <img src={Zoom} alt="Zoom" className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {proximasReuniones.length === 0 && (
                    <div className="flex justify-center mt-5">
                      <div className="flex flex-col border rounded-[12px] text-[12px] justify-center items-center w-[280px] sm:w-[370px] mn:w-[335px] lg:w-full xl:w-[375px] h-[120px] sm:h-[180px] lg:h-[220px] xl:h-[150px] 5xl:h-[150px] gap-5 text-[#82777A] shadow-[0px_4px_4px_4px_rgba(0,0,0,0.25)]">
                        <img src={videoOff} alt="" />
                        No hay reuniones programadas
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="xl:hidden flex flex-col gap-5">
            <div className="mt-5 flex justify-between">
              <h2 className="text-[12px] sm:text-[18px] lg:text-[30px] font-semibold">Reuniones</h2>
              <span className="text-[8px] sm:text-[11px] flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                <a href=""></a>
                <img src={flechaAzul} alt="" className="w-4" />
              </span>
            </div>

            <div className="flex flex-col gap-5 md:px-20 lg:px-1">
              {proximasReuniones.map((reunion, index) => {
                const formattedDate = formatDate(reunion.fecha_reunion);
                return (
                  <div key={index} className="flex flex-row w-full items-center justify-center rounded-r-xl">
                    <div className={`flex flex-col justify-between items-center rounded-l-xl text-[10px] sm:text-[15px]
                        w-[100px] sm:w-[140px] lg:w-[25%] h-[120px] sm:h-[180px] lg:h-[220px] bg-[#17162E] p-4 text-white`}>
                      <span className="flex flex-col items-center">
                        <p className="lg:text-[20px]">{formattedDate.month}</p>
                        <h1 className="text-[16px] sm:text-[22px] lg:text-[30px]">{formattedDate.day}</h1>
                      </span>
                      <p className="text-[10px] sm:text-[15px]">{formattedDate.time}</p>
                    </div>

                    <div className="flex flex-col justify-between w-[235px] lg:w-full h-[120px] sm:h-[180px] lg:h-[220px] border border-[#AAA3A5] bg-white p-4 rounded-r-xl">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium text-[10px] sm:text-[16px] lg:text-[25px]">{reunion.titulo}</p>
                        <h1 className="text-[#666666] text-[10px] sm:text-[14px] lg:text-[20px]">Codigo: {reunion.meetingId}</h1>
                      </span>
                      <div className="px-5 sm:px-8">
                        <button className="flex w-full justify-between px-5 lg:p-4 py-1 items-center text-white rounded-2xl bg-[#1271ED]">
                          <a href={reunion.enlace_zoom} target="_blank" rel="noopener noreferrer">
                            <p className="font-medium"> Zoom</p>
                          </a>
                          <img src={Zoom} alt="Zoom" className="w-6 h-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {proximasReuniones.length === 0 && (
                <div className="flex justify-center mt-5">
                  <div className="flex flex-col border rounded-[12px] text-[12px] justify-center items-center w-[280px] sm:w-[370px] mn:w-[335px] lg:w-full xl:w-[375px] h-[120px] sm:h-[180px] lg:h-[220px] xl:h-[150px] 5xl:h-[150px] gap-5 text-[#82777A] shadow-[0px_4px_4px_4px_rgba(0,0,0,0.25)]">
                    <img src={videoOff} alt="" />
                    No hay reuniones programadas
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="max-xl:hidden xl:w-[62%] 1xl:w-[68%] 2xl:w-[70%] 3xl:w-[72%] 4xl:w-[73%] 6xl:w-[75%]">
            <div className="flex justify-between">
              <h1 className="text-[12px] sm:text-[18px] lg:text-[30px] xl:text-[20px] font-semibold">Envios Asesor</h1>
              <span className="text-[8px] sm:text-[11px] flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                <a href=""></a>
                <img src={flechaAzul} alt="" className="w-4" />
              </span>
            </div>
            <DocsAsesor
              key={selectedAsesoriaId}
              idAsesoramiento={selectedAsesoriaId}
            />
          </div>
        </div>

        {verNoticias && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setVerNoticias(null)} // click en fondo cierra
          >
            <div
              className="relative flex flex-col overflow-hidden bg-white w-[600px] max-h-[90vh] shadow-[8px_8px_4px_0px_rgba(0,0,0,0.25)] rounded-[20px] mx-auto"
              onClick={(e) => e.stopPropagation()} // evita que clic dentro cierre el modal
            >
              <button
                onClick={() => setVerNoticias(null)}
                className="absolute left-2 top-2 z-10"
              >
                <img src={flechaCirculo} alt="Cerrar" />
              </button>
              <div className="overflow-y-auto">
                <img
                  src={verNoticias.imagen}
                  alt="Noticia"
                  className="w-full object-cover h-[250px]"
                />
                <div className="flex flex-col gap-4 p-4">
                  <h1 className="text-[24px] font-bold text-[#17162E]">{verNoticias.titulo}</h1>
                  <p className="text-[#333]">{verNoticias.descripcion}</p>
                </div>
              </div>
            </div>
          </div>
        )}




      </main>
    </LayoutApp>
  );
}

export default HomeEstudiante;