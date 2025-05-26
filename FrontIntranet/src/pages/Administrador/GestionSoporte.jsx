import { useState } from 'react'
import LayoutApp from '../../layout/LayoutApp'

const GestionSoporte = () => {
    const [form, setSupport] = useState(false)
    const [vista, setVista] = useState("pendientes");

    return (
        <LayoutApp>
            <main className="flex flex-col gap-11 m-5 items-start">
                <div className="flex flex-col gap-[10px] px-[40px] py-5 w-full h-[400px] bg-white rounded-[10px]">
                    <div className="flex flex-col gap-[12px]">
                        <div className=" mt-5 flex justify-between">
                            <h2 className="text-2xl font-bold">Soporte</h2>
                        </div>

                        <div className="flex w-full border-b-2 gap-3 border-black font-normal">
                            <button
                                className={`px-3 rounded-t-[5px] w-[115px] ${vista === "pendientes" ? "bg-[#17162E] text-white" : ""
                                    }`}
                                onClick={() => setVista("pendientes")}
                            >
                                Pendientes
                            </button>
                            <button
                                className={`px-3 rounded-t-[5px] w-[105px] ${vista === "hechos" ? "bg-[#17162E] text-white" : ""
                                    }`}
                                onClick={() => setVista("hechos")}
                            >
                                Hechos
                            </button>
                        </div>
                    </div>
                    <div>
                        {vista === "pendientes" ? (
                            <div className="flex flex-col  ">
                                <div className="flex justify-between text-[#495D72] font-normal   p-[6px] rounded-md">
                                    <div className="w-[40px] flex justify-center">ID</div>
                                    <div className="w-[300px] flex justify-center">Asunto</div>
                                    <div className="w-[250px] flex justify-center">Descripcion</div>
                                    <div className="w-[180px] flex justify-center">F.envio</div>
                                    <div className="w-[250px] rounded-md px-3  flex justify-center "> Cliente </div>
                                    <div className="w-[250px] rounded-md px-3  flex justify-center "> Accion </div>
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                    <div className="w-[40px] flex justify-center">001</div>
                                    <div className="w-[300px] flex justify-center">Observaciones de la introducción</div>
                                    <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                    <div className="w-[180px] flex justify-center">25 de Diciembre ,2025</div>
                                    <div className="w-[250px] rounded-md px-3  flex justify-center ">Antonio Jorge Cueva Lopez</div>
                                    <button onClick={() => setSupport(!false)} className="w-[150px] rounded-md px-3  flex justify-center bg-[#1C1C34] text-white text-[13px] items-center">Ver detalles</button>
                                    <button className="w-[100px] rounded-md px-3  flex justify-center bg-[#1C1C34] text-white text-[13px] items-center">Resuelto</button>
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                    <div className="w-[40px] flex justify-center">002</div>
                                    <div className="w-[300px] flex justify-center">Observaciones de la introducción</div>
                                    <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                    <div className="w-[180px] flex justify-center">25 de Mayo ,2025</div>
                                    <div className="w-[250px] rounded-md px-3  flex justify-center ">Antonio Jorge Cueva Lopez</div>
                                    <button className="w-[150px] rounded-md px-3  flex justify-center bg-[#1C1C34] text-white text-[13px] items-center">Ver detalles</button>
                                    <button className="w-[100px] rounded-md px-3  flex justify-center bg-[#1C1C34] text-white text-[13px] items-center">Resuelto</button>
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal  p-[6px] rounded-md">
                                    <div className="w-[40px] flex justify-center">003</div>
                                    <div className="w-[300px] flex justify-center">Observaciones de la introducción</div>
                                    <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                    <div className="w-[180px] flex justify-center">25 de Mayo ,2025</div>
                                    <div className="w-[250px] rounded-md px-3  flex justify-center ">Antonio Jorge Cueva Lopez</div>
                                    <button className="w-[150px] rounded-md px-3  flex justify-center bg-[#1C1C34] text-white text-[13px] items-center">Ver detalles</button>
                                    <button className="w-[100px] rounded-md px-3  flex justify-center bg-[#1C1C34] text-white text-[13px] items-center">Resuelto</button>
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                    <div className="w-[40px] flex justify-center">004</div>
                                    <div className="w-[300px] flex justify-center">Observaciones de la introducción</div>
                                    <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                    <div className="w-[180px] flex justify-center">25 de Mayo ,2025</div>
                                    <div className="w-[250px] rounded-md px-3   flex justify-center "> Antonio Jorge Cueva Lopez </div>
                                    <button className="w-[150px] rounded-md px-3  flex justify-center bg-[#1C1C34] text-white text-[13px] items-center">Ver detalles</button>
                                    <button className="w-[100px] rounded-md px-3  flex justify-center bg-[#1C1C34] text-white text-[13px] items-center">Resuelto</button>
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                    <div className="w-[40px] flex justify-center">005</div>
                                    <div className="w-[300px] flex justify-center">Observaciones de la introducción</div>
                                    <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                    <div className="w-[180px] flex justify-center">25 de Mayo ,2025</div>
                                    <div className="w-[250px] rounded-md px-3   flex justify-center "> Antonio Jorge Cueva Lopez </div>
                                    <button className="w-[150px] rounded-md px-3  flex justify-center bg-[#1C1C34] text-white text-[13px] items-center">Ver detalles</button>
                                    <button className="w-[100px] rounded-md px-3  flex justify-center bg-[#1C1C34] text-white text-[13px] items-center">Resuelto</button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col  ">
                                <div className="flex justify-between text-[#495D72] font-normal   p-[6px] rounded-md">
                                    <div className="w-[40px] flex justify-center">ID</div>
                                    <div className="w-[300px] flex justify-center">Asunto</div>
                                    <div className="w-[250px] flex justify-center">Descripcion</div>
                                    <div className="w-[180px] flex justify-center">F.inicio</div>
                                    <div className="w-[180px] flex justify-center">F.solucion</div>
                                    <div className="w-[250px] rounded-md px-3  flex justify-center "> Cliente </div>
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                    <div className="w-[40px] flex justify-center">001</div>
                                    <div className="w-[300px] flex justify-center">Observaciones de la introducción</div>
                                    <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                    <div className="w-[180px] flex justify-center">25 de Diciembre ,2025</div>
                                    <div className="w-[180px] flex justify-center">25 de Diciembre ,2025</div>
                                    <div className="w-[250px] rounded-md px-3  flex justify-center "> Antonio Jorge Cueva Lopez </div>
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                    <div className="w-[40px] flex justify-center">002</div>
                                    <div className="w-[300px] flex justify-center">Observaciones de la introducción</div>
                                    <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                    <div className="w-[180px] flex justify-center">25 de Mayo ,2025</div>
                                    <div className="w-[180px] flex justify-center">25 de Diciembre ,2025</div>
                                    <div className="w-[250px] rounded-md px-3   flex justify-center "> Antonio Jorge Cueva Lopez </div>
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal  p-[6px] rounded-md">
                                    <div className="w-[40px] flex justify-center">003</div>
                                    <div className="w-[300px] flex justify-center">Observaciones de la introducción</div>
                                    <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                    <div className="w-[180px] flex justify-center">25 de Mayo ,2025</div>
                                    <div className="w-[180px] flex justify-center">25 de Diciembre ,2025</div>
                                    <div className="w-[250px] rounded-md px-3  flex justify-center "> Antonio Jorge Cueva Lopez </div>
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal bg-[#E9E7E7]  p-[6px] rounded-md">
                                    <div className="w-[40px] flex justify-center">004</div>
                                    <div className="w-[300px] flex justify-center">Observaciones de la introducción</div>
                                    <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                    <div className="w-[180px] flex justify-center">25 de Mayo ,2025</div>
                                    <div className="w-[180px] flex justify-center">25 de Diciembre ,2025</div>
                                    <div className="w-[250px] rounded-md px-3   flex justify-center "> Antonio Jorge Cueva Lopez </div>
                                </div>
                                <div className="flex justify-between text-[#2B2829] font-normal   p-[6px] rounded-md">
                                    <div className="w-[40px] flex justify-center">005</div>
                                    <div className="w-[300px] flex justify-center">Observaciones de la introducción</div>
                                    <div className="w-[250px] flex justify-center">Se envía las observaciones</div>
                                    <div className="w-[180px] flex justify-center">25 de Mayo ,2025</div>
                                    <div className="w-[180px] flex justify-center">25 de Diciembre ,2025</div>
                                    <div className="w-[250px] rounded-md px-3   flex justify-center "> Antonio Jorge Cueva Lopez </div>
                                </div>


                            </div>
                        )}
                    </div>
                </div>
                {form && (
                    <div className='flex flex-col w-[28%] absolute top-60 left-[700px] px-10 py-5 h-[480px] bg-white rounded-xl p-5 gap-9 border'>
                        <div className='flex w-full justify-center text-[20px] font-semibold'>
                            <h1>Formulario de soporte</h1>
                        </div>
                        <div className='flex flex-col gap-[10px]'>
                            <h2 className='text-[15px]'>Asunto</h2>
                            <select className='border p-1 rounded-lg '>
                                <option value="">Seleccione un asunto</option>
                            </select>
                            <h2 className='text-[15px]'>Descripción</h2>
                            <textarea className='border rounded-xl w-full h-[200px] p-6' placeholder='Ingrese una descripción'></textarea>
                            <button className='w-full h-[50px] border border-[#1C1C34] text-[20px] font-semibold rounded-lg'>
                                Enviar
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </LayoutApp>
    )
}

export default GestionSoporte