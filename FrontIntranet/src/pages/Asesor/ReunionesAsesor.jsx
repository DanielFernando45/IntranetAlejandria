import { useState } from "react";
import LayoutApp from '../../layout/LayoutApp'
import Zoom from "../../assets/images/zoom.svg";
import agregar from '../../assets/icons/pluss.svg';

const ReunionesAsesor = () => {
  const [vista, setVista] = useState("proximos");

  return (
    <LayoutApp>
      <main className="m-2">
        <div className="flex flex-col gap-[40px] ml-8   p-[40px] h-[767px] bg-white rounded-[20px]">

          <div className="flex flex-col gap-[12px]">

            <div className="flex justify-between">
              <h1 className="font-medium text-[20px]">
                Reuniones
              </h1>
              <select className="border border-black rounded-l-lg" name="" id="">
                <option value="">Filtrar por alumno</option>
                <option value="">Juan Lopez</option>
                <option value="">Sofia Anaya</option>
                <option value="">Alonso Valencia</option>
                <option value="">Omar Vargas</option>
              </select>
            </div>

            <div className="flex w-full border-b gap-3 border-black font-normal">
              <button
                className={`px-3 rounded-t-[5px] w-[105px] ${vista === "proximos" ? "bg-[#17162E] text-white" : ""
                  }`}
                onClick={() => setVista("proximos")}
              >
                Próximos
              </button>
              <button
                className={`px-3 rounded-t-[5px] w-[105px] ${vista === "anteriores" ? "bg-[#17162E] text-white" : ""
                  }`}
                onClick={() => setVista("anteriores")}
              >
                Anteriores
              </button>
            </div>
          </div>

          {/* Contenido según la vista seleccionada */}
          <div className="mt-4">
            {vista === "proximos" ? (
              <div className="flex flex-col gap-5">

                <div className="flex gap-8 ">
                  <div className="flex gap-3 flex-col w-[310px] h-[150px] items-center justify-center bg-[#F0EFEF] border-[#AAA3A5] rounded-xl">
                    <h1>Añadir una nueva reunion</h1>
                    <button>
                      <img className="w-8" src={agregar} alt="" />
                    </button>
                  </div>

                  <div className="flex w-[310px] h-[150px] items-center ">
                    <div className="flex flex-col justify-center items-center rounded-l-xl h-full w-[104px] bg-[#054755] p-4 text-white">
                      <p>Marzo</p>
                      <h1 className="text-[30px]">2</h1>
                      <p className="text-[12px]">12:00 PM</p>
                    </div>
                    <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Entrega de avance</p>
                        <h1 className="text-[#666666]">Entrega del avance de metodologia</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
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
                    <div className="flex flex-col   w-full h-full  border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Reunion</p>
                        <h1 className="text-[#666666]">Reunión con el asesor para ver el estado del arte</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
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
                    <div className="flex flex-col   w-full h-full  border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Reunion</p>
                        <h1 className="text-[#666666]">Reunión con el asesor para ver el estado del arte</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
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
                    <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Entrega de avance</p>
                        <h1 className="text-[#666666]">Entrega del avance de metodologia</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
                        <img src={Zoom} alt="" />
                      </span>

                    </div>
                  </div>

                </div>

                <div className="flex gap-8 ">
                  <div className="flex w-[310px] h-[150px] items-center ">
                    <div className="flex flex-col justify-center items-center  rounded-l-xl  h-full w-[104px] bg-[#17162E] p-4 text-white">
                      <p>Marzo</p>
                      <h1 className="text-[30px]">2</h1>
                      <p className="text-[12px]">12:00 PM</p>
                    </div>
                    <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl  ">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Reunion</p>
                        <h1 className="text-[#666666]">Reunión con el asesor para ver el estado del arte</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
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
                    <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Entrega de avance</p>
                        <h1 className="text-[#666666]">Entrega del avance de metodologia</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
                        <img src={Zoom} alt="" />
                      </span>

                    </div>
                  </div>

                  <div className="flex w-[310px] h-[150px] items-center ">
                  </div>

                </div>


              </div>

            ) : (
              <div className="flex flex-col gap-5">

                <div className="flex gap-8 ">
                  <div className="flex w-[310px] h-[150px] items-center ">
                    <div className="flex flex-col justify-center items-center  rounded-l-xl  h-full w-[104px] bg-[#17162E] p-4 text-white">
                      <p>Marzo</p>
                      <h1 className="text-[30px]">2</h1>
                      <p className="text-[12px]">12:00 PM</p>
                    </div>
                    <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl  ">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Reunion</p>
                        <h1 className="text-[#666666]">Reunión con el asesor para ver el estado del arte</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
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
                    <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Entrega de avance</p>
                        <h1 className="text-[#666666]">Entrega del avance de metodologia</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
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
                    <div className="flex flex-col   w-full h-full  border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Reunion</p>
                        <h1 className="text-[#666666]">Reunión con el asesor para ver el estado del arte</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
                        <img src={Zoom} alt="" />
                      </span>

                    </div>
                  </div>
                </div>

                <div className="flex gap-8 ">
                  <div className="flex w-[310px] h-[150px] items-center ">
                    <div className="flex flex-col justify-center items-center  rounded-l-xl  h-full w-[104px] bg-[#17162E] p-4 text-white">
                      <p>Marzo</p>
                      <h1 className="text-[30px]">2</h1>
                      <p className="text-[12px]">12:00 PM</p>
                    </div>
                    <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl  ">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Reunion</p>
                        <h1 className="text-[#666666]">Reunión con el asesor para ver el estado del arte</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
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
                    <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Entrega de avance</p>
                        <h1 className="text-[#666666]">Entrega del avance de metodologia</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
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
                    <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Entrega de avance</p>
                        <h1 className="text-[#666666]">Entrega del avance de metodologia</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
                        <img src={Zoom} alt="" />
                      </span>

                    </div>
                  </div>

                </div>

                <div className="flex gap-8 ">
                  <div className="flex w-[310px] h-[150px] items-center ">
                    <div className="flex flex-col justify-center items-center  rounded-l-xl  h-full w-[104px] bg-[#17162E] p-4 text-white">
                      <p>Marzo</p>
                      <h1 className="text-[30px]">2</h1>
                      <p className="text-[12px]">12:00 PM</p>
                    </div>
                    <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl  ">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Reunion</p>
                        <h1 className="text-[#666666]">Reunión con el asesor para ver el estado del arte</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
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
                    <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Entrega de avance</p>
                        <h1 className="text-[#666666]">Entrega del avance de metodologia</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
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
                    <div className="flex flex-col   w-full h-full border bg-[#F0EFEF] border-[#AAA3A5] p-4 justify-between rounded-r-xl">
                      <span className="flex flex-col gap-[6px]">
                        <p className="font-medium">Entrega de avance</p>
                        <h1 className="text-[#666666]">Entrega del avance de metodologia</h1>
                      </span>
                      <span className="flex gap-8">
                        <a href=""><p className="font-medium">Enlace</p> </a>
                        <img src={Zoom} alt="" />
                      </span>

                    </div>
                  </div>

                </div>

              </div>

            )}
          </div>

        </div>
      </main>

    </LayoutApp>

  )
}

export default ReunionesAsesor