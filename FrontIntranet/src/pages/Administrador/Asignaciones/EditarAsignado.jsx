import React, { useState, useEffect } from 'react';
import eliminar from "../../../assets/icons/delete.svg";
import Buscar from "../../../Components/Administrador/GestionarUsuario/Buscar";
import axios from "axios";
import LayoutApp from '../../../layout/LayoutApp';
import { useNavigate, useParams } from "react-router-dom";

const EditarAsignado = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [asesores, setAsesores] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [estudiantesBase, setEstudiantesBase] = useState([]);
  const [clientesSeleccionados, setClientesSeleccionados] = useState([]);
  const [clientesOcultos, setClientesOcultos] = useState([]);
  const [areaSeleccionada, setAreaSeleccionada] = useState("");
  const [asesorSeleccionado, setAsesorSeleccionado] = useState("");
  const [asesorSeleccionadoId, setAsesorSeleccionadoId] = useState(0);
  const [mostrarEspecialidad, setMostrarEspecialidad] = useState(false);
  const [cargando, setCargando] = useState(true);

  // Estados para los datos del formulario
  const [formData, setFormData] = useState({
    profesion_asesoria: "",
    tipo_servicio: "",
    id_contrato: 0,
    id_tipo_trabajo: 0,
    especialidad: "",
    fecha_inicio: "",
    fecha_fin: ""
  });

  const Atras = () => {
    navigate("/admin/asignaciones/listar-asignado");
  };

  // Función para obtener los asesores desde el endpoint filtrado por área
  const obtenerAsesores = async (areaId) => {
    try {
      const response = await axios.get(`http://localhost:3001/asesor/filter/${areaId}`);
      setAsesores(response.data);
    } catch (error) {
      console.error('Error al obtener los asesores:', error);
    }
  };

  // Función para obtener datos de un estudiante por ID
  const obtenerEstudiante = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/cliente/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error al obtener estudiante con ID ${id}:`, error);
      return null;
    }
  };

  // Cargar datos iniciales del asesoramiento
  const cargarDatosAsesoramiento = async () => {
    try {
      setCargando(true);
      const response = await axios.get(`http://localhost:3001/asesoramiento/listar/${id}`);
      const data = response.data;

      // Establecer datos del formulario
      setFormData({
        profesion_asesoria: data.tipo_trabajo,
        tipo_servicio: data.tipo_servicio || "",
        id_contrato: data.id_contrato,
        id_tipo_trabajo: data.id_tipo_trabajo,
        especialidad: data.especialidad || "",
        fecha_inicio: data.a_fecha_inicio.split('T')[0],
        fecha_fin: data.a_fecha_fin.split('T')[0]
      });

      // Mostrar especialidad si es necesario
      setMostrarEspecialidad(data.id_tipo_trabajo === 3 || data.id_tipo_trabajo === 4);

      // Cargar área y asesor
      const asesorResponse = await axios.get(`http://localhost:3001/asesor/${data.id_asesor}`);
      const asesorData = asesorResponse.data;
      setAreaSeleccionada(asesorData.id_area);
      setAsesorSeleccionado(`${asesorData.nombre} ${asesorData.apellido}`);
      setAsesorSeleccionadoId(data.id_asesor);

      // Cargar estudiantes (clientes)
      const estudiantesResponse = await axios.get("http://localhost:3001/cliente/filter/all");
      setEstudiantes(estudiantesResponse.data);
      setEstudiantesBase(estudiantesResponse.data);

      // Pre-seleccionar delegado y estudiantes
      const estudiantesSeleccionados = [];

      // Agregar delegado
      if (data.id_delegado) {
        const delegado = await obtenerEstudiante(data.id_delegado);
        if (delegado) estudiantesSeleccionados.push(delegado);
      }

      // Agregar estudiantes adicionales (estudiante2 a estudiante5)
      for (let i = 2; i <= 5; i++) {
        const estudianteId = data[`id_estudiante${i}`];
        if (estudianteId) {
          const estudiante = await obtenerEstudiante(estudianteId);
          if (estudiante) estudiantesSeleccionados.push(estudiante);
        }
      }

      setClientesSeleccionados(estudiantesSeleccionados);
      setClientesOcultos(estudiantesSeleccionados.map(e => e.id));

      setCargando(false);
    } catch (error) {
      console.error('Error al cargar datos del asesoramiento:', error);
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatosAsesoramiento();
  }, [id]);

  useEffect(() => {
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNumberInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value, 10) || 0
    });
  };

  const handleTipoTrabajoChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      id_tipo_trabajo: value
    });
    // Mostrar especialidad solo para Tesis Maestría (3) y Tesis Doctorado (4)
    setMostrarEspecialidad(value === 3 || value === 4);
  };

  const handleAsesorChange = (e) => {
    const selectedOption = asesores.find(a => `${a.nombre} ${a.apellido}` === e.target.value);
    setAsesorSeleccionado(e.target.value);
    setAsesorSeleccionadoId(selectedOption?.id || 0);
  };

  const handleEditarAsesoria = async () => {
    if (!confirm('¿Está seguro que desea guardar los cambios en esta asesoría?')) {
      return;
    }

    if (clientesSeleccionados.length === 0) {
      alert('Debe seleccionar al menos un cliente');
      return;
    }

    if (!asesorSeleccionadoId) {
      alert('Debe seleccionar un asesor');
      return;
    }

    if (!formData.profesion_asesoria || !formData.tipo_servicio || !formData.id_contrato ||
      !formData.id_tipo_trabajo || !formData.fecha_inicio || !formData.fecha_fin) {
      alert('Debe completar todos los campos obligatorios');
      return;
    }

    // Preparar el objeto para enviar
    const payload = {
      id_asesor: asesorSeleccionadoId,
      profesion_asesoria: formData.profesion_asesoria,
      tipo_servicio: formData.tipo_servicio,
      id_contrato: formData.id_contrato,
      id_tipo_trabajo: formData.id_tipo_trabajo,
      fecha_inicio: formData.fecha_inicio,
      fecha_fin: formData.fecha_fin,
      ...(formData.especialidad && { especialidad: formData.especialidad }),
      id_delegado: clientesSeleccionados[0].id
    };

    // Agregar estudiantes adicionales (estudiante2 a estudiante5)
    for (let i = 1; i < clientesSeleccionados.length; i++) {
      payload[`id_estudiante${i + 1}`] = clientesSeleccionados[i].id;
    }

    try {
      await axios.put(
        `http://localhost:3001/asesoramiento/editar_asesor/${id}`,
        payload
      );
      alert('Asesoría modificada correctamente');
      Atras();
    } catch (error) {
      console.error('Error al editar asesoría:', error);
      alert('Error al editar asesoría');
    }
  };

  if (cargando) {
    return (
      <LayoutApp>
        <main className="flex flex-col mx-32 items-center justify-center h-screen">
          <div className="text-xl">Cargando datos...</div>
        </main>
      </LayoutApp>
    );
  }
  return (
    <LayoutApp>
      <main className="flex flex-col mx-32 items-start">
        <div className='w-full ml-8 h-6 fondo_login rounded-t-xl'></div>
        <div className="flex flex-col gap-[10px] ml-8 pt-3 p-[30px] w-full bg-white rounded-b-xl drop-shadow-lg">
          <div className="flex flex-col gap-[12px]">
            <h2 className="text-2xl font-semibold">Editar Asignacion</h2>
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
                <div className="flex flex-wrap gap-2 mt-2">
                  {clientesSeleccionados.slice(1).map((cliente, index) => (
                    <div key={cliente.id} className="flex items-center border rounded px-2 py-1 bg-white shadow-sm">
                      <span className="text-sm">Estudiante {index + 2}: {cliente.nombre} {cliente.apellido}</span>
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
                  <button
                    onClick={() => handleElegirCliente(cliente)}
                    className="w-[110px] rounded-md px-3 bg-[#1C1C34] flex justify-center text-white"
                    disabled={clientesSeleccionados.length >= 5}
                  >
                    {clientesSeleccionados.length >= 5 ? "Límite" : "Elegir"}
                  </button>
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
                    setAsesorSeleccionadoId(0);
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
                  value={asesorSeleccionado}
                  onChange={handleAsesorChange}
                  className='border border-black rounded-md px-[14px] w-[555px] h-9'
                >
                  <option value="" disabled>Asesor</option>
                  {asesores.map(asesor => (
                    <option key={asesor.id} value={`${asesor.nombre} ${asesor.apellido}`}>
                      {asesor.nombre} {asesor.apellido}
                    </option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="flex items-center border rounded px-2 py-1 w-fit">
                {asesorSeleccionado}
                <button
                  onClick={() => {
                    setAsesorSeleccionado("");
                    setAsesorSeleccionadoId(0);
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
                  name="profesion_asesoria"
                  value={formData.profesion_asesoria}
                  onChange={handleInputChange}
                  className='border border-[#575051] rounded-lg px-[14px] w-[300px] h-9'
                />
              </div>
              <div className='flex gap-4 items-center'>
                <p>Tipo de contrato:</p>
                <select
                  name="id_contrato"
                  value={formData.id_contrato}
                  onChange={handleNumberInputChange}
                  className='border border-[#575051] rounded-lg px-[14px] w-[300px] h-9'
                >
                  <option value={0} disabled>Seleccionar</option>
                  <option value={1}>Contado/Avance/Individual</option>
                  <option value={2}>Contado/Plazo/Individual</option>
                  <option value={3}>Contado/Avance/Grupal</option>
                  <option value={4}>Contado/Plazo/Grupal</option>
                  <option value={5}>Cuotas/Avance/Individual</option>
                  <option value={6}>Cuotas/Plazo/Individual</option>
                  <option value={7}>Cuotas/Avance/Grupal</option>
                  <option value={8}>Cuotas/Plazo/Grupal</option>
                </select>
              </div>
            </div>

            <div className='flex gap-9 text-[#575051] '>
              <div className='flex gap-9 items-center'>
                <p>Tipo de servicio:</p>
                <select
                  name="tipo_servicio"
                  value={formData.tipo_servicio}
                  onChange={handleInputChange}
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
                  name="id_tipo_trabajo"
                  value={formData.id_tipo_trabajo}
                  onChange={handleTipoTrabajoChange}
                  className='border border-[#575051] rounded-lg px-[14px] w-[300px] h-9'
                >
                  <option value={0} disabled>Seleccionar</option>
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

            {mostrarEspecialidad && (
              <div className='flex gap-14 text-[#575051] items-center'>
                <p>Especialidad:</p>
                <input
                  type="text"
                  name="especialidad"
                  value={formData.especialidad}
                  onChange={handleInputChange}
                  className='border border-[#575051] rounded-lg px-[14px] w-[350px] h-9'
                />
              </div>
            )}
          </div>

          <div className='flex flex-col gap-8 mt-4 '>
            <h2 className='text-[20px] font-medium'>Fechas</h2>
            <div className='flex justify-start gap-28'>
              <div className='flex gap-4 text-[#575051] items-center'>
                <p>Fecha inicio:</p>
                <input
                  type="date"
                  name="fecha_inicio"
                  value={formData.fecha_inicio}
                  onChange={handleInputChange}
                  className='border border-black rounded-md px-[14px] w-[275px] h-9'
                />
              </div>
              <div className='flex gap-4 text-[#575051] items-center'>
                <p>Fecha final:</p>
                <input
                  type="date"
                  name="fecha_fin"
                  value={formData.fecha_fin}
                  onChange={handleInputChange}
                  className='border border-black rounded-md px-[14px] w-[275px] h-9'
                />
              </div>
            </div>
          </div>

          <div className='flex gap-5 justify-end mt-14'>
            <button
              onClick={Atras}
              className="flex justify-center w-[140px] h-8 rounded font-semibold border border-black px-6 py-1"
            >
              Cancelar
            </button>
            <button
              onClick={handleEditarAsesoria}
              className="flex justify-center text-white w-[140px] h-8 rounded font-semibold bg-[#1C1C34] px-6 py-1"
            >
              Guardar
            </button>
          </div>
        </div>
      </main>
    </LayoutApp>
  );
};

export default EditarAsignado;