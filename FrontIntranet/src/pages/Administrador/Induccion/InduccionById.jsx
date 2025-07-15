import { useQuery } from "@tanstack/react-query";
import LayoutApp from "../../../layout/LayoutApp";
import { useParams } from "react-router-dom";
import { induccionesService } from "../../../services/induccionesService";
import { asesoriasService } from "../../../services/asesoriasService";

const InduccionById = () => {

    const { id } = useParams();
    console.log(id)

    const { data: induccionesByIdAsesoramiento, isLoading } = useQuery({
        queryKey: ["induccionesByIdAsesoramiento"],
        queryFn: () => induccionesService.obtenerInduccionesByIdAsesoria(id),
        refetchOnWindowFocus: false
    });

    const { data: asesoramientoById, isLoading: asesoramientoByIdLoading } = useQuery({
        queryKey: ["asesoramientoById"],
        queryFn: () => asesoriasService.asesoramientoById(id),
        refetchOnWindowFocus: false
    });





    return (
        // <div className="bg-red-400 absolute top-0 left-0 z-[99]">
        <LayoutApp>
            {isLoading ? 'Cargando...' : <div>
                <h3 className="text-2xl font-semibold">{induccionesByIdAsesoramiento[0].asesoramiento.profesion_asesoria}</h3>

                <div className="space-y-2">
                    <p className="font-semibold">Delegado: <span className="font-light ml-2">{asesoramientoById[0].delegado}</span></p>
                    <p className="font-semibold">Integrantes: </p>
                    <ul className="list-style">
                        {asesoramientoById[0]?.estudiantes.map(item => (
                            <li className="list-style">{item.estudiante}</li>
                        ))}
                    </ul>
                    <p>Área: {asesoramientoById[0]?.area}</p>
                    <p className="text-xl font-semibold">Videos:</p>
                    <hr className="h-1 bg-black" />
                    {
                        induccionesByIdAsesoramiento.map(item => (
                            <div>
                                <video width={300} key={item.id} src={item.url} controls poster="/poster.jpg"></video>
                            </div>
                        ))
                    }
                </div>
            </div>}
        </LayoutApp>
        // </div>
    );
};

export default InduccionById;
