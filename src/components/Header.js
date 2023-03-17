import logo from '../images/logo/logo.svg'
function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Логотип с надписью Место" className="header__logo" />
        </header>
    )
}

export default Header