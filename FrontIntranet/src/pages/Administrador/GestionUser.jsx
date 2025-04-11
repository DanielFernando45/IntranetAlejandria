import LayoutApp from "../../layout/LayoutApp";
import { useState } from "react";
import flechaAzul from "../../assets/icons/arrowAzul.svg";
import busqueda from "../../assets/icons/busqueda.svg"
import plus from "../../assets/icons/IconEstudiante/add.svg"

const GestionarUsuarios =() =>{
     const [vista, setVista] = useState("Clientes");
    

    return (
        <LayoutApp>
          <main className="flex flex-col  mx-32 my-24 items-start">

          <div className="ml-8  flex w-full border-b-2 gap-3 border-black font-normal">
                            <button
                              className={`px-3 rounded-t-[5px] w-[105px] ${
                                vista === "Clientes" ? "bg-[#17162E] text-white" : ""
                              }`}
                              onClick={() => setVista("Clientes")}
                            >
                              Clientes
                            </button>
                            <button
                              className={`px-3 rounded-t-[5px] w-[105px] ${
                                vista === "Asesores" ? "bg-[#17162E] text-white" : ""
                              }`}
                              onClick={() => setVista("Asesores")}
                            >
                              Asesores
                            </button>
          </div>

            <div className="flex flex-col gap-[10px] ml-8 pt-3  p-[30px]   w-full  bg-white  rounded-b-[10px] drop-shadow-lg">

                        <div className="flex flex-col gap-[12px]">

                          <div className="flex justify-between">
                              <h2 className="text-2xl font-bold">CRUD</h2>
                              <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                                <a href="">Ver todo</a>
                                <img src={flechaAzul} alt="" />
                              </span>
                          </div>
                          <div className="flex gap-5">
                            <div className="w-full h-8 rounded-md px-[10px] py-[6px] bg-[#E4E2E2]">
                              <img src={busqueda} alt="" />
                            </div>
                              <div className="flex justify-center text-white w-[113px] h-8 rounded font-semibold  bg-[#1B435D] px-6 py-1">
                                        Buscar
                              </div>
                          </div>
                          

                        </div>
            
                             
                        
                        <div>
                          {vista === "Clientes" ?(
                              <div className="flex flex-col  ">
                                   
                                   <div className="flex justify-between text-[#495D72] font-medium   p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">ID</div>
                                                      <div className="w-[300px] flex justify-center">Alumno</div>
                                                      <div className="w-[100px] flex justify-center">F. Inicio</div>
                                                      <div className="w-[110px] flex justify-center">F. Vencimineto</div>
                                                      <div className="w-[320px] flex justify-center">Carrera</div>
                                                      <div className="w-[210px] flex justify-center">Contrato</div>
                                                      <div className="w-[110px] flex justify-center">Editar</div>
                                                      <div className="w-[110px] flex justify-center">Eliminar</div>
                                   </div> 
                                   <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">0125</div>
                                                      <div className="w-[300px] flex justify-start">Antonio Jorge Cueva Lopez</div>
                                                      <div className="w-[100px] flex justify-center">Por asignar</div>
                                                      <div className="w-[102px] flex justify-center">Por asignar</div>
                                                      <div className="w-[320px] flex justify-start">Administracion de empresas Internacionales</div>
                                                      <div className="w-[210px] flex justify-start">Plazo/Al contado/Grupal</div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                                   </div> 
                                   <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">0125</div>
                                                      <div className="w-[300px] flex justify-start">Juan Mateo Pérez Vinlof</div>
                                                      <div className="w-[100px] flex justify-center">Por asignar</div>
                                                      <div className="w-[102px] flex justify-center">Por asignar</div>
                                                      <div className="w-[320px] flex justify-start">Administracion de empresas </div>
                                                      <div className="w-[210px] flex justify-start">Plazo/Al contado/Grupal</div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                                   </div> 
                                   <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">0125</div>
                                                      <div className="w-[300px] flex justify-start">Antonio Jorge Cueva Lopez</div>
                                                      <div className="w-[100px] flex justify-center">23/05/24</div>
                                                      <div className="w-[102px] flex justify-center">23/06/24</div>
                                                      <div className="w-[320px] flex justify-start">Administracion de empresas Internacionales</div>
                                                      <div className="w-[210px] flex justify-start">Avance/Al contado/Individual</div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                                   </div> 
                                   <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">0125</div>
                                                      <div className="w-[300px] flex justify-start">Juan Mateo Pérez Vinlof</div>
                                                      <div className="w-[100px] flex justify-center">03/02/24</div>
                                                      <div className="w-[102px] flex justify-center">03/02/24</div>
                                                      <div className="w-[320px] flex justify-start">Administracion de empresas </div>
                                                      <div className="w-[210px] flex justify-start">Avance/Al contado/Individual</div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                                   </div> 
                                   <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">0125</div>
                                                      <div className="w-[300px] flex justify-start">Antonio Jorge Cueva Lopez</div>
                                                      <div className="w-[100px] flex justify-center">23/05/24</div>
                                                      <div className="w-[102px] flex justify-center">23/06/24</div>
                                                      <div className="w-[320px] flex justify-start">Administracion de empresas Internacionales</div>
                                                      <div className="w-[210px] flex justify-start">Avance/Al contado/Individual</div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                                   </div> 
                                   <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">0125</div>
                                                      <div className="w-[300px] flex justify-start">Juan Mateo Pérez Vinlof</div>
                                                      <div className="w-[100px] flex justify-center">03/02/24</div>
                                                      <div className="w-[102px] flex justify-center">03/02/24</div>
                                                      <div className="w-[320px] flex justify-start">Administracion de empresas </div>
                                                      <div className="w-[210px] flex justify-start">Avance/Al contado/Individual</div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                                   </div> 
                                   <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">0125</div>
                                                      <div className="w-[300px] flex justify-start">Antonio Jorge Cueva Lopez</div>
                                                      <div className="w-[100px] flex justify-center">23/05/24</div>
                                                      <div className="w-[102px] flex justify-center">23/06/24</div>
                                                      <div className="w-[320px] flex justify-start">Administracion de empresas Internacionales</div>
                                                      <div className="w-[210px] flex justify-start">Avance/Al contado/Individual</div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                                   </div> 
                                   <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">0125</div>
                                                      <div className="w-[300px] flex justify-start">Juan Mateo Pérez Vinlof</div>
                                                      <div className="w-[100px] flex justify-center">03/02/24</div>
                                                      <div className="w-[102px] flex justify-center">03/02/24</div>
                                                      <div className="w-[320px] flex justify-start">Administracion de empresas </div>
                                                      <div className="w-[210px] flex justify-start">Avance/Al contado/Individual</div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                                   </div> 
                                   <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">0125</div>
                                                      <div className="w-[300px] flex justify-start">Antonio Jorge Cueva Lopez</div>
                                                      <div className="w-[100px] flex justify-center">23/05/24</div>
                                                      <div className="w-[102px] flex justify-center">23/06/24</div>
                                                      <div className="w-[320px] flex justify-start">Administracion de empresas Internacionales</div>
                                                      <div className="w-[210px] flex justify-start">Avance/Al contado/Individual</div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                                   </div> 
                                   <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">0125</div>
                                                      <div className="w-[300px] flex justify-start">Juan Mateo Pérez Vinlof</div>
                                                      <div className="w-[100px] flex justify-center">03/02/24</div>
                                                      <div className="w-[102px] flex justify-center">03/02/24</div>
                                                      <div className="w-[320px] flex justify-start">Administracion de empresas </div>
                                                      <div className="w-[210px] flex justify-start">Avance/Al contado/Individual</div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                                   </div> 
                                   <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">0125</div>
                                                      <div className="w-[300px] flex justify-start">Antonio Jorge Cueva Lopez</div>
                                                      <div className="w-[100px] flex justify-center">23/05/24</div>
                                                      <div className="w-[102px] flex justify-center">23/06/24</div>
                                                      <div className="w-[320px] flex justify-start">Administracion de empresas Internacionales</div>
                                                      <div className="w-[210px] flex justify-start">Avance/Al contado/Individual</div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                                   </div> 
                                   <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">0125</div>
                                                      <div className="w-[300px] flex justify-start">Juan Mateo Pérez Vinlof</div>
                                                      <div className="w-[100px] flex justify-center">03/02/24</div>
                                                      <div className="w-[102px] flex justify-center">03/02/24</div>
                                                      <div className="w-[320px] flex justify-start">Administracion de empresas </div>
                                                      <div className="w-[210px] flex justify-start">Avance/Al contado/Individual</div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                                   </div> 
                                   <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">0125</div>
                                                      <div className="w-[300px] flex justify-start">Antonio Jorge Cueva Lopez</div>
                                                      <div className="w-[100px] flex justify-center">23/05/24</div>
                                                      <div className="w-[102px] flex justify-center">23/06/24</div>
                                                      <div className="w-[320px] flex justify-start">Administracion de empresas Internacionales</div>
                                                      <div className="w-[210px] flex justify-start">Avance/Al contado/Individual</div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                                   </div> 
                                   <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                                      <div className="w-[40px] flex justify-center">0125</div>
                                                      <div className="w-[300px] flex justify-start">Juan Mateo Pérez Vinlof</div>
                                                      <div className="w-[100px] flex justify-center">03/02/24</div>
                                                      <div className="w-[102px] flex justify-center">03/02/24</div>
                                                      <div className="w-[320px] flex justify-start">Administracion de empresas </div>
                                                      <div className="w-[210px] flex justify-start">Avance/Al contado/Individual</div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#1C1C34]  flex justify-center text-white"> Editar </div>
                                                      <div className="w-[110px] rounded-md px-3 bg-[#8F1313]  flex justify-center text-white"> Eliminar </div>
                                   </div>  
                                   
                                   
                                                              
                              </div>
                          ):(
                            <div>
            
                            </div>
                          )}
                        </div>
            
                        <div className="flex justify-between text-white w-[230px] h-8 rounded font-semibold  bg-[#1B435D] px-6 py-1">
                                        <p>Agregar Estudiante</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" fill="white">
                                        <path d="M12 22.5C17.5 22.5 22 18 22 12.5C22 7 17.5 2.5 12 2.5C6.5 2.5 2 7 2 12.5C2 18 6.5 22.5 12 22.5Z" stroke="#054755" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M8 12.5H16" stroke="#054755" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        <path d="M12 16.5V8.5" stroke="#054755" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg> 

                        </div>
            </div>
        </main>  
        </LayoutApp>

        
    );
};
export default GestionarUsuarios;