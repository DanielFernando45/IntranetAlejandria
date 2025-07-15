import { useQuery } from "@tanstack/react-query";
import LayoutApp from "../../../layout/LayoutApp";
import { asesoriasService } from "../../../services/asesoriasService";

const Induccion = () => {
  const { data: asesoramientos, isLoading } = useQuery({
    queryKey: ["asesoramientos"],
    queryFn: asesoriasService.asesorias,
  });

  console.log(asesoramientos);

  const handlerEditarEstudiante = () => {};

  const handleEliminarEstudiante = () => {};

  return (
    <LayoutApp>
      <main className="flex flex-col mx-32  items-start">
        <h2 className="text-3xl font-bold mb-5">
          Agregar Inducciones a asesorias
        </h2>

        <div className="flex flex-col gap-[10px] pt-3  px-[30px] py-[10px] w-full  bg-white border-b border-slate-300 rounded-t-lg shadow-lg">
          <div className="flex flex-col">
            <div className="flex justify-between text-[#495D72] font-medium p-[6px] rounded-md">
              <div className="w-[40px] flex justify-center">Id</div>
              <div className="flex-1 flex justify-center">Delegado</div>
              <div className="flex-1 flex justify-center">
                Profesión Asesoria
              </div>
              <div className="flex-1 flex justify-center">Fecha Asignación</div>
              <div className="flex-1 flex justify-center">Área</div>
              <div className="flex-1 flex justify-center">Acciones</div>
            </div>
          </div>
        </div>
        {isLoading
          ? "cargando..."
          : asesoramientos.map((asesoria, index) => (
              <div
                key={asesoria.id_asesoramiento}
                className={`flex w-full text-[#2B2829] font-normal p-[30px] rounded-md ${
                  index % 2 === 0 ? "bg-white" : "bg-[#E9E7E7]"
                }`}
              >
                <div className="w-[40px] flex justify-center">
                  {asesoria.id_asesoramiento}
                </div>
                <div className="flex-1 flex justify-start">
                  {asesoria.delegado}
                </div>
                <div className="flex-1 flex justify-center">
                  {asesoria.profesion_asesoria}
                </div>
                <div className="flex-1 flex justify-center">
                  {asesoria.fecha_inicio}
                </div>
                <div className="flex-1 flex justify-start"></div>
                <button
                  onClick={() => handlerEditarEstudiante(asesoria.id)}
                  className="w-[110px] rounded-md px-3 py-1 bg-[#1C1C34] flex justify-center text-white"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleEliminarEstudiante(asesoria.id)}
                  className="w-[110px] rounded-md px-3 py-1 bg-[#8F1313] flex justify-center text-white"
                >
                  Eliminar
                </button>
              </div>
            ))}
      </main>
    </LayoutApp>
  );
};

export default Induccion;
