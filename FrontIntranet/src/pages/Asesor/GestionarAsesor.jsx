import React from 'react'
import LayoutApp from '../../layout/LayoutApp'

const GestionarAsesor = () => {
  return (
    
    <LayoutApp>
      <main className='flex flex-col m-5'>
          <h1 className='text-[20px] font-medium'>Asesorias</h1>
          <div className='w-[250px] h-[30px] flex justify-between items-center rounded-lg border bg-[#E9E7E7] px-5'>
            <button>Activos</button>
            <div className='h-[40px] w-[2px] bg-white rotate-45'></div>
            <button className='text-[#AAA3A5]'>Desactivados</button>
          </div>
          <div className="flex flex-col  ">
                                <div className="flex justify-between text-[#495D72] font-medium   p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Cliente</div>
                                     <div className="w-[250px] flex justify-center">Titulo</div>
                                     <div className="w-[100px] flex justify-center">Fecha Entre.</div>
                                     <div className="w-[102px] flex justify-center">Fecha Limite</div>
                                     <div className="w-[130px] rounded-md px-3   flex justify-center "> Estado </div>
                                </div> 
                                <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Jesus Martinez</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center">Jan 25;2024</div>
                                     <div className="w-[130px] rounded-md px-3 bg-[#0CB2D5]  flex justify-center text-white"> Por entregar </div>
                                </div> 
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Aldo Montiel</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center">Jan 25;2024</div>
                                     <div className="w-[130px] rounded-md px-3 bg-[#0CB2D5]  flex justify-center text-white"> Por entregar </div>
                                </div> 
                                <div className="flex justify-between text-[#2B2829] font-normal  p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Juan Flores</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center">Jan 25;2024</div>
                                     <div className="w-[130px] rounded-md px-3 bg-[#0CB2D5]  flex justify-center text-white"> Por entregar </div>
                                </div> 
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Alonso Vargas</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center">Jan 25;2024</div>
                                     <div className="w-[130px] rounded-md px-3 bg-[#0CB2D5]  flex justify-center text-white"> Por entregar </div>                                
                                </div> 
                                <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Alex Frigo</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center">Jan 25;2024</div>
                                     <div className="w-[130px] rounded-md px-3 bg-[#0CB2D5]  flex justify-center text-white"> Por entregar </div>                                
                                </div> 
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]    p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Jesus Martinez</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[130px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal    p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Fernando Luis</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[130px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]    p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Alonso Enrique</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[130px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal     p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Gabriel Leon</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[130px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]    p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Jesus Martinez</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[130px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal    p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Alex Frigo</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[130px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]    p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Jesus Martinez</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[130px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal    p-[6px] rounded-md">
                                     <div className="w-[300px] flex ">Alex Frigo</div>
                                     <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                     <div className="w-[100px] flex justify-center">May 25,2025</div>
                                     <div className="w-[102px] flex justify-center"></div>
                                     <div className="w-[130px] rounded-md px-3 bg-[#353563]  flex justify-center text-white"> Entregado </div>                                
                                </div>
                                

                            </div>
      </main>
    </LayoutApp>
    
  )
}

export default GestionarAsesor