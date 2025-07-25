import { useEffect, useState } from "react";
import LayoutApp from "../../layout/LayoutApp";
import Zoom from "../../assets/icons/IconEstudiante/ZoomLink.svg";
import download_icon from "../../assets/icons/download.png";
import play_icon from "../../assets/icons/play-white.png";

const ReunionesEstudiante = () => {
  const [asesorias, setAsesorias] = useState([]);
  const [selectedAsesoriaId, setSelectedAsesoriaId] = useState(null);
  const [proximasReuniones, setProximasReuniones] = useState([]);
  const [inducciones, setInducciones] = useState([]);
  const [loading, setLoading] = useState(true);

  // const { data: inducciones } = useQuery({
  //     queryKey: ['inducciones'],
  //     queryFn: induccionesService.obtenerInduccionesByIdAsesoria
  // })

  useEffect(() => {
    const usuario = localStorage.getItem("user");
    if (usuario) {
      const user = JSON.parse(usuario);
      const id = user.id;

      fetch(`http://localhost:3001/cliente/miAsesoramiento/${id}`)
        .then((res) => res.json())
        .then((data) => {
          const asesoriasArray = Object.values(data).map((item) => ({
            id: item.id,
            profesion: item.profesion_asesoria,
          }));
          setAsesorias(asesoriasArray);

          if (asesoriasArray.length > 0) {
            const primeraAsesoriaId = asesoriasArray[0].id;
            setSelectedAsesoriaId(primeraAsesoriaId);
          }
        })
        .catch((error) => console.error("Error al obtener asesorías:", error));
    }
  }, []);

    useEffect(() => {
        if (selectedAsesoriaId) {
            // Obtener reuniones en espera
            fetch(`http://localhost:3001/reuniones/espera/${selectedAsesoriaId}`)
                .then(res => res.json())
                .then(data => {
                    setProximasReuniones(data);
                })
                .catch(error => console.error('Error al obtener reuniones próximas:', error));

      // Obtener reuniones terminadas
      fetch(
        `http://localhost:3001/inducciones/induccionesByAsesoria/${selectedAsesoriaId}`
      )
        .then((res) => res.json())
        .then((data) => {
          setInducciones(data);
        })
        .catch((error) =>
          console.error("Error al obtener reuniones terminadas:", error)
        )
        .finally(() => setLoading(false));
    }
  }, [selectedAsesoriaId]);

  const handleChange = (e) => {
    const asesoriaId = e.target.value;
    setSelectedAsesoriaId(asesoriaId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { month: "long" };
    return {
      month: new Intl.DateTimeFormat("es-ES", options).format(date),
      day: date.getUTCDate(), // Usar getUTCDate para mantener consistencia
      time: date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "UTC", // Forzar a usar UTC para la hora
      }),
    };
  };

  const downloadFile = async (induccion) => {
    const response = await fetch(induccion.url);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <LayoutApp>
      <main className="flex justify-center ">
        <div className="flex flex-col gap-[40px] lg:ml-1 p-[20px]  w-full  bg-white rounded-[20px] ">
          <div className="flex flex-col gap-[12px]">
            <div className="flex justify-between flex-col sm:flex-row ">
              <h1 className="font-medium text-[20px]">Reuniones</h1>
              <select
                onChange={handleChange}
                value={selectedAsesoriaId || ""}
                className="border rounded-t-md border-[#b4a6aa]"
              >
                {asesorias.map((asesoria, index) => (
                  <option key={index} value={asesoria.id}>
                    {asesoria.profesion}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex w-full border-b-[3px] gap-3 border-black font-normal">
              <button className="px-3 rounded-t-[5px] w-[105px] bg-[#17162E] text-white">
                Próximos
              </button>
            </div>
          </div>

          {/* Contenido para reuniones próximas */}
          {loading ? (
            <p>Cargando...</p>
          ) : (
            <>
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap justify-start gap-6">
                  {proximasReuniones.map((reunion, index) => {
                    const formattedDate = formatDate(reunion.fecha_reunion);
                    return (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row w-full sm:w-[310px] h-auto sm:h-[170px] items-center"
                      >
                        <div
                          className={`flex flex-col justify-center items-center rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none w-full sm:w-[104px] h-[100px] sm:h-full bg-[#17162E] p-4 text-white`}
                        >
                          <p>{formattedDate.month}</p>
                          <h1 className="text-[30px]">{formattedDate.day}</h1>
                          <p className="text-[12px]">{formattedDate.time}</p>
                        </div>
                        <div className="flex flex-col justify-between w-full h-full border border-[#AAA3A5] bg-[#F0EFEF] p-4 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none">
                          <span className="flex flex-col gap-[6px]">
                            <p className="font-medium">{reunion.titulo}</p>
                            <h1 className="text-[#666666]">
                              Codigo: {reunion.meetingId}
                            </h1>
                          </span>
                          <div className="w-full px-5">
                            <button className="flex gap-4 justify-between px-1 h-12 items-center text-white rounded-2xl bg-[#1271ED]">
                              <a href={reunion.enlace_zoom} target="_blank">
                                <p className="font-medium">Enlace Zoom</p>
                              </a>
                              <img src={Zoom} alt="Zoom" className="w-6 h-6" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-[12px]">
                <div className="flex w-full border-b-[3px] gap-3 border-[#0CB2D5] font-normal">
                  <button className="px-3 rounded-t-[5px] w-[105px] bg-[#0CB2D5] text-white">
                    Anteriores
                  </button>
                </div>
              </div>

              {/* Contenido para reuniones terminadas */}
              <div className="flex flex-col gap-5">
                <div className="flex flex-wrap justify-start gap-6">
                  {inducciones.map((induccion, index) => {
                    console.log(induccion);
                    return (
                      <div
                        key={index}
                        className="flex flex-col sm:flex-row w-full sm:w-[310px] h-auto sm:h-[170px] items-center relative"
                      >
                        <img
                          src="/wp-induccion.jpg"
                          className="block w-full rounded-md"
                          alt="back_image-induccion"
                        />
                        <div className="absolute w-full h-full top-0 flex flex-col justify-between p-2">
                          <p className="text-white">{induccion?.titulo}</p>
                          <div className="flex justify-between text-white">
                            <button
                              onClick={downloadFile}
                              className="text-sm border border-white rounded-md  p-2 flex gap-1"
                            >
                              Descargar
                              <span>
                                <img src={download_icon} alt="download-icon" />
                              </span>
                            </button>
                            <a
                              href={induccion?.url}
                              target="_blank"
                              className="text-sm border border-white rounded-md  p-2 flex gap-1 items-center"
                            >
                              Ver
                              <span>
                                <img src={play_icon} alt="play-icon" />
                              </span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </LayoutApp>
  );
};

export default ReunionesEstudiante;
