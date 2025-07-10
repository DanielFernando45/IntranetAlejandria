
import LayoutApp from "../../layout/LayoutApp";
import portada from "../../assets/images/portadaMobile.png"
import portada2 from "../../assets/images/portada.png"
import flechaVer from "../../assets/icons/flechaMorada.svg"
import flechaAzul from "../../assets/icons/arrowAzul.svg"
import NoticiaUno from "../../assets/images/NoticiaAsesor.png"
import FeclaIzqui from "../../assets/icons/arrow-left.svg"
import FechaDerec from "../../assets/icons/arrow-right.svg"
import Zoom from "../../assets/icons/IconEstudiante/ZoomLink.svg";
import DocsAsesor from "../Estudiante/EntregasEnvio/EnvioAsesor"
import { useState, useEffect } from "react";

const NoticiasRecientes = [
  { id: 1, imagen: NoticiaUno, texto: "Reunión de asesores el viernes a las 3 PM" },
  { id: 2, imagen: NoticiaUno, texto: "Nueva guía sobre redacción de tesis disponible." },
  { id: 3, imagen: NoticiaUno, texto: "Ebook para elaborar tu Marco Teorico" },
  { id: 4, imagen: NoticiaUno, texto: "Taller de metodología de investigación" },
  { id: 5, imagen: NoticiaUno, texto: "Convocatoria para presentación de avances" },
  { id: 6, imagen: NoticiaUno, texto: "Seminario de redacción académica" },
];

const HomeEstudiante = () => {
  const [asesorias, setAsesorias] = useState([]);
  const [selectedAsesoriaId, setSelectedAsesoriaId] = useState('');
  const [proximasReuniones, setProximasReuniones] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(1);

  // Obtener asesorías del usuario
  useEffect(() => {
    const usuario = localStorage.getItem('user');
    if (usuario) {
      const user = JSON.parse(usuario);
      const id = user.id;

      fetch(`http://localhost:3001/cliente/miAsesoramiento/${id}`)
        .then(res => res.json())
        .then(data => {
          const asesoriasArray = Object.values(data).map(item => ({
            id: item.id,
            profesion: item.profesion_asesoria
          }));
          setAsesorias(asesoriasArray);

          if (asesoriasArray.length > 0) {
            const primeraAsesoriaId = asesoriasArray[0].id;
            setSelectedAsesoriaId(primeraAsesoriaId);
          }
        })
        .catch(error => console.error('Error al obtener asesorías:', error));
    }
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

  return (
    <LayoutApp>
      <main className="mx-1 sm:mx-8 ">

        {/*Portada */}
        <div className="xl:relative xl:justify-end flex items-center relative flex-col xl:flex-row  bg-[#17162E] text-white rounded-2xl  shadow-lg ">

          <div className="xl:absolute flex flex-col p-4 mn:p-9 lg:p-16 w-full md:h-full md:pt-7 lg:pt-14 xl:p-10 xl:px-[55px]">
            <p className="text-[12px] sm:text-[18px] md:text-[22px] lg:text-[35px] text-[#B5B5B5] xl:text-[20px] ">12 de Febrero , 2025</p>
            <div className="xl:w-[620px]">
              <h2 className="  text-[15px] sm:text-[25px] md:text-[30px] lg:text-[40px] xl:text-[30px] 1xl:text-[35px] font-semibold mt-2 md:mt-1 ">
              Bienvenido Fernando Guzman al Intranet de asesoría de tesis
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
              className="p-2 hover:bg-[#1C1C34] rounded-full transition-colors 5xl:p-0"
            >
              <img src={FeclaIzqui} alt="Anterior" className="w-6" />
            </button>

            <div className="flex overflow-hidden justify-center flex-1">
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
                      <p className="text-white text-[11px] lg:text-[13px] line-clamp-3">{noticia.texto}</p>
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
            </div>

            <button
              onClick={() => navigate('next')}
              className="p-2 hover:bg-[#1C1C34] rounded-full transition-colors 5xl:p-0"
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
                >
                  <img src={FeclaIzqui} alt="Anterior" className="w-6" />
                </button>

                <div className="flex overflow-hidden justify-center flex-1">
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
                          <p className="text-white text-[11px] lg:text-[13px] line-clamp-3">{noticia.texto}</p>
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
              className='border rounded-t-md border-[#b4a6aa] text-[10px] sm:text-[13px] lg:text-[15px] text-center '
            >
              {asesorias.map((asesoria, index) => (
                <option className="border rounded-b-md border-[#b4a6aa] " key={index} value={asesoria.id}>{asesoria.profesion}</option>
              ))}
            </select>

            <div className="xl:hidden">
              <div className="flex justify-between ">
                <h1 className="text-[12px] sm:text-[18px] lg:text-[30px] font-semibold">Envios Asesor</h1>
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

            <div className="flex flex-col gap-5 xl:gap-2">

              <div className=" mt-5  flex justify-between ">
                <h2 className="text-[12px] sm:text-[18px] lg:text-[30px] xl:text-[20px] font-semibold">Reuniones</h2>
                <span className="text-[8px] sm:text-[11px] flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                  <a href="">Ver todo</a>
                  <img src={flechaAzul} alt="" className="w-4" />
                </span>
              </div>
              <div className="max-xl:hidden  flex flex-col gap-5 md:px-20 xl:px-0">
                <div className="flex flex-wrap justify-start gap-6 ">
                  {proximasReuniones.map((reunion, index) => {
                    const formattedDate = formatDate(reunion.fecha_reunion);
                    return (
                      <div key={index} className="flex  flex-row w-full   items-center xl:h-[150px] ">

                        <div className={`flex flex-col justify-between items-center rounded-l-xl text-[10px] sm:text-[15px]
                        w-[100px] sm:w-[140px]  h-[120px] sm:h-[180px] lg:h-[220px] xl:h-full  bg-[#17162E] p-4 text-white`}
                        >
                          <span className="flex flex-col items-center">
                            <p className="lg:text-[20px] xl:text-[15px] uppercase">{formattedDate.month}</p>
                            <h1 className="text-[16px] sm:text-[22px] lg:text-[30px]">{formattedDate.day}</h1>
                          </span>

                          <p className="text-[10px] lg:text-[18px] xl:text-[15px]">{formattedDate.time}</p>
                        </div>

                        <div className="flex flex-col justify-between w-full h-full border border-[#AAA3A5] bg-[#FFFFFF] p-4 sm:p-6
                           rounded-r-xl">
                          <span className="flex flex-col gap-[6px]">
                            <p className="font-medium text-[10px] sm:text-[16px] lg:text-[25px] xl:text-[20px]">{reunion.titulo}</p>
                            <h1 className="text-[#666666] text-[10px] sm:text-[14px] lg:text-[20px] xl:text-[15px]">Codigo: {reunion.meetingId}</h1>
                          </span>
                          <div className="px-10 sm:px-24 xl:px-4">
                            <button className="flex w-full justify-between px-1 sm:px-5 lg:p-4 py-1 xl:py-[4px] items-center text-white rounded-2xl bg-[#1271ED]">
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

            </div>

          </div>

          <div className="xl:hidden flex flex-col gap-5">

            <div className=" mt-5 flex justify-between ">
              <h2 className="text-[12px] sm:text-[18px] lg:text-[30px] font-semibold">Reuniones</h2>
              <span className="text-[8px] sm:text-[11px] flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                <a href="">Ver todo</a>
                <img src={flechaAzul} alt="" className="w-4" />
              </span>
            </div>

            <div className="flex flex-col gap-5 md:px-20">
              <div className="flex flex-wrap justify-start gap-6">
                {proximasReuniones.map((reunion, index) => {
                  const formattedDate = formatDate(reunion.fecha_reunion);
                  return (
                    <div key={index} className="flex  flex-row w-full   items-center ">

                      <div className={`flex flex-col justify-between items-center rounded-l-xl text-[10px] sm:text-[15px]
                        w-[100px] sm:w-[140px]  h-[120px] sm:h-[180px] lg:h-[220px]  bg-[#17162E] p-4 text-white`}
                      >
                        <span className="flex flex-col items-center">
                          <p className="lg:text-[20px]">{formattedDate.month}</p>
                          <h1 className="text-[16px] sm:text-[22px] lg:text-[30px]">{formattedDate.day}</h1>
                        </span>

                        <p className="text-[10px] lg:text-[18px]">{formattedDate.time}</p>
                      </div>

                      <div className="flex flex-col justify-between w-full h-full border border-[#AAA3A5] bg-[#FFFFFF] p-4 sm:p-6
                           rounded-r-xl">
                        <span className="flex flex-col gap-[6px]">
                          <p className="font-medium text-[10px] sm:text-[16px] lg:text-[25px]">{reunion.titulo}</p>
                          <h1 className="text-[#666666] text-[10px] sm:text-[14px] lg:text-[20px]">Codigo: {reunion.meetingId}</h1>
                        </span>
                        <div className="px-10 sm:px-24">
                          <button className="flex w-full justify-between px-1 sm:px-5 lg:p-4 py-1 items-center text-white rounded-2xl bg-[#1271ED]">
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


          </div>

          <div className="max-xl:hidden xl:w-[67%] 1xl:w-[72%] 2xl:w-[74%] 4xl:w-[76%] 5xl:w-[78%]">
            <div className="flex justify-between">
              <h1 className="text-[12px] sm:text-[18px] lg:text-[30px] xl:text-[20px] font-semibold">Envios Asesor</h1>
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



      </main>
    </LayoutApp>

  );
}

export default HomeEstudiante;