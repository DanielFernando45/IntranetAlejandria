import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/authContext';
import LogoBlanco from '../assets/icons/Login/LogoAlejandria.svg';
import LogoUsuario from '../assets/icons/Login/user.svg';
import Candado from '../assets/icons/Login/passlock.svg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const  {login}  = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3001/auth/login', {
        username,
        password
      });

      const { access_token, datos_usuario } = res.data;

      // Guardamos en AuthContext
      login({ ...datos_usuario, access_token });

      // Redirigimos según el rol
      switch (datos_usuario.role) {
        case 'admin':
          navigate('/admin/gestionar-usuarios');
          break;
        case 'asesor':
          navigate('/asesor/home');
          break;
        case 'estudiante':
          navigate('/estudiante/home');
          break;
        default:
          navigate('/');
      }

    } catch (err) {
      console.error(err);
      setError('Usuario o contraseña incorrecta');
    }
  };

  return (
    <main className="min-h-screen w-screen flex items-center justify-center fondo_login">
      <div className="w-full flex justify-center">
        <form
          className="flex w-[410px] py-[150px] px-[60px] flex-col justify-center items-center gap-[47px] bg-transparent"
          onSubmit={handleSubmit}
        >
          <img src={LogoBlanco} alt="Logo Alejandría" />
          <div className="flex flex-col justify-center items-center gap-[25px] w-full bg-transparent">
            <div className="relative w-full">
              <span className="absolute left-3 top-3 text-white">
                <img src={LogoUsuario} alt="" />
              </span>
              <input
                type="text"
                className="bg-transparent w-full pl-10 pr-4 py-3 text-white border border-white rounded-[10px] placeholder-white"
                placeholder="USUARIO"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="relative w-full">
              <span className="absolute left-3 top-3 text-white">
                <img src={Candado} alt="" />
              </span>
              <input
                type="password"
                className="bg-transparent w-full pl-10 pr-4 py-3 text-white border border-white rounded-[10px] placeholder-white"
                placeholder="CONTRASEÑA"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p className="text-red-400 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full h-12 text-[#1C1C34] bg-white rounded-sm"
            >
              INICIAR SESIÓN
            </button>

            <a href="/recuperarContraseña" className="text-white text-right">
              ¿OLVIDÓ SU CONTRASEÑA?
              
            </a>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
