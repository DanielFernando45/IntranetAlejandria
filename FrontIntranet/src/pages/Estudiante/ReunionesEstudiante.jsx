import { useState } from "react";
import LayoutApp from "../../layout/LayoutApp";
import Zoom from "../../assets/images/zoom.svg";

const ReunionesEstudiante = () => {
    const [vista, setVista] = useState("proximos");

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
    };

    // Arreglo principal de datos
    const meetingsData = {
        proximos: [
            {
                id: 1,
                type: "Reunión",
                title: "Reunión con el asesor para ver el estado peruano de Juliaca",
                date: "Marzo",
                day: "2",
                time: "12:00 PM",
                color: "bg-[#17162E]"
            },
            {
                id: 2,
                type: "Entrega de avance",
                title: "Entrega del avance de metodología",
                date: "Marzo",
                day: "2",
                time: "12:00 PM",
                color: "bg-[#054755]"
            }

        ],
        anteriores: [
            {
                id: 5,
                type: "Reunión",
                title: "Reunión con el asesor para ver el estado del arte",
                date: "Marzo",
                day: "2",
                time: "12:00 PM",
                color: "bg-[#17162E]"
            },
            {
                id: 6,
                type: "Entrega de avance",
                title: "Entrega del avance de metodologia",
                date: "Marzo",
                day: "2",
                time: "12:00 PM",
                color: "bg-[#054755]"
            },
            {
                id: 7,
                type: "Reunión",
                title: "Reunión con el asesor para ver el estado del arte",
                date: "Marzo",
                day: "2",
                time: "12:00 PM",
                color: "bg-[#0A8EAA]"
            },
            {
                id: 8,
                type: "Entrega de avance",
                title: "Entrega del avance de metodologia",
                date: "Marzo",
                day: "2",
                time: "12:00 PM",
                color: "bg-[#054755]"
            }
        ]
    };

    // Componente para mostrar cada tarjeta de reunión

    return (
        <LayoutApp>
            <main className="flex justify-center p-10">
                <div className="flex flex-col gap-[40px] lg:ml-1 p-[20px] h-[767px] w-full  bg-white rounded-[20px] ">

                    <div className="flex flex-col gap-[12px]">
                        <h1 className="font-medium text-[20px]">Reuniones</h1>
                        <div className="flex w-full border-b-[3px] gap-3 border-black font-normal">
                            <button
                                className="px-3 rounded-t-[5px] w-[105px] bg-[#17162E] text-white"
                            >
                                Próximos
                            </button>

                        </div>
                    </div>

                    {/* Contenido según la vista seleccionada */}
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-wrap justify-start gap-6">
                            {meetingsData[vista].map((meeting) => (
                                <div className="flex flex-col sm:flex-row w-full sm:w-[310px] h-auto sm:h-[150px] items-center">
                                    <div className={`flex flex-col justify-center items-center rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none w-full sm:w-[104px] h-[100px] sm:h-full ${meeting.color} p-4 text-white`}>
                                        <p>{meeting.date}</p>
                                        <h1 className="text-[30px]">{meeting.day}</h1>
                                        <p className="text-[12px]">{meeting.time}</p>
                                    </div>
                                    <div className="flex flex-col justify-between w-full h-full border border-[#AAA3A5] bg-[#F0EFEF] p-4 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none">
                                        <span className="flex flex-col gap-[6px]">
                                            <p className="font-medium">{meeting.type}</p>
                                            <h1 className="text-[#666666]">{truncateText(meeting.title, 40)}</h1>
                                        </span>
                                        <span className="flex gap-4 items-center pt-2">
                                            <a href=""><p className="font-medium">Enlace</p></a>
                                            <img src={Zoom} alt="Zoom" className="w-6 h-6" />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-[12px]">
                        <div className="flex w-full border-b-[3px] gap-3 border-[#0CB2D5]  font-normal">
                            <button
                                className="px-3 rounded-t-[5px] w-[105px] bg-[#0CB2D5] text-white"
                            >
                                Anteriores
                            </button>

                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-wrap justify-start gap-6">
                            {meetingsData["anteriores"].map((meeting) => (
                                <div className="flex flex-col sm:flex-row w-full sm:w-[310px] h-auto sm:h-[150px] items-center">
                                    <div className={`flex flex-col justify-center items-center rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none w-full sm:w-[104px] h-[100px] sm:h-full ${meeting.color} p-4 text-white`}>
                                        <p>{meeting.date}</p>
                                        <h1 className="text-[30px]">{meeting.day}</h1>
                                        <p className="text-[12px]">{meeting.time}</p>
                                    </div>
                                    <div className="flex flex-col justify-between w-full h-full border border-[#AAA3A5] bg-[#F0EFEF] p-4 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none">
                                        <span className="flex flex-col gap-[6px]">
                                            <p className="font-medium">{meeting.type}</p>
                                            <h1 className="text-[#666666]">{truncateText(meeting.title, 40)}</h1>
                                        </span>
                                        <span className="flex gap-4 items-center pt-2">
                                            <a href=""><p className="font-medium">Enlace</p></a>
                                            <img src={Zoom} alt="Zoom" className="w-6 h-6" />
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </main>
        </LayoutApp>
    );
};

export default ReunionesEstudiante;