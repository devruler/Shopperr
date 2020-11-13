import React, { useEffect } from 'react'
import ProductDetails from '../../components/ProductDetails';
// import Sidebar from '../../components/Sidebar';
import Header from '../../partials/Header';
import Footer from '../../partials/Footer';
import { AuthProvider } from '../../Contexts/AuthContext';
import { CartProvider } from '../../Contexts/CartContext';
import ReactDOM from 'react-dom';
import Axios from 'axios'
import { useState } from 'react';
import ProductReviews from '../../components/ProductReviews';

const productId = window.location.pathname.split('/')[2]

const ProductPage = () => {

    const [product, setProduct] = useState({})

    const getProduct = () => {
        Axios.get('/api/products/' + productId)
            .then(res => setProduct(res.data.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {

        getProduct()

    }, [])

    return (
        <>
            <AuthProvider>
                <CartProvider>

                    <Header></Header>

                    <div className="py-5">

                    <ProductDetails product={product}></ProductDetails>


                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <ProductReviews productId={product.id}/>
                            </div>
                        </div>
                    </div>
                    </div>

                <Footer></Footer>

                </CartProvider>
        </AuthProvider>
        </>
    )
}

if (document.getElementById('product')) {
    ReactDOM.render(<ProductPage />, document.getElementById('product'));
}

export default ProductPage
