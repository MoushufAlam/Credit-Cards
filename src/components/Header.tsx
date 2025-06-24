import logo from '../../public/assets/logo.svg'
import logoName from '../../public/assets/logoName.png'

function Header() {
    return (
        <div className="w-100 bg-white fixed-top d-flex align-items-center px-5 py-0" style={{ zIndex: 1 }}>
            <img src={logo} alt="logo" style={{ height: '30px' }} />
            <img src={logoName} alt="logoName" className="ms-2" style={{ height: '62px' }} />
        </div>
    )
}

export default Header
