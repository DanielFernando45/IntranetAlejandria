import React, { useState } from 'react'
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
    // Datos de cada sección con ID
    const tutoriales = [
        { id: 1, title: "Como citar en APA", description: "BiGuru Guias", views: "10k Views", time: "1 month ago", image: youtube },
        { id: 2, title: "Como hacer una tesis", description: "Tutoriales TP", views: "10k Views", time: "1 hour ago", image: youtube },
        { id: 3, title: "Citar en Apa", description: "By Author Name", views: "10k Views", time: "1 hour ago", image: youtube },
        { id: 4, title: "Como usar Git", description: "Guías para desarrolladores", views: "2k Views", time: "2 weeks ago", image: youtube },
        { id: 5, title: "Fundamentos de React", description: "Desarrollo de aplicaciones frontend", views: "12k Views", time: "3 months ago", image: youtube },
        { id: 6, title: "Como hacer un commit en Git", description: "Guía rápida sobre Git", views: "5k Views", time: "2 days ago", image: youtube },
        { id: 7, title: "Introducción a Node.js", description: "Tutorial para principiantes", views: "7k Views", time: "1 month ago", image: youtube },
        { id: 8, title: "Backend con Express", description: "Desarrollo de aplicaciones con Express", views: "3k Views", time: "1 week ago", image: youtube },
        { id: 9, title: "Frontend con React", description: "Creando componentes en React", views: "8k Views", time: "4 months ago", image: youtube },
        { id: 10, title: "APIs Restful", description: "Fundamentos de las APIs", views: "6k Views", time: "1 year ago", image: youtube },
    ];

    const guias = [
        { id: 1, title: "Como elegir un tema de tesis", description: "Desperdicio de materiales en obras de construcción para la obtención del titulo de maestría.", image: youtube },
        { id: 2, title: "Guía para empezar una investigación", description: "El proceso inicial para empezar una investigación científica.", image: youtube },
        { id: 3, title: "Introducción a la metodología de investigación", description: "Métodos básicos para investigaciones académicas.", image: youtube },
        { id: 4, title: "Cómo hacer una revisión bibliográfica", description: "Técnicas y herramientas para hacer revisión bibliográfica.", image: youtube },
        { id: 5, title: "Métodos cualitativos de investigación", description: "Una guía básica sobre investigación cualitativa.", image: youtube },
        { id: 6, title: "El proceso de escritura académica", description: "Técnicas y pasos en la escritura académica.", image: youtube },
        { id: 7, title: "Cómo organizar tu tesis", description: "Consejos y organización para la escritura de tesis.", image: youtube },
    ];

    const herramientas = [
        { id: 1, title: "Ansys", description: "Desperdicio de materiales en obras de construcción para obtención.", image: youtube },
        { id: 2, title: "AutoCAD", description: "Herramienta para diseño y modelado 3D.", image: youtube },
        { id: 3, title: "MATLAB", description: "Análisis y visualización de datos.", image: youtube },
        { id: 4, title: "SolidWorks", description: "Diseño 3D para ingeniería mecánica.", image: youtube },
        { id: 5, title: "SAP2000", description: "Software de ingeniería estructural.", image: youtube },
        { id: 6, title: "SketchUp", description: "Diseño y modelado 3D.", image: youtube },
        { id: 7, title: "Blender", description: "Diseño y modelado 3D para todos.", image: youtube },
        { id: 8, title: "AchiCAD", description: "Diseño y modelado 3D.", image: youtube },
        { id: 9, title: "React", description: "Diseño y modelado 3D para todos.", image: youtube },
        { id: 10, title: "Angular", description: "Diseño y modelado 3D.", image: youtube },
        { id: 11, title: "Basic", description: "Diseño y modelado 3D para todos.", image: youtube },
    ];

    // Estado para controlar los índices de los elementos visibles
    const [visibleTutorials, setVisibleTutorials] = useState([0, 1, 2, 3, 4]);
    const [visibleGuias, setVisibleGuias] = useState([0, 1, 2, 3, 4, 5]);
    const [visibleHerramientas, setVisibleHerramientas] = useState([0, 1, 2, 3, 4, 5, 6, 7 ]);

    // Función para rotar los elementos hacia la derecha
    const rotateRight = (section) => {
        if (section === 'tutorial') {
            setVisibleTutorials(prev => {
                const newIndices = prev.map(i => (i + 1) % tutoriales.length);
                return newIndices;
            });
        } else if (section === 'guia') {
            setVisibleGuias(prev => {
                const newIndices = prev.map(i => (i + 1) % guias.length);
                return newIndices;
            });
        } else if (section === 'herramienta') {
            setVisibleHerramientas(prev => {
                const newIndices = prev.map(i => (i + 1) % herramientas.length);
                return newIndices;
            });
        }
    };

    // Función para rotar los elementos hacia la izquierda
    const rotateLeft = (section) => {
        if (section === 'tutorial') {
            setVisibleTutorials(prev => {
                const newIndices = prev.map(i => (i - 1 + tutoriales.length) % tutoriales.length);
                return newIndices;
            });
        } else if (section === 'guia') {
            setVisibleGuias(prev => {
                const newIndices = prev.map(i => (i - 1 + guias.length) % guias.length);
                return newIndices;
            });
        } else if (section === 'herramienta') {
            setVisibleHerramientas(prev => {
                const newIndices = prev.map(i => (i - 1 + herramientas.length) % herramientas.length);
                return newIndices;
            });
        }
    };

    return (
        <LayoutApp>
            <main className='mx-5'>
                {/* TUTORIALES */}
                <div>
                    <div className="mt-5 mx-5 flex justify-between items-center">
                        <h2 className="text-[20px] font-medium">Tutoriales</h2>
                        <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                            <a href="">Ver todo</a>
                            <img src={flechaAzul} alt="" />
                        </span>
                    </div>
                    <div className="flex justify-between w-full mt-8">
                        <button onClick={() => rotateLeft('tutorial')} className="flex items-center">
                            <img src={FeclaIzqui} alt="" />
                        </button>

                        <div className="flex gap-4">
                            {visibleTutorials.map((index) => {
                                const tutorial = tutoriales[index];
                                return (
                                    <section key={tutorial.id} className="relative w-[300px] group cursor-pointer">
                                        <div className="w-[300px] h-[400px] rounded-xl relative overflow-hidden">
                                            <img className="w-full h-[283px] rounded-t-xl object-cover" src={tutorial.image} alt="" />

                                            <div className="absolute bottom-0 left-0 w-full h-[116px] bg-white rounded-b-xl transition-all duration-500 group-hover:h-full group-hover:bg-white/90 group-hover:backdrop-blur-sm"></div>

                                            <div className="absolute bottom-0 left-0 w-full p-6 z-10 transition-all duration-500 group-hover:bottom-1/4 group-hover:translate-y-1/2">
                                                <div className="flex flex-col gap-[1px] transition-all duration-300 group-hover:items-center group-hover:gap-2">
                                                    <h1 className="text-[16px] font-semibold transition-all duration-300 group-hover:text-[20px] group-hover:text-center">
                                                        {tutorial.title}
                                                    </h1>
                                                    <p className="text-[10px] text-[#82777A] transition-all duration-300 group-hover:text-center">
                                                        {tutorial.description}
                                                    </p>
                                                </div>
                                                <p className="text-[10px] text-[#82777A] font-medium mt-3 transition-all duration-300 group-hover:text-center">
                                                    {tutorial.views} . {tutorial.time}
                                                </p>
                                            </div>

                                            <button className="absolute top-[258px] right-[25px] bg-white h-[50px] w-[50px] rounded-full flex justify-center items-center shadow-md transition-all duration-500 group-hover:h-[70px] group-hover:w-[70px] group-hover:top-1/2 group-hover:left-1/2 group-hover:-translate-x-1/2 group-hover:-translate-y-1/2 group-hover:right-auto z-20">
                                                <img src={play} alt="Play" className="transition-all duration-300 group-hover:scale-110" />
                                            </button>
                                        </div>
                                    </section>
                                );
                            })}
                        </div>

                        <button onClick={() => rotateRight('tutorial')} className="flex items-center">
                            <img src={FechaDerec} alt="" />
                        </button>
                    </div>
                </div>

                {/* GUIAS */}
                <div>
                    <div className="mt-5 mx-5 flex justify-between items-center ">
                        <h2 className="text-[20px] font-medium">Guías</h2>
                        <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                            <a href="">Ver todo</a>
                            <img src={flechaAzul} alt="" />
                        </span>
                    </div>
                    <div className="flex justify-between w-full mt-8">
                        <button onClick={() => rotateLeft('guia')} className="flex items-center">
                            <img src={FeclaIzqui} alt="" />
                        </button>

                        <div className="flex gap-4">
                            {visibleGuias.map((index) => {
                                const guia = guias[index];
                                return (
                                    <section key={guia.id} className="relative w-[262px] h-[284px]">
                                        <img className="w-full h-[126px] rounded-t-xl" src={guia.image} alt="" />
                                        <div className="w-full h-[110px] gap-[10px] py-[10px] px-[15px] bg-white">
                                            <h1 className="text-[15px] font-medium">{guia.title}</h1>
                                            <p className="text-[12px] text-[#425466]">{guia.description}</p>
                                        </div>
                                        <div className="flex h-[48px] bg-[#1B435D] rounded-b-xl">
                                            <button className="flex w-full h-[48px] justify-center items-center border-r">
                                                <img src={ver} alt="" />
                                            </button>
                                            <button className="flex w-full h-[48px] justify-center items-center border-l">
                                                <img src={descargar} alt="" />
                                            </button>
                                        </div>
                                    </section>
                                );
                            })}
                        </div>

                        <button onClick={() => rotateRight('guia')} className="flex items-center">
                            <img src={FechaDerec} alt="" />
                        </button>
                    </div>
                </div>

                {/* HERRAMIENTAS */}
                <div>
                    <div className="mt-5 mx-5 flex justify-between items-center ">
                        <h2 className="text-[20px] font-medium">Herramientas</h2>
                        <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                            <a href="">Ver todo</a>
                            <img src={flechaAzul} alt="" />
                        </span>
                    </div>
                    <div className="flex justify-between w-full mt-8">
                        <button onClick={() => rotateLeft('herramienta')} className="flex items-center">
                            <img src={FeclaIzqui} alt="" />
                        </button>

                        <div className="flex gap-4">
                            {visibleHerramientas.map((index) => {
                                const herramienta = herramientas[index];
                                return (
                                    <section key={herramienta.id} className="relative w-[190px] h-[284px]">
                                        <img className="w-full h-[126px] rounded-t-xl" src={herramienta.image} alt="" />
                                        <div className="flex flex-col w-full h-[83px] gap-[4px] py-[10px] px-[10px] bg-white">
                                            <h1 className="text-[15px] font-medium">{herramienta.title}</h1>
                                            <p className="text-[9px] text-[#425466]">{herramienta.description}</p>
                                        </div>

                                        <button className="h-[33px] bg-[#1B435D] rounded-b-xl flex flex-col w-full justify-center items-center">
                                            <img src={link} alt="" />
                                        </button>
                                    </section>
                                );
                            })}
                        </div>

                        <button onClick={() => rotateRight('herramienta')} className="flex items-center">
                            <img src={FechaDerec} alt="" />
                        </button>
                    </div>
                </div>
            </main>
        </LayoutApp>
    );
};

export default RecursosEstudiante