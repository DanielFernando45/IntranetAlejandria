import LayoutApp from "../../layout/LayoutApp";
import { useState } from "react";
import flechaAzul from "../../assets/icons/arrowAzul.svg"
import plus from "../../assets/icons/IconEstudiante/add.svg"
import Descargas from "../../assets/icons/Descargas.svg"
import EnvioArchivo from "../../Components/EnvioArchivos";

 const EntregaRevisionEst =() => {
  const [vista, setVista] = useState("terminados");
  const [showModal, setShowModal] = useState(false);

  return (
    <LayoutApp>
        <main className="flex flex-col gap-11 m-32 items-start">
          <div className="flex flex-col gap-[10px] ml-8   px-[40px] py-5 w-full h-[400px] bg-white rounded-[10px]">
            <div className="flex flex-col gap-[12px]">
              <div className=" mt-5 flex justify-between">
                  <h2 className="text-2xl font-bold">Asuntos</h2>
                  <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                    <a href="">Ver todo</a>
                    <img src={flechaAzul} alt="" />
                  </span>
              </div>
              <div className="flex w-full border-b-2 gap-3 border-black font-normal">
                <button
                  className={`px-3 rounded-t-[5px] w-[105px] ${
                    vista === "terminados" ? "bg-[#17162E] text-white" : ""
                  }`}
                  onClick={() => setVista("terminados")}
                >
                  Terminados
                </button>
                <button
                  className={`px-3 rounded-t-[5px] w-[105px] ${
                    vista === "pendientes" ? "bg-[#17162E] text-white" : ""
                  }`}
                  onClick={() => setVista("pendientes")}
                >
                  Pendientes
                </button>
              </div>
            </div>

            <span className="flex w-full justify-center">
              <button onClick={() => setShowModal(true)}>
                <img src={plus} alt="" />
              </button>
                  
            </span>        
            
            <div>
              {vista === "terminados" ?(
                  <div className="flex flex-col  ">
                       <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                          <div className="w-[300px] flex ">Observaciones de la introducción</div>
                                          <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                          <div className="w-[100px] flex justify-center">May 25,2025</div>
                                          <div className="w-[102px] flex justify-center">11:15 AM</div>
                                          <div className="rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Terminado </div>
                       </div> 
                       <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                          <div className="w-[300px] flex ">Observaciones de la introducción</div>
                                          <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                          <div className="w-[100px] flex justify-center">May 25,2025</div>
                                          <div className="w-[102px] flex justify-center">11:15 AM</div>
                                          <div className="rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Terminado </div>
                       </div> 
                       <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                          <div className="w-[300px] flex ">Observaciones de la introducción</div>
                                          <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                          <div className="w-[100px] flex justify-center">May 25,2025</div>
                                          <div className="w-[102px] flex justify-center">11:15 AM</div>
                                          <div className="rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Terminado </div>
                       </div> 
                       <div className="flex justify-between text-[#2B2829] font-normal  p-[6px] rounded-md">
                                          <div className="w-[300px] flex ">Observaciones de la introducción</div>
                                          <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                          <div className="w-[100px] flex justify-center">May 25,2025</div>
                                          <div className="w-[102px] flex justify-center">11:15 AM</div>
                                          <div className="rounded-md px-3 bg-[#353563] flex justify-center text-white"> Terminado </div>
                       </div> 
                       <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                          <div className="w-[300px] flex ">Observaciones de la introducción</div>
                                          <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                          <div className="w-[100px] flex justify-center">May 25,2025</div>
                                          <div className="w-[102px] flex justify-center">11:15 AM</div>
                                          <div className="rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Terminado </div>
                       </div> 
                       
                                                         
                  </div>
              ):(
                <div>

                </div>
              )}
            </div>


          </div>





          <div className="flex flex-col gap-[10px] ml-8   p-[20px] w-full h-[300px] bg-white rounded-[10px]">

              <div className="flex justify-between  border-b-2 border-black">
                  <h2 className="text-2xl font-bold">Documentos</h2>
                  <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                    <a href="">Ver todo</a>
                    <img src={flechaAzul} alt="" />
                  </span>
              </div>

              <div className="flex flex-col  ">
                       <div className="flex justify-between text-[#495D72] font-medium   p-[6px] rounded-md">
                                          <div className="w-[300px] flex ">Titulo</div>
                                          <div className="w-[250px] flex justify-center">Descripcion</div>
                                          <div className="w-[100px] flex justify-center">Fecha</div>
                                          <div className="w-[102px] flex justify-center">Time</div>
                                          <div className="w-[65px] rounded-md px-3   flex justify-center "> Descargas </div>
                       </div> 
                       <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                          <div className="w-[300px] flex ">Observaciones de la introducción</div>
                                          <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                          <div className="w-[100px] flex justify-center">May 25,2025</div>
                                          <div className="w-[102px] flex justify-center">11:15 AM</div>
                                          <div className="w-[65px] rounded-md px-3  flex justify-center "> <img className="w-[15px]" src={Descargas}></img> </div>
                       </div> 
                       <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                          <div className="w-[300px] flex ">Observaciones de la introducción</div>
                                          <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                          <div className="w-[100px] flex justify-center">May 25,2025</div>
                                          <div className="w-[102px] flex justify-center">11:15 AM</div>
                                          <div className="w-[65px] rounded-md px-3  flex justify-center "> <img className="w-[15px]" src={Descargas}></img> </div>
                       </div> 
                       <div className="flex justify-between text-[#2B2829] font-normal  p-[6px] rounded-md">
                                          <div className="w-[300px] flex ">Observaciones de la introducción</div>
                                          <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                          <div className="w-[100px] flex justify-center">May 25,2025</div>
                                          <div className="w-[102px] flex justify-center">11:15 AM</div>
                                          <div className="w-[65px] rounded-md px-3  flex justify-center "> <img className="w-[15px]" src={Descargas}></img> </div>
                       </div> 
                       <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                          <div className="w-[300px] flex ">Observaciones de la introducción</div>
                                          <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                          <div className="w-[100px] flex justify-center">May 25,2025</div>
                                          <div className="w-[102px] flex justify-center">11:15 AM</div>
                                          <div className="w-[65px] rounded-md px-3  flex justify-center "> <img className="w-[15px]" src={Descargas}></img> </div>
                       </div> 
                       <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                          <div className="w-[300px] flex ">Observaciones de la introducción</div>
                                          <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                          <div className="w-[100px] flex justify-center">May 25,2025</div>
                                          <div className="w-[102px] flex justify-center">11:15 AM</div>
                                          <div className="w-[65px] rounded-md px-3  flex justify-center "> <img className="w-[15px]" src={Descargas}></img> </div>
                       </div> 
                       
                                                         
              </div>


          </div>


          <EnvioArchivo show={showModal} onClose={() => setShowModal(false)} />
        </main>
    </LayoutApp>

  )

}
export default EntregaRevisionEst;