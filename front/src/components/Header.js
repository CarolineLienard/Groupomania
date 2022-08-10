import Logo from '../assets/logo.svg'
import { Link, useNavigate } from "react-router-dom"

export default function Header() {
    let navigate = useNavigate()


    function logOut(){
        localStorage.clear();
        navigate('/login')
    }

    return(
        <div className="header flex align-center between">
            <img src={Logo} alt="" className="logo" />
            <div className="nav flex">            
                <Link to="/AddPost">Ajouter un post</Link>
                <button onClick={logOut}>Se déconnecter</button>
            </div>
        </div>
    )
}