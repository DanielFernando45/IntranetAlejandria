import React, { useState, useEffect } from 'react';
import AgregarGuias from './BotonesConfig/AgregarGuias';
import EditarGuias from './BotonesConfig/EditarGuias';
import axios from "axios";

const Guias = () => {
    const [guias, setGuias] = useState([]);
    const [showAgregarGuias, setShowAgregarGuias] = useState(false);
    const [editGuias, setEditGuias] = useState(false);
    const [editId, setEditId] = useState(false);

    useEffect(() => {
        fetchGuias();
    }, []);

    const fetchGuias = () => {
        axios.get("http://localhost:3001/recursos/guias/all")
            .then((res) => {
                setGuias(res.data);
            })
            .catch((err) => console.error("Error al obtener guías:", err));
    };

    const handleEditar = (id) => {
        setEditGuias(true);
        setEditId(id);
    }

    const handleEliminar = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta guía?")) {
            axios.delete(`http://localhost:3001/recursos/guias/delete/${id}`)
                .then(() => {
                    setGuias(guias.filter(guia => guia.id !== id));
                    alert("Guía eliminada correctamente");
                })
                .catch((err) => {
                    console.error("Error al eliminar guía:", err);
                    alert("Error al eliminar guía");
                });
        }
    }

    return (
        <>
            <h1 className="ml-5 text-[20px] font-medium">Agregar Guías</h1>
            <div className="flex flex-col">
                <div className="flex justify-between text-[#495D72] font-normal p-[6px] rounded-md">
                    <div className="w-[50px] flex justify-center">ID</div>
                    <div className="w-[250px] flex justify-center">Título</div>
                    <div className="w-[400px] flex justify-center">Descripción</div>
                    <div className="w-[200px] flex justify-center">URL imagen</div>
                    <div className="w-[200px] flex justify-center">Documento PDF</div>
                    <div className="w-[110px] flex justify-center">Editar</div>
                    <div className="w-[110px] flex justify-center">Eliminar</div>
                </div>
            </div>

            {guias.map((guia, index) => (
                <div className="flex flex-col" key={guia.id}>
                    <div
                        className={`flex justify-between text-[#2B2829] font-normal ${index % 2 === 0 ? "bg-[#E9E7E7]" : ""
                            } p-[6px] rounded-md`}
                    >
                        <div className="w-[50px] flex justify-center">{guia.id}</div>
                        <div className="w-[250px] flex justify-start">{guia.titulo}</div>
                        <div className="w-[400px] flex justify-start truncate">{guia.descripcion}</div>
                        <div className="w-[200px] flex justify-center truncate">{guia.url_imagen}</div>
                        <div className="w-[200px] flex justify-center truncate">
                            <a href={guia.doc_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                                Ver documento
                            </a>
                        </div>
                        <button
                            onClick={() => handleEditar(guia.id)}
                            className="w-[110px] rounded-md px-3 py-1 bg-[#1C1C34] flex justify-center items-center text-white"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleEliminar(guia.id)}
                            className="w-[110px] rounded-md px-3 py-1 bg-[#8F1313] flex justify-center items-center text-white"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}

            <button
                onClick={() => setShowAgregarGuias(true)}
                className="mt-5 w-40 h-10 border rounded-xl text-[#5e98d3] border-[#5e98d3]"
            >
                Guía Nueva
            </button>

            {showAgregarGuias && (
                <AgregarGuias
                    close={() => {
                        setShowAgregarGuias(false);
                        fetchGuias();
                    }}
                />
            )}

            {editGuias && (
                <EditarGuias
                    close={() => {
                        setEditGuias(false);
                        fetchGuias();
                    }}
                    guiaId={editId}
                />
            )}
        </>
    );
};

export default Guias;