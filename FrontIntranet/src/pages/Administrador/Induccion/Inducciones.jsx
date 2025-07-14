import { useQuery } from "@tanstack/react-query";
import LayoutApp from "../../../layout/LayoutApp";


const Induccion = () => {



    // const { asesoramientos } = useQuery({
    //     queryKey: ['asesoramientos'],
        
    // })


    return (
        <LayoutApp>
            <main className="flex flex-col mx-32  items-start">
                <h2 className="text-4xl font-bold ">Agregar Inducciones a asesorias</h2>


                <div className="flex flex-col gap-[10px] pt-3  p-[30px]   w-full  bg-white  rounded-b-[10px] drop-shadow-lg">

                    <div className="flex flex-col">
                        <div className="flex justify-between text-[#495D72] font-medium p-[6px] rounded-md">
                            <div className="w-[40px] flex justify-center">Id</div>
                            <div className="flex-1 flex justify-center">Delegado</div>
                            <div className="flex-1 flex justify-center">Profesión Asesoria</div>
                            <div className="flex-1 flex justify-center">Fecha Asignación</div>
                            <div className="flex-1 flex justify-center">Área</div>
                            <div className="flex-1 flex justify-center">Acciones</div>
                        </div>



                    </div>
                </div>
                {/* {estudiantes.map((estudiante, index) => (
          <div
            key={estudiante.id}
            className={`flex justify-between items-center text-[#2B2829] font-normal p-[6px] rounded-md ${index % 2 === 0 ? 'bg-white' : 'bg-[#E9E7E7]'}`}
          >
            <div className="w-[40px] flex justify-center">{estudiante.id}</div>
            <div className="w-[300px] flex justify-start">{estudiante.nombre} {estudiante.apellido}</div>
            <div className="w-[100px] flex justify-center">{formatearFecha(estudiante.datos_asesoramiento.fecha_inicio)}</div>
            <div className="w-[110px] flex justify-center">{formatearFecha(estudiante.datos_asesoramiento.fecha_fin)}</div>
            <div className="w-[360px] flex justify-start">{estudiante.carrera}</div>
            <div className="w-[250px] flex justify-start">{estudiante.datos_asesoramiento.contrato.nombre}{estudiante.datos_asesoramiento.contrato.message}</div>
            <button
               onClick={() => handlerEditarEstudiante(estudiante.id)}
               className="w-[110px] rounded-md px-3 py-1 bg-[#1C1C34] flex justify-center text-white"
            > 
               Editar
            </button>
            <button
               onClick={() => handleEliminarEstudiante(estudiante.id)}
               className="w-[110px] rounded-md px-3 py-1 bg-[#8F1313] flex justify-center text-white"
            > 
                Eliminar
            </button>
          </div>
        ))} */}
            </main>
        </LayoutApp>
    );
};

export default Induccion;
