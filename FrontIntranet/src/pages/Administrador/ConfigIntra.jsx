import { useState } from "react";
import LayoutApp from '../../layout/LayoutApp'

const ConfigIntra = () => {
  const [vista, setVista] = useState("agregar-noticias");

  const renderVista = () => {
    switch (vista) {
      case "agregar-noticias":
        return (
          <>
            <h1 className="ml-5 text-[20px] font-medium">Agregar noticias</h1>
            <div className="flex flex-col">

              <div className="flex justify-between text-[#495D72] font-normal  p-[6px] rounded-md">
                <div className="w-[50px] flex justify-center">ID</div>
                <div className="w-[400px] flex justify-center">Titulo</div>
                <div className="w-[550px] flex justify-center">Descripcion</div>
                <div className="w-[200px] flex justify-center">URL imagen</div>
                <div className="w-[110px] flex justify-center">Editar</div>
                <div className="w-[110px] flex justify-center ">Eliminar</div>
              </div>

            </div>
            <div className="flex flex-col">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`flex justify-between text-[#2B2829] font-normal ${i % 2 === 0 ? "bg-[#E9E7E7]" : ""} p-[6px] rounded-md`}
                >
                  <div className="w-[50px] flex justify-center">001</div>
                  <div className="w-[400px] flex justify-center">Acceso a un nuevo modulo del intranet</div>
                  <div className="w-[550px] flex justify-center">Se ha agregado en la nueva actualización.....</div>
                  <div className="w-[200px] flex justify-center">./img/module-chat.jpg</div>
                  <button className="w-[110px] rounded-md px-3 bg-[#1C1C34] flex justify-center text-white text-[12px] items-center">Editar</button>
                  <button className="w-[110px] rounded-md px-3 bg-[#8F1313] flex justify-center text-white text-[12px] items-center">Eliminar</button>
                </div>
              ))}
            </div>
            <button className="mt-5 w-40 h-10 border rounded-xl text-[#5e98d3] border-[#5e98d3]">Noticias Nueva</button>
          </>
        );
      case "agregar-tutoriales":
        return (
          <>
            <h1 className="ml-5 text-[20px] font-medium">Agregar Tutoriales</h1>
            <div className="flex flex-col">

              <div className="flex justify-between text-[#495D72] font-normal  p-[6px] rounded-md">
                <div className="w-[50px] flex justify-center">ID</div>
                <div className="w-[400px] flex justify-center">Titulo</div>
                <div className="w-[550px] flex justify-center">Enlace</div>
                <div className="w-[110px] flex justify-center">Editar</div>
                <div className="w-[110px] flex justify-center ">Eliminar</div>
              </div>

            </div>
            <div className="flex flex-col">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`flex justify-between text-[#2B2829] font-normal ${i % 2 === 0 ? "bg-[#E9E7E7]" : ""} p-[6px] rounded-md`}
                >
                  <div className="w-[50px] flex justify-center">001</div>
                  <div className="w-[400px] flex justify-center">Acceso a un nuevo modulo del intranet</div>
                  <div className="w-[550px] flex justify-center">https://www.youtube.com/watch?v=Z2agbDaKaQc</div>
                  <button className="w-[110px] rounded-md px-3 bg-[#1C1C34] flex justify-center text-white text-[12px] items-center">Editar</button>
                  <button className="w-[110px] rounded-md px-3 bg-[#8F1313] flex justify-center text-white text-[12px] items-center">Eliminar</button>
                </div>
              ))}
            </div>
            <button className="mt-5 w-40 h-10 border rounded-xl text-[#5e98d3] border-[#5e98d3]">Tutoriales Nueva</button>
          </>
        );
      case "agregar-guias":
        return (
          <>
            <h1 className="ml-5 text-[20px] font-medium">Agregar Guías</h1>
            <div className="flex flex-col">

              <div className="flex justify-between text-[#495D72] font-normal  p-[6px] rounded-md">
                <div className="w-[50px] flex justify-center">ID</div>
                <div className="w-[400px] flex justify-center">Titulo</div>
                <div className="w-[550px] flex justify-center">Descripcion</div>
                <div className="w-[200px] flex justify-center">Url imagen</div>
                <div className="w-[200px] flex justify-center">Url doc</div>
                <div className="w-[110px] flex justify-center">Editar</div>
                <div className="w-[110px] flex justify-center ml-1">Eliminar</div>
              </div>

            </div>
            <div className="flex flex-col">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`flex justify-between items-center text-[#2B2829] font-normal ${i % 2 === 0 ? "bg-[#E9E7E7]" : ""} p-[6px] rounded-md`}
                >
                  <div className="w-[50px] flex justify-center">001</div>
                  <div className="w-[400px] flex justify-center">Acceso a un nuevo modulo del intranet</div>
                  <div className="w-[550px] flex justify-center">Se ha agregado en la nueva actualización.....</div>
                  <div className="w-[200px] flex justify-center">./img/citado-en-apa.jpg</div>
                  <div className="w-[200px] flex justify-center">./doc/citado-en-apa.docx</div>
                  <button className="w-[110px] h-[30px] rounded-md px-3 bg-[#1C1C34] flex justify-center text-white text-[12px] items-center">Editar</button>
                  <button className="w-[110px] h-[30px] rounded-md px-3 bg-[#8F1313] flex justify-center ml-1 text-white text-[12px] items-center">Eliminar</button>
                </div>
              ))}
            </div>
            <button className="mt-5 w-40 h-10 border rounded-xl text-[#5e98d3] border-[#5e98d3]">Guias Nueva</button>
          </>
        );
      case "agregar-herramientas":
        return (
          <>
            <h1 className="ml-5 text-[20px] font-medium">Agregar Herramientas</h1>
            <div className="flex flex-col">

              <div className="flex justify-between text-[#495D72] font-normal  p-[6px] rounded-md">
                <div className="w-[50px] flex justify-center">ID</div>
                <div className="w-[200px] flex justify-center">Titulo</div>
                <div className="w-[550px] flex justify-center">Descripcion</div>
                <div className="w-[200px] flex justify-center">Url imagen</div>
                <div className="w-[200px] flex justify-center">Enlace programa</div>
                <div className="w-[110px] flex justify-center">Editar</div>
                <div className="w-[110px] flex justify-center ">Eliminar</div>
              </div>

            </div>
            <div className="flex flex-col">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`flex justify-between text-[#2B2829] font-normal ${i % 2 === 0 ? "bg-[#E9E7E7]" : ""} p-[6px] rounded-md`}
                >
                  <div className="w-[50px] flex justify-center">001</div>
                  <div className="w-[200px] flex justify-center">Python</div>
                  <div className="w-[550px] flex justify-center">Python es el lenguaje mas verstil que sirve para muchas </div>
                  <div className="w-[200px] flex justify-center">./img/citado-en-apa.jpg</div>
                  <div className="w-[200px] flex justify-center">./doc/citado-en-apa.docx</div>
                  <button className="w-[110px] rounded-md px-3 bg-[#1C1C34] flex justify-center text-white text-[12px] items-center">Editar</button>
                  <button className="w-[110px] rounded-md px-3 bg-[#8F1313] flex justify-center text-white text-[12px] items-center">Eliminar</button>
                </div>
              ))}
            </div>
            <button className="mt-5 w-40 h-10 border rounded-xl text-[#5e98d3] border-[#5e98d3]">Herramienta Nueva</button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <LayoutApp>
      <main className="flex flex-col mx-32 items-start">
        <div className="flex flex-col gap-[10px] ml-8 px-[40px] py-5 w-full h-auto bg-white rounded-[10px]">
          <div className="flex flex-col gap-[12px]">
            <div className="mt-5 flex justify-between">
              <h2 className="text-2xl font-bold">Configuración Intranet</h2>
            </div>

            <div className="flex w-full border-b-2 gap-3 border-black font-normal">
              {["agregar-noticias", "agregar-tutoriales", "agregar-guias", "agregar-herramientas"].map((opcion) => (
                <button
                  key={opcion}
                  className={`px-3 rounded-t-[5px] w-[210px] h-10 ${vista === opcion ? "bg-[#17162E] text-white" : ""
                    }`}
                  onClick={() => setVista(opcion)}
                >
                  {opcion.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 w-full">
            {renderVista()}
          </div>
        </div>
      </main>
    </LayoutApp>
  );
};

export default ConfigIntra;
