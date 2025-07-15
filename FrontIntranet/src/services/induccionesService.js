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


export const induccionesService = {
    registrarInduccion,
    obtenerInduccionesByIdAsesoria
}