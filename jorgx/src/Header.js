import logo from "./assets/JorgX_logo.png";
import { Link } from "react-router-dom";
function Header() {

    return (
        
        <header>
            <Link to='/' className='no-decoration'>
            <img className="header-image" alt="logo" src={logo}></img>
            </Link>
        </header>
       
      );
}

export default Header;
