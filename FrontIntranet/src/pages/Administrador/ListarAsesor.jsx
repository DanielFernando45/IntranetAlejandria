import React from 'react'
import Buscar from "../../Components/Administrador/GestionarUsuario/Buscar";
import { useNavigate } from "react-router-dom";

const ListarAsesor = () => {

    const navigate = useNavigate();

    const handlerAgregarAsesor = () => {
        navigate('/admin/gestionar-usuarios/agregar-asesor')
    }

    const handleEditarAsesor = (id) => navigate(`/admin/gestionar-usuarios/editar-asesor/${id}`);

    const asesores = [
        {
            id: 1,
            nombre: "Antonio Jorge Cueva Lopez",
            area: "Ingeniería",
            especialidad: "Ing. Civil",
            universidad: "U. San Ignacio de Loyola"
        },
        {
            id: 2,
            nombre: "María Elena Gómez",
            area: "Administración",
            especialidad: "Economía",
            universidad: "U. Privada del Norte"
        }
    ];


    return (
        <>
            <div className="flex flex-col gap-[12px]">

                <div className="flex justify-start">
                    <h2 className="text-2xl font-bold">CRUD</h2>

                </div>
                <Buscar></Buscar>

            </div>
            <div className="flex flex-col">
                <div className="flex justify-between text-[#495D72] font-medium p-[6px] rounded-md">
                    <div className="w-[40px] flex justify-center">ID</div>
                    <div className="w-[250px] flex justify-center">Asesor</div>
                    <div className="w-[250px] flex justify-center">Area</div>
                    <div className="w-[250px] flex justify-center">Especialidad</div>
                    <div className="w-[250px] flex justify-center">Universidad</div>
                    <div className="w-[110px] flex justify-center">Editar</div>
                    <div className="w-[110px] flex justify-center">Eliminar</div>
                </div>
                {asesores.map((asesor, index) => (
                    <div
                        key={asesor.id}
                        className={`flex justify-between items-center text-[#2B2829] font-normal p-[6px] rounded-md ${index % 2 === 0 ? "bg-white" : "bg-[#E9E7E7]"
                            }`}
                    >
                        <div className="w-[40px] flex justify-center">{asesor.id}</div>
                        <div className="w-[250px] flex justify-start">{asesor.nombre}</div>
                        <div className="w-[250px] flex justify-center">{asesor.area}</div>
                        <div className="w-[250px] flex justify-start">{asesor.especialidad}</div>
                        <div className="w-[250px] flex justify-start">{asesor.universidad}</div>
                        <button onClick={() => handleEditarAsesor(asesor.id)} className="w-[110px] rounded-md px-3 py-1 bg-[#1C1C34] flex justify-center text-white">Editar</button>
                        <button className="w-[110px] rounded-md px-3 py-1 bg-[#8F1313] flex justify-center text-white">Eliminar</button>
                    </div>
                ))}
            </div>

            <button onClick={handlerAgregarAsesor} className="flex justify-between text-white w-[230px] h-8 rounded font-semibold  bg-[#1B435D] px-6 py-1 mt-5">
                <p>Agregar Asesor</p>
            </button>


        </>

    )
}

export default ListarAsesor