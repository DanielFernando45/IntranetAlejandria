
import EstudianteSidebar from "../Components/Sidebar/EstudianteSidebar"
import EstudianteNavbar from "../Components/Navbar/EstudianteNavbar"

const LayoutApp = ({children}) =>{
    return(
        <div>
            <EstudianteSidebar/>
            <EstudianteNavbar/>
            {children}
        </div>
    );
}
export default LayoutApp;