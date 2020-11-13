import React from 'react'
import ReactDOM from 'react-dom'
import Dashboard from './Dashboard';
import Products from './Products';
import Orders from './Orders';
import Categories from './Categories';
import Reviews from './Reviews';
import Customers from './Customers';
import EditProduct from './EditProduct';
import CreateProduct from './CreateProduct';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

const Index = () => {
    return (
        <>
            <Switch>
                <Route path="/admin" component={Dashboard} exact />
                <Route path="/admin/products" component={Products} exact/>
                <Route path="/admin/products/create" component={CreateProduct} exact/>
                <Route path="/admin/orders" component={Orders} exact/>
                <Route path="/admin/categories" component={Categories} exact/>
                <Route path="/admin/reviews" component={Reviews} exact/>
                <Route path="/admin/customers" component={Customers} exact/>
                <Route path="/admin/products/:id/edit" component={EditProduct}/>
                {/* <Route component={Error} /> */}
            </Switch>
        </>
    )
}

if(document.getElementById('dashboard')){
    ReactDOM.render(
        <BrowserRouter>
            <Index />
        </BrowserRouter>,
        document.getElementById('dashboard')
    )
}

export default Index
