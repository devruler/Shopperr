import { isNull } from 'lodash'
import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import { CartContext } from '../Contexts/CartContext'
import Logo from '../assets/images/logo.svg'
import CartWidget from './CartWidget'
import gsap from 'gsap'
import SearchBarByName from './SearchByNameBar'
import NavbarStyles from './Navbar.css'

const logoStyles = {
    maxWidth: "30px",
    color: "#ffffff!important"
}

export const Navbar = () => {

    const [user] = useContext(AuthContext)

    const [cartItems, setCartItems] = useContext(CartContext)

    const logout = () => {
        axios.post('/logout')
            .then(() => location.replace('/'))
            .catch(err => console.log(err));
    }

    const scrollLog = (e) => {
        const navbar = document.querySelector('.navbar')

        if (window.scrollY > 0) {
            navbar.classList.add('shadow-sm')
        } else {
            navbar.classList.remove('shadow-sm')
        }
    }

    const toggleShowCartWidget = (toggler) => {
        if (toggler) {
            gsap.to('.cart-widget', { ease: 'power2.out', css: { height: "auto", opacity: 1, display: "block" } })
        } else {
            gsap.to('.cart-widget', { ease: 'power2.in', css: { height: 0, opacity: 0, display: "none" } })

        }
    }

    useEffect(() => {
        document.body.onscroll = scrollLog
    }, [])

    return (
        <>
            <div style={{ backgroundColor: "#171919", height: '53px', borderBottom: '4px solid #D3AD2E' }} >

                <nav className="navbar navbar-expand-lg navbar-dark fixed-top py-lg-0" style={{ backgroundColor: "#171919" }} >

                    <div className="container">

                        <a className="navbar-brand text-primary mr-4 my-2 my-lg-0" href="/"><img src={Logo} style={logoStyles} alt="shopperr logo" /> Shopperr</a>

                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarResponsive">

                            <ul className="navbar-nav">
                                <li className="nav-item my-2 my-lg-0">
                                    <SearchBarByName />
                                </li>
                            </ul>
                            <ul className="navbar-nav ml-auto left-nav">

                                {
                                    user
                                        ?
                                        <>
                                            <div class="dropdown ">
                                                <a href="#" class="btn btn-link nav-link rounded-0 dropdown-toggle" type="a" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fas fa-user    "></i> Account</a>

                                                <div className="dropdown-menu rounded-0" aria-labelledby="dropdownMenuButton">
                                                        <a className="dropdown-item my-2 my-lg-0" href="/admin">Dashboard</a>
                                                        <a className="dropdown-item my-2 my-lg-0" href="#" onClick={logout}>Logout</a>
                                                </div>



                                            </div>
                                        </>

                                        :
                                        <>
                                            <li className="nav-item my-2 my-lg-0">
                                                <a className="nav-link" href="/login">Login</a>
                                            </li>
                                            <li className="nav-item my-2 my-lg-0">
                                                <a className="nav-link" href="/register">Register</a>
                                            </li>
                                        </>

                                }

                                <li className="nav-item my-2 my-lg-0 d-block d-lg-none">
                                    <a className="nav-link" href="/cart">
                                        <i class="fas fa-shopping-cart mr-1"></i>
                                         Cart - {cartItems && <small>{cartItems.length + ' Items'}</small>}
                                    </a>
                                </li>

                            </ul>

                            <ul className="navbar-nav">
                                <li className="nav-item y-2 my-lg-0 pl-lg-4 d-none d-lg-block">
                                    <a className="nav-link" style={{ position: 'relative' }} href="/cart" onMouseEnter={() => toggleShowCartWidget(true)} onMouseLeave={() => toggleShowCartWidget(false)}>
                                        <div className="cart-icon">
                                            <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" version="1.1" id="Capa_1" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 475.084 475.085" >
                                                <g>
                                                    <path d="M365.446,401.998c0,10.092,3.579,18.702,10.711,25.834c7.132,7.139,15.749,10.711,25.845,10.711    c10.081,0,18.698-3.572,25.83-10.711c7.139-7.132,10.711-15.742,10.711-25.834s-3.568-18.702-10.711-25.841    c-7.132-7.132-15.749-10.704-25.83-10.704c-10.096,0-18.713,3.572-25.845,10.704C369.025,383.296,365.446,391.906,365.446,401.998    z" />
                                                    <path d="M469.658,78.51c-3.618-3.617-7.898-5.426-12.848-5.426H113.918c-0.193-1.331-0.621-3.756-1.287-7.277    c-0.666-3.523-1.188-6.329-1.569-8.425c-0.383-2.087-1.093-4.611-2.142-7.561c-1.047-2.952-2.284-5.286-3.711-6.995    c-1.425-1.718-3.328-3.189-5.708-4.43c-2.378-1.233-5.092-1.853-8.136-1.853H18.276c-4.952,0-9.234,1.812-12.85,5.424    C1.809,45.583,0,49.868,0,54.816s1.809,9.231,5.426,12.847c3.619,3.617,7.902,5.424,12.85,5.424h58.237l50.532,234.976    c-0.378,0.76-2.329,4.373-5.852,10.848c-3.521,6.475-6.328,12.135-8.42,16.988c-2.093,4.859-3.14,8.616-3.14,11.279    c0,4.948,1.809,9.232,5.424,12.854c3.621,3.606,7.902,5.421,12.851,5.421h18.272h255.815h18.261c4.948,0,9.232-1.814,12.847-5.421    c3.62-3.621,5.427-7.905,5.427-12.854c0-4.949-1.807-9.233-5.427-12.847c-3.614-3.614-7.898-5.428-12.847-5.428h-262.66    c4.57-9.138,6.854-15.222,6.854-18.268c0-1.909-0.238-4.004-0.715-6.283s-1.047-4.805-1.713-7.569    c-0.667-2.752-1.093-4.799-1.283-6.133l298.077-34.831c4.753-0.575,8.658-2.614,11.703-6.14c3.046-3.518,4.565-7.562,4.565-12.133    V91.363C475.082,86.415,473.278,82.132,469.658,78.51z" />
                                                    <path d="M109.632,401.998c0,10.092,3.567,18.702,10.706,25.834c7.141,7.139,15.75,10.711,25.841,10.711    c10.085,0,18.699-3.572,25.835-10.711c7.139-7.132,10.71-15.742,10.71-25.834s-3.568-18.702-10.71-25.841    c-7.137-7.132-15.75-10.704-25.835-10.704c-10.09,0-18.704,3.572-25.841,10.704C113.203,383.296,109.632,391.906,109.632,401.998z    " />
                                                </g>
                                            </svg>
                                            <span className="cart-items">{cartItems && cartItems.length}</span>
                                        </div>

                                    </a>

                                    <CartWidget />

                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}
