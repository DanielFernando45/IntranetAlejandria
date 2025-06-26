import React, { useState, useEffect } from 'react';
import AgregarNoticias from './BotonesConfig/AgregarNoticias';
import EditarNoticias from './BotonesConfig/EditarNoticias';
import axios from "axios";

const Noticias = () => {
    const [noticias, setNoticias] = useState([]);
    const [showAgregarNoticias, setShowAgregarNoticias] = useState(false);
    const [editNoticias, setEditNoticias] = useState(false);
    const [editId, setEditId] = useState(false);

    useEffect(() => {
        fetchNoticias();
    }, []);

    const fetchNoticias = () => {
        axios.get("http://localhost:3001/recursos/noticias/all")
            .then((res) => {
                setNoticias(res.data);
            })
            .catch((err) => console.error("Error al obtener noticias:", err));
    };

    const handleEditar = (id) => {
        setEditNoticias(true);
        setEditId(id);
    }

    const handleEliminar = (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta noticia?")) {
            axios.delete(`http://localhost:3001/recursos/noticias/delete/${id}`)
                .then(() => {
                    // Actualizar el estado eliminando la noticia
                    setNoticias(noticias.filter(noticia => noticia.id !== id));
                    alert("Noticia eliminada correctamente");
                    location.reload();
                })
                .catch((err) => {
                    console.error("Error al eliminar noticia:", err);
                    alert("Error al eliminar noticia");
                });
        }
    }

    return (
        <>
            <h1 className="ml-5 text-[20px] font-medium">Agregar Noticias</h1>
            <div className="flex flex-col">
                <div className="flex justify-between text-[#495D72] font-normal p-[6px] rounded-md">
                    <div className="w-[50px] flex justify-center">ID</div>
                    <div className="w-[400px] flex justify-center">Titulo</div>
                    <div className="w-[550px] flex justify-center">Descripcion</div>
                    <div className="w-[200px] flex justify-center">URL imagen</div>
                    <div className="w-[110px] flex justify-center">Editar</div>
                    <div className="w-[110px] flex justify-center">Eliminar</div>
                </div>
            </div>

            {noticias.map((noticia, index) => (
                <div className="flex flex-col" key={noticia.id}>
                    <div
                        className={`flex justify-between text-[#2B2829] font-normal ${index % 2 === 0 ? "bg-[#E9E7E7]" : ""
                            } p-[6px] rounded-md`}
                    >
                        <div className="w-[50px] flex justify-center">{noticia.id}</div>
                        <div className="w-[400px] flex justify-start">{noticia.titulo}</div>
                        <div className="w-[550px] flex justify-start">{noticia.descripcion}</div>
                        <div className="w-[200px] flex justify-start truncate">{noticia.url_imagen}</div>
                        <button
                            onClick={() => handleEditar(noticia.id)}
                            className="w-[110px] rounded-md px-3 py-1 bg-[#1C1C34] flex justify-center items-center text-white"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => handleEliminar(noticia.id)}
                            className="w-[110px] rounded-md px-3 py-1 bg-[#8F1313] flex justify-center items-center text-white"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            ))}

            <button
                onClick={() => setShowAgregarNoticias(true)}
                className="mt-5 w-40 h-10 border rounded-xl text-[#5e98d3] border-[#5e98d3]"
            >
                Noticia Nueva
            </button>

            {/* Modal para agregar nueva noticia */}
            {showAgregarNoticias && (
                <AgregarNoticias
                    close={() => {
                        setShowAgregarNoticias(false);
                        fetchNoticias(); // Recargar noticias después de agregar
                    }}
                />
            )}

            {editNoticias && (
                <EditarNoticias
                    close={() => {
                        setEditNoticias(false);
                        fetchNoticias(); // Recargar noticias después de editar
                    }}
                    noticiaId={editId}
                />
            )}
        </>
    );
};

export default Noticias;