import React from 'react'
import logo from '../../public/assets/logo.svg'
import logoName from '../../public/assets/logoName.png'
function Header() {
    return (
        <div className="container-xxl fixed-top pt-0 pe-4 ps-5 pb-2 bg-white w-100" style={{ zIndex: 1 }}>
            <div className='container-fixed mb-2'>
                <img src={logo} alt="logo" style={{
                    maxWidth:'50px'
                }}/>
                <img src={logoName} alt="logoName"  style={{
                    maxWidth:'100px'
                }}/>
            </div>
        </div>
    )
}

export default Header
