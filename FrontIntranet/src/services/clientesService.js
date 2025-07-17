import axios from "axios";

const estudiantesPorAsignacion = async (idAsesoramiento) => {
  const { data } = await axios.get(
    `http://localhost:3001/cliente/listar/${idAsesoramiento}`
  );
  return data;
};
export const clientesService = {
  estudiantesPorAsignacion,
};
