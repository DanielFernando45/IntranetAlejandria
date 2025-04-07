import {  Routes,Route } from "react-router-dom";
import React,{Suspense} from "react";
import spinner from "./assets/icons/spinner.svg";

const Login = React.lazy(()=> import("./pages/LoginUser"));
const HomeEstudiante = React.lazy(()=> import("./pages/Estudiante/HomeEstudiante"));
const ReunionesEstudiante = React.lazy(()=> import("./pages/Estudiante/ReunionesEstudiante"));
const EntregaRevision = React.lazy(()=> import("./pages/Estudiante/EntregaRevisionEst"));

export  const App = () => {
  return (
    <Suspense
     fallback={
        <div className="bg-[#1c1c34] min-h-screen flex items-center justify-center">
         <img
           src={spinner}
           className="w-[100px] h-[200px] animate-spin"
           alt="spinner"
         />
        </div>
      }
    >
      <Routes>
      <Route path="/" element={<Login/>}/>  
      <Route path="/estudiante/home" element={<HomeEstudiante/>} />
      <Route path="/estudiante/reuniones" element={<ReunionesEstudiante/>}/>
      <Route path="/estudiante/entrega" element={<EntregaRevision/>}/>
    </Routes>
    </Suspense>
    
  );
}


