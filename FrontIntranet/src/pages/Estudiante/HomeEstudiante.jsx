import LayoutApp from "../../layout/LayoutApp";
import portada from "../../assets/images/portada.png"
import flechaVer from "../../assets/icons/flechaMorada.svg"
import flechaAzul from "../../assets/icons/arrowAzul.svg"
import NoticiaUno from "../../assets/images/NoticiaAsesor.png"
import FeclaIzqui from "../../assets/icons/arrow-left.svg"
import FechaDerec from "../../assets/icons/arrow-right.svg"
import Descargas from "../../assets/icons/Descargas.svg"
import Zoom from "../../assets/images/zoom.svg"


const NoticiasRecientes=[
  {imagen:NoticiaUno,texto:"Reunión de asesores el viernes a las 3 PM"},
  {imagen:NoticiaUno,texto:"Nueva guía sobre redacción de tesis disponible."},
  {imagen:NoticiaUno,texto:"Ebook para elaborar tu Marco Teorico"},
]


const HomeEstudiante =() =>{
return(
    <LayoutApp>
        <main className="ml-32">
          <div className=" flex items-center justify-between bg-[#17162E] text-white rounded-2xl  w-full max-w-7xl  shadow-lg mt-24  ">
        
              <div className="flex flex-col w-2/3 pl-14 ">
                <p className="text-sm text-gray-300">12 de Febrero , 2025</p>
                  <h2 className="text-2xl font-bold mt-2">
                    Bienvenido <span className="text-white">Invitado</span> al <br />
                    <span className="text-blue-300">Intranet de asesoría de tesis</span>
                  </h2>
                  
              </div>

              <div className="h-[125px]">
                <img
                  src={portada}
                  alt="Graduación"
                  className="rounded-r-xl w-full h-full object-cover"
                />
              </div>   

          </div>

          <div className="flex mt-6">
            <div className="flex flex-col">
              <section>
                <h2 className=" mb-5 text-2xl font-bold">Noticias Recientes</h2>
                <div className="flex items-center">
                    <a className="w-6 h-6" href=""> <img src={FeclaIzqui} alt="" /></a>  
                    <div className="flex gap-[33px]">
                      {NoticiasRecientes.map((link)=>{
                        return (
                          <div className="bg-[#1C1C34] w-[192px] h-[204px] rounded-[10px]">
                            <img className="w-[192px] h-[115px]" src={link.imagen} alt="" />
                            <div className="m-4 gap-[13px]">
                              <p className="text-white  text-[12px]">{link.texto}</p>
                              <span className="flex justify-end gap-1 items-center">
                                <a className="text-[#7373B4] text-[12px] " href="">ver</a>
                                <img src={flechaVer} alt="" />
                              </span>                            
                            </div>              
                          </div>
                        );
                      })}
                    </div>
                    <a className="w-6 h-6" href=""> <img src={FechaDerec} alt="" /></a>
                </div>
              </section>

              <section>
                      <div className=" mt-5 flex justify-between">
                        <h2 className="text-2xl font-bold">Envíos del Asesor</h2>
                        <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                          <a href="">Ver todo</a>
                          <img src={flechaAzul} alt="" />
                        </span>
                      </div>  
                    
                    <div className="flex flex-col mt-3 gap-[6px]">
                      <div className="flex gap-1 text-[#495D72] font-semibold">
                        <div className="w-[300px] flex justify-center"><h1>Titulo</h1></div>
                        <div className="w-[250px] flex justify-center"><h1>Descripcion</h1></div>
                        <div className="w-[100px] flex justify-center"> <h1>Fecha</h1></div>
                        <div className="w-[102px] flex justify-center"><h1>Time</h1></div>
                        <div className="w-[83px]  flex justify-center"> <h1>Descargar</h1></div>
                      </div> 
                      <div className="flex gap-1 text-[#2B2829] font-normal bg-[#E9E7E7] m-1">
                        <div className="w-[300px] flex justify-center"><h1>Observaciones de la introducción</h1></div>
                        <div className="w-[250px] flex justify-center"><h1>Se envía las observaciones</h1></div>
                        <div className="w-[100px] flex justify-center"><h1>May 25,2025</h1></div>
                        <div className="w-[102px] flex justify-center"><h1>11:15 AM</h1></div>
                        <div className="w-[83px] flex justify-center"> <img className="" src={Descargas} alt="" /></div>
                      </div> 
                      <div className="flex gap-1 text-[#2B2829] font-normal m-1">
                        <div className="w-[300px] flex justify-center"><h1>Observaciones de la introducción</h1></div>
                        <div className="w-[250px] flex justify-center"><h1>Se envía las observaciones</h1></div>
                        <div className="w-[100px] flex justify-center"><h1>May 25,2025</h1></div>
                        <div className="w-[102px] flex justify-center"><h1>11:15 AM</h1></div>
                        <div className="w-[83px] flex justify-center"> <img className="" src={Descargas} alt="" /></div>
                      </div> 
                      <div className="flex gap-1 text-[#2B2829] font-normal bg-[#E9E7E7] m-1">
                        <div className="w-[300px] flex justify-center"><h1>Observaciones de la introducción</h1></div>
                        <div className="w-[250px] flex justify-center"><h1>Se envía las observaciones</h1></div>
                        <div className="w-[100px] flex justify-center"><h1>May 25,2025</h1></div>
                        <div className="w-[102px] flex justify-center"><h1>11:15 AM</h1></div>
                        <div className="w-[83px] flex justify-center"> <img className="" src={Descargas} alt="" /></div>
                      </div> 
                      <div className="flex gap-1 text-[#2B2829] font-normal m-1" >
                        <div className="w-[300px] flex justify-center"><h1>Observaciones de la introducción</h1></div>
                        <div className="w-[250px] flex justify-center"><h1>Se envía las observaciones</h1></div>
                        <div className="w-[100px] flex justify-center"><h1>May 25,2025</h1></div>
                        <div className="w-[102px] flex justify-center"><h1>11:15 AM</h1></div>
                        <div className="w-[83px] flex justify-center"> <img className="" src={Descargas} alt="" /></div>
                      </div> 
                      <div className="flex gap-1 text-[#2B2829] font-normal bg-[#E9E7E7] m-1">
                        <div className="w-[300px] flex justify-center"><h1>Observaciones de la introducción</h1></div>
                        <div className="w-[250px] flex justify-center"><h1>Se envía las observaciones</h1></div>
                        <div className="w-[100px] flex justify-center"><h1>May 25,2025</h1></div>
                        <div className="w-[102px] flex justify-center"><h1>11:15 AM</h1></div>
                        <div className="w-[83px] flex justify-center"> <img className="" src={Descargas} alt="" /></div>
                      </div> 
                      <div className="flex gap-1 text-[#2B2829] font-normal m-1">
                        <div className="w-[300px] flex justify-center"><h1>Observaciones de la introducción</h1></div>
                        <div className="w-[250px] flex justify-center"><h1>Se envía las observaciones</h1></div>
                        <div className="w-[100px] flex justify-center"><h1>May 25,2025</h1></div>
                        <div className="w-[102px] flex justify-center"><h1>11:15 AM</h1></div>
                        <div className="w-[83px] flex justify-center"> <img className="" src={Descargas} alt="" /></div>
                      </div> 
                      <div className="flex gap-1 text-[#2B2829] font-normal bg-[#E9E7E7] m-1">
                        <div className="w-[300px] flex justify-center"><h1>Observaciones de la introducción</h1></div>
                        <div className="w-[250px] flex justify-center"><h1>Se envía las observaciones</h1></div>
                        <div className="w-[100px] flex justify-center"><h1>May 25,2025</h1></div>
                        <div className="w-[102px] flex justify-center"><h1>11:15 AM</h1></div>
                        <div className="w-[83px] flex justify-center"> <img className="" src={Descargas} alt="" /></div>
                      </div> 
                    </div>
                      
                     


              </section>
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