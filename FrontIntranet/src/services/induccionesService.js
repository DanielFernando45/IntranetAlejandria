import axios from "axios"

const registrarInduccion = async (body) => {

    try {
        const { data } = await axios.post('http://localhost:3001/inducciones', body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    } catch (error) {
        return error.message ? error.message : 'Error al intentar registrar la inducción'
    }
}

const obtenerInduccionesByIdAsesoria = async (idAsesoramiento) => {
    console.log(typeof idAsesoramiento)
    try {
        const { data } = await axios.get(`http://localhost:3001/inducciones/induccionesByAsesoria/${idAsesoramiento}`)
        return data;
    } catch (error) {
        return error.message ? error.message : 'Error al intentar registrar la inducción'
    }
}


const borrarInduccionById = async (idAsesoramiento) => {
    try {
        return { data } = await axios.delete(`http://localhost:3001/inducciones/${idAsesoramiento}`)
    } catch (error) {
        return error.message ? error.message : 'Error al intentar borrar la inducción'
    }
}

export const induccionesService = {
    registrarInduccion,
    obtenerInduccionesByIdAsesoria,
    borrarInduccionById
}