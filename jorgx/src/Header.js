import logo from "./assets/JorgX_logo.png";

function Header() {

    return (
        <header>
            <img className="header-image" alt="logo" src={logo}></img>
        </header>
      );
}

export default Header;
