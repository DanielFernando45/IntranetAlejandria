import axios from "axios"

const tiposContratos = async () => {
    const response = axios.get(`http://localhost:3001/common/listar-tipoContratos`);
    return response;
}

const tiposTrabajos = async () => {
    const response = axios.get(`http://localhost:3001/common/listar-trabajos`);
    return response;
}

export const trabajosService = {
  tiposContratos,
  tiposTrabajos
}