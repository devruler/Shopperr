import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../partials/Header';
import Carousel from '../../components/Carousel';
import Footer from '../../partials/Footer';
import Sidebar from '../../components/Sidebar';
import ProductCard from '../../components/ProductCard';
import Pagination from '../../components/Pagination';
import Axios from 'axios';
import { AuthProvider } from '../../Contexts/AuthContext';
import { CartProvider } from '../../Contexts/CartContext';

export const Index = () => {

    const [products, setProducts] = useState({ data: [], meta: {}, links: {} });

    const [options, setOptions] = useState({category: '', maker: '', model: '', engine: ''})

    const getProducts = (page = null) => {
        Axios.get(page ? page : '/api/products?category=' + options.category + '&maker=' + options.maker + '&model=' + options.model + '&engine=' + options.engine)
            .then(res => setProducts(() => res.data))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getProducts();
    }, [options]);


    return (
        <>
            <AuthProvider>
                <CartProvider>

                <Header></Header>

                <Carousel></Carousel>

                <div className="container py-5">
                    <div className="row">
                        <div className="col-12 col-md-3">
                            <Sidebar setOptions={(selectedOptions) => setOptions(selectedOptions)}></Sidebar>
                        </div>

                        <div className="col-12 col-md-9">
                            <div className="row mb-5">

                                {products.data && products.data.map(product => <div key={product.id} className="col-12 col-md-4 mb-3"><ProductCard product={product}></ProductCard></div>)}

                            </div>

                            <div className="row">
                                <div className="col">
                                    <Pagination meta={products.meta} getPageData={(page) => getProducts(page)} />
                                </div>
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

if (document.getElementById('index')) {
    ReactDOM.render(<Index />, document.getElementById('index'));
}
