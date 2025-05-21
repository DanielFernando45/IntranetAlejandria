import React from 'react'
import LayoutApp from '../../layout/LayoutApp'
import FeclaIzqui from "../../assets/icons/arrow-left.svg"
import FechaDerec from "../../assets/icons/arrow-right.svg"
import flechaAzul from "../../assets/icons/arrowAzul.svg"
import play from "../../assets/icons/play.svg"
import youtube from "../../assets/images/ImagenYouTube.png"
import ver from "../../assets/icons/ver.svg"
import descargar from "../../assets/icons/descargarblanco.svg"
import link from "../../assets/icons/link.svg"

const RecursosEstudiante = () => {
    return (
        <LayoutApp>
            <main className='ml-5 mr-40'>
                <div>
                    <div className=" mt-5 mx-5 flex justify-between items-center">
                        <h2 className="text-[20px] font-medium">Tutoriales</h2>
                        <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                            <a href="">Ver todo</a>
                            <img src={flechaAzul} alt="" />
                        </span>
                    </div>
                    <div className="flex justify-between w-full mt-8">
                        <div className="flex items-center ">
                            <a className=" " href=""> <img src={FeclaIzqui} alt="" /></a>
                        </div>

                        <section className="relative w-[300px] group cursor-pointer">
                            <div className="w-[300px] h-[400px] rounded-xl relative overflow-hidden">
                                <img className="w-full h-[283px] rounded-t-xl object-cover" src={youtube} alt="" />

                                {/* Fondo blanco que se expande */}
                                <div className="absolute bottom-0 left-0 w-full h-[116px] bg-white rounded-b-xl transition-all duration-500 group-hover:h-full group-hover:bg-white/90 group-hover:backdrop-blur-sm"></div>

                                {/* Contenido de texto que se mueve hacia arriba */}
                                <div className="absolute bottom-0 left-0 w-full p-6 z-10 transition-all duration-500 group-hover:bottom-1/4 group-hover:translate-y-1/2">
                                    <div className="flex flex-col gap-[1px] transition-all duration-300 group-hover:items-center group-hover:gap-2">
                                        <h1 className="text-[16px] font-semibold transition-all duration-300 group-hover:text-[20px] group-hover:text-center">
                                            Como citar en APA
                                        </h1>
                                        <p className="text-[10px] text-[#82777A] transition-all duration-300 group-hover:text-center">
                                            BiGuru Guias
                                        </p>
                                    </div>
                                    <p className="text-[10px] text-[#82777A] font-medium mt-3 transition-all duration-300 group-hover:text-center">
                                        10k Views . 1 month ago
                                    </p>
                                </div>

                                {/* Botón de play con posición ajustada */}
                                <button className="absolute top-[258px] right-[25px] bg-white h-[50px] w-[50px] rounded-full flex justify-center items-center shadow-md transition-all duration-500 group-hover:h-[70px] group-hover:w-[70px] group-hover:top-1/2 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:right-auto z-20">
                                    <img src={play} alt="Play" className="transition-all duration-300 group-hover:scale-110" />
                                </button>
                            </div>
                        </section>

                        <section className="relative w-[300px] group cursor-pointer">
                            <div className="w-[300px] h-[400px] rounded-xl relative overflow-hidden">
                                <img className="w-full h-[283px] rounded-t-xl object-cover" src={youtube} alt="" />

                                {/* Fondo blanco que se expande */}
                                <div className="absolute bottom-0 left-0 w-full h-[116px] bg-white rounded-b-xl transition-all duration-500 group-hover:h-full group-hover:bg-white/90 group-hover:backdrop-blur-sm"></div>

                                {/* Contenido de texto que se mueve hacia arriba */}
                                <div className="absolute bottom-0 left-0 w-full p-6 z-10 transition-all duration-500 group-hover:bottom-1/4 group-hover:translate-y-1/2">
                                    <div className="flex flex-col gap-[1px] transition-all duration-300 group-hover:items-center group-hover:gap-2">
                                        <h1 className="text-[16px] font-semibold transition-all duration-300 group-hover:text-[20px] group-hover:text-center">
                                            Como hacer una tesis
                                        </h1>
                                        <p className="text-[10px] text-[#82777A] transition-all duration-300 group-hover:text-center">
                                            Tutoriales TP
                                        </p>
                                    </div>
                                    <p className="text-[10px] text-[#82777A] font-medium mt-3 transition-all duration-300 group-hover:text-center">
                                        10k Views  .  1 hours ago
                                    </p>
                                </div>

                                {/* Botón de play con posición ajustada */}
                                <button className="absolute top-[258px] right-[25px] bg-white h-[50px] w-[50px] rounded-full flex justify-center items-center shadow-md transition-all duration-500 group-hover:h-[70px] group-hover:w-[70px] group-hover:top-1/2 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:right-auto z-20">
                                    <img src={play} alt="Play" className="transition-all duration-300 group-hover:scale-110" />
                                </button>
                            </div>
                        </section>

                        <section className="relative w-[300px] group cursor-pointer">
                            <div className="w-[300px] h-[400px] rounded-xl relative overflow-hidden">
                                <img className="w-full h-[283px] rounded-t-xl object-cover" src={youtube} alt="" />

                                {/* Fondo blanco que se expande */}
                                <div className="absolute bottom-0 left-0 w-full h-[116px] bg-white rounded-b-xl transition-all duration-500 group-hover:h-full group-hover:bg-white/90 group-hover:backdrop-blur-sm"></div>

                                {/* Contenido de texto que se mueve hacia arriba */}
                                <div className="absolute bottom-0 left-0 w-full p-6 z-10 transition-all duration-500 group-hover:bottom-1/4 group-hover:translate-y-1/2">
                                    <div className="flex flex-col gap-[1px] transition-all duration-300 group-hover:items-center group-hover:gap-2">
                                        <h1 className="text-[16px] font-semibold transition-all duration-300 group-hover:text-[20px] group-hover:text-center">
                                            Citar en Apa
                                        </h1>
                                        <p className="text-[10px] text-[#82777A] transition-all duration-300 group-hover:text-center">
                                            By Author Name
                                        </p>
                                    </div>
                                    <p className="text-[10px] text-[#82777A] font-medium mt-3 transition-all duration-300 group-hover:text-center">
                                        10k Views  .  1 hours ago
                                    </p>
                                </div>

                                {/* Botón de play con posición ajustada */}
                                <button className="absolute top-[258px] right-[25px] bg-white h-[50px] w-[50px] rounded-full flex justify-center items-center shadow-md transition-all duration-500 group-hover:h-[70px] group-hover:w-[70px] group-hover:top-1/2 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:right-auto z-20">
                                    <img src={play} alt="Play" className="transition-all duration-300 group-hover:scale-110" />
                                </button>
                            </div>
                        </section>

                        <section className="relative w-[300px] group cursor-pointer">
                            <div className="w-[300px] h-[400px] rounded-xl relative overflow-hidden">
                                <img className="w-full h-[283px] rounded-t-xl object-cover" src={youtube} alt="" />

                                {/* Fondo blanco que se expande */}
                                <div className="absolute bottom-0 left-0 w-full h-[116px] bg-white rounded-b-xl transition-all duration-500 group-hover:h-full group-hover:bg-white/90 group-hover:backdrop-blur-sm"></div>

                                {/* Contenido de texto que se mueve hacia arriba */}
                                <div className="absolute bottom-0 left-0 w-full p-6 z-10 transition-all duration-500 group-hover:bottom-1/4 group-hover:translate-y-1/2">
                                    <div className="flex flex-col gap-[1px] transition-all duration-300 group-hover:items-center group-hover:gap-2">
                                        <h1 className="text-[16px] font-semibold transition-all duration-300 group-hover:text-[20px] group-hover:text-center">
                                            Citar en Apa
                                        </h1>
                                        <p className="text-[10px] text-[#82777A] transition-all duration-300 group-hover:text-center">
                                            By Author Name
                                        </p>
                                    </div>
                                    <p className="text-[10px] text-[#82777A] font-medium mt-3 transition-all duration-300 group-hover:text-center">
                                        10k Views  .  1 hours ago
                                    </p>
                                </div>

                                {/* Botón de play con posición ajustada */}
                                <button className="absolute top-[258px] right-[25px] bg-white h-[50px] w-[50px] rounded-full flex justify-center items-center shadow-md transition-all duration-500 group-hover:h-[70px] group-hover:w-[70px] group-hover:top-1/2 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:right-auto z-20">
                                    <img src={play} alt="Play" className="transition-all duration-300 group-hover:scale-110" />
                                </button>
                            </div>
                        </section>

                        <div className="flex items-center">
                            <a className=" w-6 h-6" href=""> <img src={FechaDerec} alt="" /></a>
                        </div>
                    </div>
                </div>
                <div>
                    <div className=" mt-5 mx-5 flex justify-between items-center ">
                        <h2 className="text-[20px] font-medium">Guías</h2>
                        <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                            <a href="">Ver todo</a>
                            <img src={flechaAzul} alt="" />
                        </span>
                    </div>
                    <div className="flex justify-between w-full mt-8">

                        <div className="flex items-center ">
                            <a className=" " href=""> <img src={FeclaIzqui} alt="" /></a>
                        </div>

                        <div className='w-[262px] h-[284px] '>
                            <img className='w-full h-[126px] rounded-t-xl' src={youtube} alt="" />
                            <div className='w-full h-[110px] gap-[10px] py-[10px] px-[15px] bg-white'>
                                <h1 className='text-[15px] font-medium'>Como elegir un tema de tesis</h1>
                                <p className='text-[12px] text-[#425466]'>Desperdicio de materiales en obras de construcción para la obtención del titulo de maestría.</p>
                            </div>
                            <div className='flex h-[48px] bg-[#1B435D] rounded-b-xl'>
                                <button className='flex w-full h-[48px] justify-center items-center border-r'>
                                    <img src={ver} alt="" />
                                </button>
                                <button className='flex w-full h-[48px] justify-center items-center border-l'>
                                    <img src={descargar} alt="" />
                                </button>
                            </div>
                        </div>
                        <div className='w-[262px] h-[284px] '>
                            <img className='w-full h-[126px] rounded-t-xl' src={youtube} alt="" />
                            <div className='w-full h-[110px] gap-[10px] py-[10px] px-[15px] bg-white'>
                                <h1 className='text-[15px] font-medium'>Como elegir un tema de tesis</h1>
                                <p className='text-[12px] text-[#425466]'>Desperdicio de materiales en obras de construcción para la obtención del titulo de maestría.</p>
                            </div>
                            <div className='flex h-[48px] bg-[#1B435D] rounded-b-xl'>
                                <button className='flex w-full h-[48px] justify-center items-center border-r'>
                                    <img src={ver} alt="" />
                                </button>
                                <button className='flex w-full h-[48px] justify-center items-center border-l'>
                                    <img src={descargar} alt="" />
                                </button>
                            </div>
                        </div>
                        <div className='w-[262px] h-[284px] '>
                            <img className='w-full h-[126px] rounded-t-xl' src={youtube} alt="" />
                            <div className='w-full h-[110px] gap-[10px] py-[10px] px-[15px] bg-white'>
                                <h1 className='text-[15px] font-medium'>Como elegir un tema de tesis</h1>
                                <p className='text-[12px] text-[#425466]'>Desperdicio de materiales en obras de construcción para la obtención del titulo de maestría.</p>
                            </div>
                            <div className='flex h-[48px] bg-[#1B435D] rounded-b-xl'>
                                <button className='flex w-full h-[48px] justify-center items-center border-r'>
                                    <img src={ver} alt="" />
                                </button>
                                <button className='flex w-full h-[48px] justify-center items-center border-l'>
                                    <img src={descargar} alt="" />
                                </button>
                            </div>
                        </div>
                        <div className='w-[262px] h-[284px] '>
                            <img className='w-full h-[126px] rounded-t-xl' src={youtube} alt="" />
                            <div className='w-full h-[110px] gap-[10px] py-[10px] px-[15px] bg-white'>
                                <h1 className='text-[15px] font-medium'>Como elegir un tema de tesis</h1>
                                <p className='text-[12px] text-[#425466]'>Desperdicio de materiales en obras de construcción para la obtención del titulo de maestría.</p>
                            </div>
                            <div className='flex h-[48px] bg-[#1B435D] rounded-b-xl'>
                                <button className='flex w-full h-[48px] justify-center items-center border-r'>
                                    <img src={ver} alt="" />
                                </button>
                                <button className='flex w-full h-[48px] justify-center items-center border-l'>
                                    <img src={descargar} alt="" />
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center">
                            <a className=" w-6 h-6" href=""> <img src={FechaDerec} alt="" /></a>
                        </div>

                    </div>
                </div>

                <div>
                    <div className=" mt-5 mx-5 flex justify-between items-center ">
                        <h2 className="text-[20px] font-medium">Herramientas</h2>
                        <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                            <a href="">Ver todo</a>
                            <img src={flechaAzul} alt="" />
                        </span>
                    </div>
                    <div className="flex justify-between w-full mt-8">

                        <div className="flex items-center ">
                            <a className=" " href=""> <img src={FeclaIzqui} alt="" /></a>
                        </div>

                        <div className='w-[190px] h-[284px] '>
                            <img className='w-full h-[126px] rounded-t-xl' src={youtube} alt="" />
                            <div className='flex flex-col w-full h-[83px] gap-[4px] py-[10px] px-[10px] bg-white'>
                                <h1 className='text-[15px] font-medium'>Ansys</h1>
                                <p className='text-[9px] text-[#425466]'>Desperdicio de materiales en obras de construcción para obtención.</p>
                            </div>

                            <button className='h-[33px] bg-[#1B435D] rounded-b-xl flex flex-col w-full  justify-center items-center '>
                                <img src={link} alt="" />
                            </button>

                        </div>
                        <div className='w-[190px] h-[284px] '>
                            <img className='w-full h-[126px] rounded-t-xl' src={youtube} alt="" />
                            <div className='flex flex-col w-full h-[83px] gap-[4px] py-[10px] px-[10px] bg-white'>
                                <h1 className='text-[15px] font-medium'>Ansys</h1>
                                <p className='text-[9px] text-[#425466]'>Desperdicio de materiales en obras de construcción para obtención.</p>
                            </div>

                            <button className='h-[33px] bg-[#1B435D] rounded-b-xl flex flex-col w-full  justify-center items-center '>
                                <img src={link} alt="" />
                            </button>

                        </div>
                        <div className='w-[190px] h-[284px] '>
                            <img className='w-full h-[126px] rounded-t-xl' src={youtube} alt="" />
                            <div className='flex flex-col w-full h-[83px] gap-[4px] py-[10px] px-[10px] bg-white'>
                                <h1 className='text-[15px] font-medium'>Ansys</h1>
                                <p className='text-[9px] text-[#425466]'>Desperdicio de materiales en obras de construcción para obtención.</p>
                            </div>

                            <button className='h-[33px] bg-[#1B435D] rounded-b-xl flex flex-col w-full  justify-center items-center '>
                                <img src={link} alt="" />
                            </button>

                        </div>
                        <div className='w-[190px] h-[284px] '>
                            <img className='w-full h-[126px] rounded-t-xl' src={youtube} alt="" />
                            <div className='flex flex-col w-full h-[83px] gap-[4px] py-[10px] px-[10px] bg-white'>
                                <h1 className='text-[15px] font-medium'>Ansys</h1>
                                <p className='text-[9px] text-[#425466]'>Desperdicio de materiales en obras de construcción para obtención.</p>
                            </div>

                            <button className='h-[33px] bg-[#1B435D] rounded-b-xl flex flex-col w-full  justify-center items-center '>
                                <img src={link} alt="" />
                            </button>

                        </div>


                        <div className="flex items-center">
                            <a className="w-6 h-6" href=""> <img src={FechaDerec} alt="" /></a>
                        </div>

                    </div>
                </div>

            </main>
        </LayoutApp>

    )
}

export default RecursosEstudiante