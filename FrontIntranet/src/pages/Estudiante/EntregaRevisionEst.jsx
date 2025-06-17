import LayoutApp from "../../layout/LayoutApp";
import { useState, useEffect } from "react";
import flechaAzul from "../../assets/icons/arrowAzul.svg"
import plus from "../../assets/icons/IconEstudiante/add.svg"
import EnvioArchivo from "../../Components/EnvioArchivos";
import { useNavigate, Outlet, useLocation } from "react-router-dom";
import MisEnvios from '../../pages/Estudiante/EntregasEnvio/MisEnviosCli'
import EnvioAsesor from '../../pages/Estudiante/EntregasEnvio/EnvioAsesor'

const EntregaRevisionEst = () => {
  const [showModal, setShowModal] = useState(false);
  const [asesorias, setAsesorias] = useState([]);
  const [selectedAsesoriaId, setSelectedAsesoriaId] = useState(null);
  const [docEnvio, setEnvio] = useState("MisEnvios");



  const navigate = useNavigate();
  const location = useLocation();

  const isTerminados = location.pathname.includes("terminados");
  const isPendientes = location.pathname.includes("pendientes")

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      const user = JSON.parse(userString);
      const id = user.id;

      fetch(`http://localhost:3001/cliente/miAsesoramiento/${id}`)
        .then(res => res.json())
        .then(data => {
          const asesoriasArray = Object.values(data).map(item => ({
            id: item.id,
            profesion: item.profesion_asesoria
          }));
          setAsesorias(asesoriasArray);

          if (asesoriasArray.length > 0) {
            const primeraAsesoriaId = asesoriasArray[0].id;
            setSelectedAsesoriaId(primeraAsesoriaId);

          }
        })
        .catch(error => console.error('Error al obtener asesorías:', error));
    }
  }, []);

  const handleChange = (e) => {
    const asesoriaId = e.target.value;
    setSelectedAsesoriaId(asesoriaId);
  }

  

  return (
    <LayoutApp>
      <main className="flex flex-col gap-3 mx-5 items-start p-5">

        <div className="flex ml-8 justify-between w-full">
          <button className="flex justify-between px-3 rounded-lg bg-white w-[180px] items-center font-medium" 
            onClick={() => setShowModal(true)}>
            <p>Nuevo Avance</p>
            <img className="" src={plus} alt="" />
          </button>
          <select
            className='border-2 rounded-md px-2 border-black'
            onChange={handleChange}
            value={selectedAsesoriaId || ''}
          >
            {asesorias.map((asesoria, index) => (
              <option key={index} value={asesoria.id}>{asesoria.profesion}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-[10px] ml-8 px-[40px] py-5 w-full h-[400px] bg-white rounded-[10px]">
          <div className="flex flex-col gap-[12px]">

            <div className=" mt-5 flex justify-between">
              <h2 className="text-2xl font-bold">Asuntos</h2>
              <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
                <a href="">Ver todo</a>
                <img src={flechaAzul} alt="" />
              </span>
            </div>

            <div className="flex w-full border-b-2 gap-3 border-black font-normal">
              <button
                className={`px-3 rounded-t-[5px] w-[115px] ${isTerminados ? "bg-[#17162E] text-white" : ""
                  }`}
                onClick={() => navigate("terminados")}
              >
                Terminados
              </button>
              <button
                className={`px-3 rounded-t-[5px] w-[105px] ${isPendientes ? "bg-[#17162E] text-white" : ""
                  }`}
                onClick={() => navigate("pendientes")}
              >
                Pendientes
              </button>
            </div>
          </div>


          <div>
            <Outlet context={selectedAsesoriaId} />

          </div>


        </div>

        <div className="flex flex-col gap-[10px] ml-8 p-[20px] w-full  bg-white rounded-[10px]">

          <div className="flex justify-between  ">
            <h2 className="text-2xl font-bold">Documentos</h2>
            <span className="flex justify-end gap-1 items-center font-medium text-[#2F80ED]">
              <a href="">Ver todo</a>
              <img src={flechaAzul} alt="" />
            </span>
          </div>
          <div className="flex w-full border-b-2 gap-3 border-black font-normal">
            <button
              className={`px-3 rounded-t-[5px] w-[115px] ${docEnvio === "MisEnvios" ? "bg-[#17162E] text-white" : ""
                }`}
              onClick={() => setEnvio("MisEnvios")}
            >
              Mis envíos
            </button>
            <button
              className={`px-3 rounded-t-[5px] w-[135px] ${docEnvio === "EnviosAsesor" ? "bg-[#17162E] text-white" : ""
                }`}
              onClick={() => setEnvio("EnviosAsesor")}
            >
              Envíos asesor
            </button>
          </div> 

          <div>
            {
              docEnvio === "MisEnvios" ? (
                <MisEnvios idAsesoramiento={selectedAsesoriaId}/>
              ) : (
                <EnvioAsesor idAsesoramiento={selectedAsesoriaId}/>
              )
            }
          </div>


        </div>


        <EnvioArchivo
          show={showModal}
          onClose={() => setShowModal(false)}
          asesoriaId={selectedAsesoriaId}
        />
      </main>
    </LayoutApp>

  )

}
export default EntregaRevisionEst;