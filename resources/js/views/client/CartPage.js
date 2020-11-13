import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Carousel from '../../components/Carousel'
import Cart from '../../components/Cart'
import { AuthProvider } from '../../Contexts/AuthContext'
import { CartContext, CartProvider } from '../../Contexts/CartContext'
import Footer from '../../partials/Footer'
import Header from '../../partials/Header'


const CartPage = () => {



    return (
        <>
            <AuthProvider>
                <CartProvider>

                    <Header></Header>

                    <Carousel></Carousel>

                    <Cart />

                    <Footer></Footer>

                </CartProvider>
            </AuthProvider>
        </>
    )
}

if (document.getElementById('cart')) {
    ReactDOM.render(<CartPage />, document.getElementById('cart'))
}

export default CartPage
