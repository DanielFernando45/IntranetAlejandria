import logoaleja from "../../assets/images/Aleja.svg"
import perfil from "../../assets/icons/PerfilIcon.svg"
import flecha from "../../assets/icons/Flecha.svg"

const EstudianteNavbar=() => {
  return (
    <nav className="bg-white fixed top-0 left-[100px] w-[calc(100%-6rem)]  flex h-[70px] p-[5px_19px] justify-between items-center ">
            
            <img src={logoaleja} className="w-[120px] h-16"></img>
            
          <div className="inline-flex items-start gap-4">
            <img src={perfil} alt="" />

            <div className="flex gap-2 ">
              <div className="flex flex-col">   
                  <span>Luis Muñoz</span>        
                  <span>Estudiante</span>
              </div>
                  <img  src={flecha} alt="" />
            </div>
            
          </div>
                
            
            
        </nav>
  );
}

export default EstudianteNavbar;