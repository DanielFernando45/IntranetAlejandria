import React, { useState, useRef, useEffect } from 'react'
import eliminar from "../../../assets/icons/delete.svg"
import Buscar from "../../../Components/Administrador/GestionarUsuario/Buscar";
import busqueda from "../../../assets/icons/busqueda.svg";
import axios from "axios";

const ListarSinAsignar = () => {
  const [asesores, setAsesores] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudiantesBase, setEstudiantesBase] = useState([]);
  const [clientesSeleccionados, setClientesSeleccionados] = useState([]);
  const [clientesOcultos, setClientesOcultos] = useState([]);
  const [areaSeleccionada, setAreaSeleccionada] = useState("");
  const [asesorSeleccionado, setAsesorSeleccionado] = useState("");
  const [asesorSeleccionadoId, setAsesorSeleccionadoId] = useState(null);
  const [profesionAsesoria, setProfesionAsesoria] = useState("");
  const [tipoContrato, setTipoContrato] = useState("");
  const [tipoServicio, setTipoServicio] = useState("");
  const [tipoTrabajo, setTipoTrabajo] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Función para obtener los asesores desde el endpoint filtrado por área
  const obtenerAsesores = async (areaId) => {
    try {
      const response = await axios.get(`http://localhost:3001/asesor/filter/${areaId}`);
      setAsesores(response.data);
    } catch (error) {
      console.error('Error al obtener los asesores:', error);
    }
  };

  // useEffect para cargar estudiantes y asesores
  useEffect(() => {
    axios.get("http://localhost:3001/cliente/filter/sin_asignar")
      .then((res) => {
        setEstudiantes(res.data);
        setEstudiantesBase(res.data);
      })
      .catch((err) => console.log("Error al obtener estudiante", err));

    if (areaSeleccionada) {
      obtenerAsesores(areaSeleccionada);
    }
  }, [areaSeleccionada]);

  const formatearFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-PE");
  };

  const handleElegirCliente = (cliente) => {
    if (clientesSeleccionados.length < 5 && !clientesSeleccionados.find(c => c.id === cliente.id)) {
      setClientesSeleccionados([...clientesSeleccionados, cliente]);
      setClientesOcultos([...clientesOcultos, cliente.id]);
    }
  };

  const handleEliminarCliente = (clienteId) => {
    setClientesSeleccionados(clientesSeleccionados.filter(c => c.id !== clienteId));
    setClientesOcultos(clientesOcultos.filter(id => id !== clienteId));
  };

  const handleBuscar = (query) => {
    const filtro = query.toLowerCase();
    const resultado = estudiantesBase.filter(est => {
      return (
        est.id.toString().includes(filtro) ||
        est.dni?.toString().includes(filtro) ||
        `${est.nombre} ${est.apellido}`.toLowerCase().includes(filtro)
      );
    });
    setEstudiantes(resultado);
  };

  const handleReset = () => {
    setEstudiantes(estudiantesBase);
  };

  const handleAsignarAsesoramiento = async () => {
    if (!validateForm()) return;

    const data = {
      createAsesoramiento: {
        id_asesor: asesorSeleccionadoId,
        profesion_asesoria: profesionAsesoria,
        tipo_servicio: tipoServicio,
        id_contrato: tipoContrato,
        id_tipo_trabajo: tipoTrabajo,
        fecha_inicio: fechaInicio,
        fecha_fin: fechaFin
      },
      clientes: {
        delegado: clientesSeleccionados[0]?.id || null
      }
    };

    // Agregar clientes adicionales (si existen)
    clientesSeleccionados.slice(1).forEach((cliente, index) => {
      data.clientes[`id_cliente${index + 2}`] = cliente.id;
    });

    try {
      const response = await axios.post(
        "http://localhost:3001/asesoramiento/asignacion",
        data
      );
      console.log("Asesoramiento asignado:", response.data);
      alert("Asesoramiento asignado correctamente");
      resetForm();
    } catch (error) {
      console.error("Error al asignar asesoramiento:", error);
      alert("Error al asignar asesoramiento");
    }
  };

  const validateForm = () => {
    if (clientesSeleccionados.length === 0) {
      alert("Debe seleccionar al menos un cliente");
      return false;
    }
    if (!asesorSeleccionadoId) {
      alert("Debe seleccionar un asesor");
      return false;
    }
    if (!profesionAsesoria || !tipoContrato || !tipoServicio || !tipoTrabajo) {
      alert("Debe completar todos los campos de datos de trabajo");
      return false;
    }
    if (!fechaInicio || !fechaFin) {
      alert("Debe seleccionar fechas de inicio y fin");
      return false;
    }
    return true;
  };

  const resetForm = () => {
    setClientesSeleccionados([]);
    setClientesOcultos([]);
    setAreaSeleccionada("");
    setAsesorSeleccionado("");
    setAsesorSeleccionadoId(null);
    setProfesionAsesoria("");
    setTipoContrato("");
    setTipoServicio("");
    setTipoTrabajo("");
    setEspecialidad("");
    setFechaInicio("");
    setFechaFin("");
    setShowConfirmation(false);
  };

  const handleAsesorChange = (e) => {
    const selectedAsesorId = e.target.value;
    const selectedAsesor = asesores.find(a => a.id == selectedAsesorId);
    setAsesorSeleccionado(`${selectedAsesor.nombre} ${selectedAsesor.apellido}`);
    setAsesorSeleccionadoId(selectedAsesor.id);
  };

  return (
    <>
      <div className="flex flex-col gap-[12px]">
        <h2 className="text-2xl font-semibold">Clientes Sin Asignar</h2>
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-3">
            <h2 className="text-[20px] font-semibold mt-1">Delegado:</h2>
            {clientesSeleccionados[0] && (
              <div className="flex items-center border gap-1 rounded px-2 py-[5px] bg-white shadow-sm">
                <span className="text-sm">{clientesSeleccionados[0].nombre} {clientesSeleccionados[0].apellido}</span>
                <button onClick={() => handleEliminarCliente(clientesSeleccionados[0].id)}>
                  <img src={eliminar} alt="" />
                </button>
              </div>
            )}
          </div>

          {clientesSeleccionados.length > 1 && (
            <div className="flex gap-2 mt-2">
              {clientesSeleccionados.slice(1).map((cliente) => (
                <div key={cliente.id} className="flex items-center border rounded px-2 py-1 bg-white shadow-sm">
                  <span className="text-sm">{cliente.nombre} {cliente.apellido} </span>
                  <button onClick={() => handleEliminarCliente(cliente.id)}>
                    <img src={eliminar} alt="" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Buscar onBuscar={handleBuscar} onReset={handleReset} />

      <div>
        <div className="flex justify-between text-[#495D72] font-medium p-[6px] rounded-md">
          <div className="w-[40px] flex justify-center">ID</div>
          <div className="w-[300px] flex justify-center">Alumno</div>
          <div className="w-[250px] flex justify-center">Grado Academico</div>
          <div className="w-[160px] flex justify-center">Fecha de Creacion</div>
          <div className="w-[360px] flex justify-center">Carrera</div>
          <div className="w-[110px] flex justify-center">Accion</div>
        </div>

        {estudiantes.map((cliente, index) => (
          !clientesOcultos.includes(cliente.id) && (
            <div key={cliente.id} className={`flex justify-between text-[#2B2829] font-normal ${index % 2 === 0 ? 'bg-[#E9E7E7]' : ''} p-[6px] rounded-md`}>
              <div className="w-[40px] flex justify-center">{cliente.id}</div>
              <div className="w-[300px] flex justify-center">{cliente.nombre} {cliente.apellido} </div>
              <div className="w-[250px] flex justify-center">{cliente.gradoAcademico}</div>
              <div className="w-[160px] flex justify-center">{formatearFecha(cliente.fecha_creacion)}</div>
              <div className="w-[360px] flex justify-center">{cliente.carrera}</div>
              <button onClick={() => handleElegirCliente(cliente)} className="w-[110px] rounded-md px-3 bg-[#1C1C34] flex justify-center text-white">Elegir</button>
            </div>
          )
        ))}
      </div>

      <div className='flex flex-col gap-4 mt-6'>
        <h2 className='text-[20px] font-medium'>Asesor</h2>
        {!asesorSeleccionado ? (
          <div className='flex justify-between'>
            <select 
              value={areaSeleccionada} 
              onChange={(e) => { 
                setAreaSeleccionada(e.target.value); 
                setAsesorSeleccionado(""); 
                setAsesorSeleccionadoId(null);
              }} 
              className='border border-black rounded-md px-[14px] w-[275px] h-9'
            >
              <option value="" disabled>Áreas</option>
              <option value={1}>Negocios</option>
              <option value={2}>Social</option>
              <option value={3}>Salud</option>
              <option value={4}>Ingeniería</option>
              <option value={5}>Legal</option>
            </select>

            <select 
              value={asesorSeleccionadoId || ""} 
              onChange={handleAsesorChange} 
              className='border border-black rounded-md px-[14px] w-[555px] h-9'
            >
              <option value="" disabled>Asesor</option>
              {asesores.map(asesor => (
                <option key={asesor.id} value={asesor.id}>{asesor.nombre} {asesor.apellido}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex items-center border rounded px-2 py-1 w-fit">
            {asesorSeleccionado}
            <button 
              onClick={() => {
                setAsesorSeleccionado("");
                setAsesorSeleccionadoId(null);
              }} 
              className="ml-2 text-white border bg-[#0900FF] rounded-full w-5 h-5 flex items-center justify-center"
            >
              ×
            </button>
          </div>
        )}
      </div>

      <div className='flex flex-col gap-8 mt-5'>
        <h2 className='text-[20px] font-medium'>Datos de Trabajo</h2>

        <div className='flex gap-9 text-[#575051]'>
          <div className='flex gap-4 items-center'>
            <p>Profesión Asesoría:</p>
            <input 
              type="text" 
              value={profesionAsesoria}
              onChange={(e) => setProfesionAsesoria(e.target.value)}
              className='border border-[#575051] rounded-lg px-[14px] w-[300px] h-9' 
            />
          </div>
          <div className='flex gap-4 items-center'>
            <p>Tipo de contrato:</p>
            <select 
              value={tipoContrato}
              onChange={(e) => setTipoContrato(e.target.value)}
              className='border border-[#575051] rounded-lg px-[14px] w-[300px] h-9'
            >
              <option value="">Seleccionar</option>
              <option value={1}>Plazo/Al contado/Individual</option>
              <option value={2}>Plazo/Al contado/Grupal</option>
              <option value={3}>Plazo/Cuotas/Individual</option>
              <option value={4}>Plazo/Cuotas/Grupal</option>
              <option value={5}>Avance/Al contado/Individual</option>
              <option value={6}>Avance/Al contado/Grupal</option>
              <option value={7}>Avance/Cuotas/Individual</option>
              <option value={8}>Avance/Cuotas/Grupal</option>
            </select>
          </div>
        </div>

        <div className='flex gap-9 text-[#575051] '>
          <div className='flex gap-9 items-center'>
            <p>Tipo de servicio:</p>
            <select
              value={tipoServicio}
              onChange={(e) => setTipoServicio(e.target.value)}
              className='border border-[#575051] rounded-lg px-[14px] w-[250px] h-9'
            >
              <option value="">Seleccionar</option>
              <option value="completo">Completo</option>
              <option value="proyecto">Proyecto</option>
              <option value="inf.final">Inf.Final</option>
            </select>
          </div>

          <div className='flex gap-8 items-center'>
            <p>Tipo Trabajo:</p>
            <select 
              value={tipoTrabajo}
              onChange={(e) => setTipoTrabajo(e.target.value)}
              className='border border-[#575051] rounded-lg px-[14px] w-[300px] h-9'
            >
              <option value="">Seleccionar</option>
              <option value={1}>Proyecto Bachillerato</option>
              <option value={2}>Tesis</option>
              <option value={3}>Tesis Maestría</option>
              <option value={4}>Tesis Doctorado</option>
              <option value={5}>Plan de negocios</option>
              <option value={6}>Revisión sistemática</option>
              <option value={7}>Suficiencia profesional</option>
              <option value={8}>Estudio de prefactibilidad</option>
              <option value={9}>Articulo Cientifico</option>
            </select>
          </div>
        </div>

        <div className='flex gap-14 text-[#575051] items-center'>
          <p>Especialidad:</p>
          <input 
            type="text" 
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
            className='border border-[#575051] rounded-lg px-[14px] w-[350px] h-9' 
          />
        </div>
      </div>

      <div className='flex flex-col gap-8 mt-4 '>
        <h2 className='text-[20px] font-medium'>Fechas</h2>
        <div className='flex justify-start gap-28'>
          <div className='flex gap-4 text-[#575051] items-center'>
            <p>Fecha inicio:</p>
            <input 
              type="date" 
              value={fechaInicio}
              onChange={(e) => setFechaInicio(e.target.value)}
              className='border border-black rounded-md px-[14px] w-[275px] h-9' 
            />
          </div>
          <div className='flex gap-4 text-[#575051] items-center'>
            <p>Fecha final:</p>
            <input 
              type="date" 
              value={fechaFin}
              onChange={(e) => setFechaFin(e.target.value)}
              className='border border-black rounded-md px-[14px] w-[275px] h-9' 
            />
          </div>
        </div>
      </div>

      <div className='flex gap-5 justify-end mt-14'>
        <button 
          onClick={resetForm}
          className="flex justify-center w-[140px] h-8 rounded font-semibold border border-black px-6 py-1"
        >
          Cancelar
        </button>
        <button 
          onClick={() => setShowConfirmation(true)}
          disabled={clientesSeleccionados.length === 0 || !asesorSeleccionadoId}
          className={`flex justify-center text-white w-[140px] h-8 rounded font-semibold px-6 py-1 ${clientesSeleccionados.length === 0 || !asesorSeleccionadoId ? 'bg-gray-400' : 'bg-[#1C1C34]'}`}
        >
          Asignar
        </button>
      </div>

      {/* Modal de confirmación */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Confirmar Asignación</h3>
            <p className="mb-6">¿Está seguro que desea asignar estos clientes al asesor seleccionado?</p>
            <div className="flex justify-end gap-4">
              <button 
                onClick={() => setShowConfirmation(false)}
                className="px-4 py-2 border border-gray-300 rounded-md"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  handleAsignarAsesoramiento();
                  setShowConfirmation(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ListarSinAsignar;