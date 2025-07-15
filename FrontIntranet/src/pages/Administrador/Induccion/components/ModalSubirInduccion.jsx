import { useMutation } from "@tanstack/react-query";
import { induccionesService } from "../../../../services/induccionesService";
import { useRef, useState } from "react";

const ModalSubirInduccion = ({ openModal, setOpenModal, idSeleccionado, setIdSeleccionado }) => {

    const [capitulo, setCapitulo] = useState('');
    const [titulo, setTitulo] = useState('');
    // const [file,setFile] = useState(null);
    const file = useRef()

    const clearState = () => {
        setCapitulo('')
        setTitulo('')
        file.current.value = null;
        setOpenModal(false)
        setIdSeleccionado(null)
    }

    const mutate = useMutation({
        mutationFn: (body) => induccionesService.registrarInduccion(body),
        onSuccess: () => {
            alert('Inducción registrada correctamente');
            clearState();
        },
        onError: (error) => {
            alert('Error al registrar la inducción');
            console.error(error);
        }
    })

    const handleSubmitInduccion = () => {
        if ([capitulo.trim(), titulo.trim()].some(field => field == '')) {
            return alert('Ingrese todos los campos')
        }

        const selectedFile = file.current?.files?.[0];
        if (!selectedFile) {
            return alert('Debe seleccionar un archivo');
        }

        if (selectedFile.type !== 'video/mp4') {
            return alert('Solo se permiten archivos .mp4');
        }

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('capitulo', capitulo);
        formData.append('url', ''); // si luego la vas a llenar en backend
        formData.append('asesoramiento', String(idSeleccionado)); // obligatorio como string por FormData
        formData.append('video', selectedFile); // debe coincidir con @UploadedFile('video')
        mutate.mutateAsync(formData)
    }

    return (
        <div onClick={() => { setOpenModal(false) }} className={`${openModal ? 'block' : 'hidden'} fixed inset-0 bg-black bg-opacity-50 z-[99] flex items-center justify-center`}>
            <div onClick={(event) => { event.stopPropagation() }} className="space-y-4 p-6 rounded-lg w-[90%] max-w-[600px] bg-[#f8f7f7]">
                <h2 className="text-2xl font-semibold text-center">Agregar Inducción</h2>

                <div className="flex gap-x-4">
                    <div className="flex flex-col gap-2 justify-between">
                        <label className="block flex-1">Capitulo:</label>
                        <label className="block flex-1">Inducción:</label>
                        <label className="block flex-1">Archivo Video:</label>
                    </div>

                    <div className="flex flex-1 flex-col gap-2 justify-between">
                        <input value={capitulo} onChange={(event) => setCapitulo(event.target.value)} type="text" className="border block border-gray-300 rounded-sm p-2 outline-none" />
                        <input value={titulo} onChange={(event) => setTitulo(event.target.value)} type="text" className="border block border-gray-300 rounded-sm p-2 outline-none" />
                        <div className="border border-gray-300 rounded-sm p-2">
                            <input type="file" ref={file} accept="video/mp4" />
                        </div>
                        {/* <input type="text" className="border block border-gray-300 rounded-sm p-2 outline-none" /> */}
                    </div>
                </div>

                <button className={`bg-[#DAD6D7] py-2 block px-6 rounded-md mx-auto ${mutate.isPending && 'opacity-50'}`} disabled={mutate.isPending} onClick={handleSubmitInduccion}>Subir Video</button>

                {mutate.isPending &&
                    <div className="flex justify-center w-full" role="status">
                        <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                }
            </div>
        </div>
    );
};

export default ModalSubirInduccion;
