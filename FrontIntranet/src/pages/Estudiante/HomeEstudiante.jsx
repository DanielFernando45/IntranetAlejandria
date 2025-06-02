import LayoutApp from "../../layout/LayoutApp";
import portada from "../../assets/images/portada.png"
import flechaVer from "../../assets/icons/flechaMorada.svg"
import flechaAzul from "../../assets/icons/arrowAzul.svg"
import NoticiaUno from "../../assets/images/NoticiaAsesor.png"
import FeclaIzqui from "../../assets/icons/arrow-left.svg"
import FechaDerec from "../../assets/icons/arrow-right.svg"
import Descargas from "../../assets/icons/Descargas.svg"
import Zoom from "../../assets/images/zoom.svg"
import DocsAsesor from "../Estudiante/EntregasEnvio/EnvioAsesor"
import { useState, useEffect } from "react";

const NoticiasRecientes = [
  { imagen: NoticiaUno, texto: "Reunión de asesores el viernes a las 3 PM" },
  { imagen: NoticiaUno, texto: "Nueva guía sobre redacción de tesis disponible." },
  { imagen: NoticiaUno, texto: "Ebook para elaborar tu Marco Teorico" },
  { imagen: NoticiaUno, texto: "Ebook para elaborar tu Marco Teorico" },
  { imagen: NoticiaUno, texto: "Ebook para elaborar tu Marco Teorico" },
]


const HomeEstudiante = () => {
  
  const [selectedAsesoriaId, setSelectedAsesoriaId] = useState(null);

  useEffect(() => {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        const id = user.id;
  
        fetch(`http://localhost:3001/cliente/miAsesoramiento/${id}`)
          .then(res => res.json())
          .then(data => {
            const asesoriasArray = Object.values(data).map(item => ({
              id: item.id,
              profesion: item.profesion_asesoria
            }));

            if (asesoriasArray.length > 0) {
              const primeraAsesoriaId = asesoriasArray[0].id;
              setSelectedAsesoriaId(primeraAsesoriaId);
  
            }
          })
          .catch(error => console.error('Error al obtener asesorías:', error));
      }
    }, []);

  return (
    <LayoutApp>
      <main className="mx-1">

        {/*Portada */}
        <div className=" flex items-center flex-col  lg:flex-row justify-between bg-[#17162E] text-white rounded-2xl  w-full   shadow-lg   ">

          <div className="flex flex-col lg:w-2/3 p-4 lg:pl-14 pt-6">
            <p className="mn:text-[15px] text-[12px] lg:text-[22px] text-[#B5B5B5] ">12 de Febrero , 2025</p>
            <h2 className="lg:text-[38px] mn:text-[12px] text-[15px] font-semibold mt-2">
              Bienvenido Fernando Guzman al
              Intranet de asesoría de tesis
            </h2>
            <p className="lg:text-[22px] text-[12px] text-[#B5B5B5]  ">Aquí encontraras toda las herramientas que vas a utilizar</p>
          </div>

          <div className="flex lg:h-[280px] h-[100px]">
            
            <img
              src={portada}
              alt="Graduación"
              className="rounded-r-xl w-full h-full  object-cover"
            />
          </div>

        </div>

        {/*Noticias, Envios Asesor*/}
        <div className="flex justify-between">

          <div className="w-full flex flex-col gap-6">
            <section>
              <h2 className=" mb-5 text-2xl font-bold">Noticias Recientes</h2>
              <div className="flex justify-between w-full">
                <div className="flex items-center ">
                  <a className=" " href=""> <img src={FeclaIzqui} alt="" /></a>
                </div>
                <div className="flex justify-between gap-5">
                  {NoticiasRecientes.map((link) => {
                    return (
                      <div className=" bg-[#1C1C34] w-[192px] h-[204px] rounded-[10px]">
                        <img className="w-[192px] h-[115px]" src={link.imagen} alt="" />
                        <div className="m-4 gap-[13px]">
                          <p className="text-white  text-[12px]">{link.texto}</p>
                          <span className="flex justify-end gap-1 items-center">
                            <a className=" text-[#7373B4] text-[12px] " href="">ver</a>
                            <img src={flechaVer} alt="" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="flex items-center">
                  <a className=" w-6 h-6" href=""> <img src={FechaDerec} alt="" /></a>
                </div>

              </div>
            </section>

            <div>
              <DocsAsesor idAsesoramiento={selectedAsesoriaId}></DocsAsesor>
            </div>


          </div>

          <div className="ml-[84px] flex flex-col gap-5">

            <div className=" mt-5 flex justify-between ">
              <h2 className="text-2xl font-bold">Reuniones</h2>
              <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                <a href="">Ver todo</a>
                <img src={flechaAzul} alt="" />
              </span>
            </div>

            <div className="flex w-[310px] h-[150px] items-center ">
              <div className="flex flex-col justify-center items-center rounded-l-xl h-full w-[104px] bg-[#17162E] p-4 text-white">
                <p>Marzo</p>
                <h1 className="text-[30px]">2</h1>
                <p>12:00 PM</p>
              </div>
              <div className="flex flex-col   w-full h-full bg-white p-4 justify-between rounded-r-xl">
                <span className="flex flex-col gap-[6px]">
                  <p className="font-medium">Alumno</p>
                  <h1 className="text-[#666666]">Jose de la Fuente mancilla</h1>
                </span>
                <span className="flex justify-between">
                  <p className="font-medium">Enlace</p>
                  <img src={Zoom} alt="" />
                </span>

              </div>
            </div>

            <div className="flex w-[310px] h-[150px] items-center ">
              <div className="flex flex-col justify-center items-center rounded-l-xl h-full w-[104px] bg-[#054755] p-4 text-white">
                <p>Marzo</p>
                <h1 className="text-[30px]">2</h1>
                <p>12:00 PM</p>
              </div>
              <div className="flex flex-col   w-full h-full bg-white p-4 justify-between rounded-r-xl">
                <span className="flex flex-col gap-[6px]">
                  <p className="font-medium">Alumno</p>
                  <h1 className="text-[#666666]">Jose de la Fuente mancilla</h1>
                </span>
                <span className="flex justify-between">
                  <p className="font-medium">Enlace</p>
                  <img src={Zoom} alt="" />
                </span>

              </div>
            </div>

            <div className="flex w-[310px] h-[150px] items-center ">
              <div className="flex flex-col justify-center items-center rounded-l-xl h-full w-[104px] bg-[#0A8EAA] p-4 text-white">
                <p>Marzo</p>
                <h1 className="text-[30px]">2</h1>
                <p>12:00 PM</p>
              </div>
              <div className="flex flex-col   w-full h-full bg-white p-4 justify-between rounded-r-xl">
                <span className="flex flex-col gap-[6px]">
                  <p className="font-medium">Alumno</p>
                  <h1 className="text-[#666666]">Jose de la Fuente mancilla</h1>
                </span>
                <span className="flex justify-between">
                  <p className="font-medium">Enlace</p>
                  <img src={Zoom} alt="" />
                </span>

              </div>
            </div>

          </div>

        </div>



      </main>
    </LayoutApp>

  );
}

export default HomeEstudiante;