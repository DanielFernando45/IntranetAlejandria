import LogoBlanco from '../assets/icons/Login/LogoAlejandria.svg'
import LogoUsuario from '../assets/icons/Login/user.svg'
import Candado from '../assets/icons/Login/passlock.svg'

import { Link } from "react-router-dom";

const Login = ({ }) => {
    
  
    return(
        <main className="min-h-screen w-screen flex items-center justify-center fondo_login">
          <div className="w-full flex justify-center">
                <form 
                    className="flex w-[410px] py-[150px] px-[60px] flex-col justify-center items-center gap-[47px] bg-transparent"
                    >
                        <img src={LogoBlanco} alt="Logo Alejandría" />

                        <div className="flex flex-col justify-center items-center gap-[25px] w-full bg-transparent">
                            
                            <div className="relative w-full">
                            <span className="absolute left-3 top-3 text-white">
                            <img src={LogoUsuario} alt="" />
                            </span>
                            <input
                                type="text"
                                className="bg-transparent w-full pl-10 pr-4 py-3 text-white  border border-white rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white"
                                placeholder="USUARIO"
                            />
                            </div>

                            <div className="relative w-full">
                            <span className="absolute left-3 top-3 text-white">
                                <img src={Candado} alt="" />
                            </span>
                            <input
                                type="password"
                                className="bg-transparent w-full pl-10 pr-4 py-3 text-white  border border-white rounded-[10px] focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-white"
                                placeholder="CONTRASEÑA"
                            />
                            </div>
                            <button 
                                
                                type="submit" 
                                className="w-full h-12 text-[#1C1C34]  bg-white rounded-sm"
                                >
                                    <Link to={"/estudiante/home"}> INICIAR SESIÓN </Link>
                                
                            </button>
                            <a href="" className="text-white text-right">OLVIDO SU CONTRASEÑA?</a>
                        </div>
                </form>
          </div>
        </main>
    );
}

export default Login;