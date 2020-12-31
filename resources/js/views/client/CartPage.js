import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Carousel from '../../components/Carousel'
import Cart from '../../components/Cart'
import { AuthProvider } from '../../Contexts/AuthContext'
import { CartContext, CartProvider } from '../../Contexts/CartContext'
import Footer from '../../partials/Footer'
import Header from '../../partials/Header'
import LoadingOverlay from 'react-loading-overlay';



const CartPage = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <>
            <AuthProvider>
                <CartProvider>

                    <LoadingOverlay
                        active={isLoading}
                        spinner
                        text='Loading..'
                    >



                        <Header></Header>

                        {/* <Carousel></Carousel> */}




                        <Cart setIsLoading={(s) => setIsLoading(s)} />


                        <Footer></Footer>
                    </LoadingOverlay>

                </CartProvider>
            </AuthProvider>
        </>
    )
}

if (document.getElementById('cart')) {
    ReactDOM.render(<CartPage />, document.getElementById('cart'))
}

export default CartPage
