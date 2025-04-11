import LayoutApp from "../../layout/LayoutApp";
import portada from "../../assets/images/PortadaAsesor.png"
import flechaAzul from "../../assets/icons/arrowAzul.svg"
import Zoom from "../../assets/images/zoom.svg"

const HomeAsesor = () => {
return(
    <LayoutApp>
        <main className="ml-32 mr-8">
                    
                {/*Portada */}
                  <div className=" flex items-center justify-between bg-[#17162E] text-white rounded-2xl  w-full   shadow-lg mt-24  ">
                
                      <div className="flex flex-col w-2/3 pl-14 ">
                        <p className="text-[22px] text-[#B5B5B5] ">12 de Febrero , 2025</p>
                          <h2 className="text-[38px] font-semibold mt-2">
                          Bienvenido Fernando Guzman al 
                          Intranet de asesoría de tesis 
                          </h2>
                          <p className="text-[22px] text-[#B5B5B5] ">Aquí encontraras toda las herramientas que vas a utilizar</p>  
                      </div>
        
                      <div className="h-[280px]">
                        <img
                          src={portada}
                          alt="Graduación"
                          className="rounded-r-xl w-full h-full object-cover"
                        />
                      </div>   
        
                  </div>
        
                  <div className="flex  justify-between">

                        {/*Envio Asesor*/}
                        <div className="w-full" >

                            <div className=" mt-5 flex justify-between">
                                <h2 className="text-2xl font-bold">Ultimos avances de Clientes</h2>
                                <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                                    <a href="">Ver todo</a>
                                    <img src={flechaAzul} alt="" />
                                </span>
                            </div>  
                                    
                            <div className="flex flex-col  ">
                                <div className="flex justify-between text-[#495D72] font-medium   p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Cliente</div>
                                     <div className="w-[250px] flex justify-center">Titulo</div>
                                     <div className="w-[100px] flex justify-center">Fecha Entre.</div>
                                     <div className="w-[102px] flex justify-center">Fecha Limite</div>
                                     <div className="w-[112px] rounded-md px-3   flex justify-center "> Estado </div>
                                </div> 
                                <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Jesus Martinez</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center">Jan 25;2024</div>
                                     <div className="w-[112px] rounded-md px-3 bg-[#0CB2D5]  flex justify-center text-white"> Por entregar </div>
                                </div> 
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Aldo Montiel</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center">Jan 25;2024</div>
                                     <div className="w-[112px] rounded-md px-3 bg-[#0CB2D5]  flex justify-center text-white"> Por entregar </div>
                                </div> 
                                <div className="flex justify-between text-[#2B2829] font-normal  p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Juan Flores</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center">Jan 25;2024</div>
                                     <div className="w-[112px] rounded-md px-3 bg-[#0CB2D5]  flex justify-center text-white"> Por entregar </div>
                                </div> 
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Alonso Vargas</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center">Jan 25;2024</div>
                                     <div className="w-[112px] rounded-md px-3 bg-[#0CB2D5]  flex justify-center text-white"> Por entregar </div>                                
                                </div> 
                                <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Alex Frigo</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center">Jan 25;2024</div>
                                     <div className="w-[112px] rounded-md px-3 bg-[#0CB2D5]  flex justify-center text-white"> Por entregar </div>                                
                                </div> 
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]    p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Jesus Martinez</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[112px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal    p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Fernando Luis</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[112px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]    p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Alonso Enrique</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[112px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal     p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Gabriel Leon</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[112px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]    p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Jesus Martinez</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[112px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal    p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Alex Frigo</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[112px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]    p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Jesus Martinez</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[112px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal    p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Alex Frigo</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[112px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                

                            </div>
                                    
                        </div>
                        
                        {/*Reuniones */}
                        <div className="ml-[84px] flex flex-col gap-5">
            
                            <div className=" mt-5 flex justify-between ">
                                    <h2 className="text-2xl font-bold">Reuniones</h2>
                                    <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                                    <a href="">Ver todo</a>
                                    <img src={flechaAzul} alt="" />
                                    </span>
                            </div>
                            
                            <div className="flex w-[310px] h-[150px] items-center ">
                            <div className="flex flex-col justify-between  items-center rounded-l-xl h-full w-[104px] bg-[#17162E] p-4 text-white">
                                <div className="flex flex-col justify-center">
                                    <p>Marzo</p>
                                    <h1 className="text-[30px] ">2</h1>  
                                </div>
                                
                                <p className="text-[12px]">12:00 PM</p>
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
                                <p className="text-[12px]">12:00 PM</p>
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
                                <p className="text-[12px]">12:00 PM</p>
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

};

export default HomeAsesor;