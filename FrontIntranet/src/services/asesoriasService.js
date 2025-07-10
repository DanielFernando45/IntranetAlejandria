import axios from "axios"


const asesoriasPorEstudiante = async (idEstudiante) => {
  try {
    const { data } = await axios.get(`http://localhost:3001/cliente/miAsesoramiento/${idEstudiante}`);
    return data;
  } catch (error) {
    console.error("Error al obtener las asesorías del estudiante:", error);
    // throw error;
  }
}


export const asesoriasService = {
  asesoriasPorEstudiante
}