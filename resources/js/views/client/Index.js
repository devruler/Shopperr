import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../partials/Header';
import Carousel from '../../components/Carousel';
import Footer from '../../partials/Footer';
import Sidebar from '../../components/Sidebar';
import ProductCard from '../../components/ProductCard';
import Pagination from '../../components/Pagination';
import SelectionBar from '../../components/SelectionBar';
import Axios from 'axios';
import { AuthProvider } from '../../Contexts/AuthContext';
import { CartProvider } from '../../Contexts/CartContext';

export const Index = () => {

    const [products, setProducts] = useState({ data: [], meta: {}, links: {} });

    const [options, setOptions] = useState({ category: '', maker: '', model: '', engine: '' })

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

                    <SelectionBar setOptions={(selectedOptions) => setOptions(selectedOptions)} makers={[... new Set(products.data.map(data => data.maker))]} models={[... new Set(products.data.map(data => data.model))]} engines={[... new Set(products.data.map(data => data.engine ))]} />

                        <div className="container py-5">
                            <div className="row">
                                <div className="col-12 col-md-3">
                                    <Sidebar setOptions={(selectedOptions) => setOptions(selectedOptions)}></Sidebar>
                                </div>

                                <div className="col-12 col-md-9">
                                    <div className="row mb-5">

                                        {products.data.length ?
                                         products.data.map(product => <div key={product.id} className="col-12 col-md-4 mb-3"><ProductCard product={product}></ProductCard></div>)
                                        : <div className="col text-center mt-5">No products to show</div>
                                        }

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
