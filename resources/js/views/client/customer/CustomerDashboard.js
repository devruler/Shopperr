import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../partials/Header';
import Carousel from '../../../components/Carousel';
import Footer from '../../../partials/Footer';
import Axios from 'axios';

import DataTable from 'react-data-table-component';
import { AuthProvider } from '../../../Contexts/AuthContext';
import { CartProvider } from '../../../Contexts/CartContext';

const order_columns = [
    {
        name: 'Products',
        selector: 'products',
        sortable: true,
    },

    {
        name: 'Total',
        selector: 'total',
        sortable: true,
    },

    {
        name: 'Payment',
        selector: 'is_paid',
        sortable: true,
    },

    {
        name: 'Delivery',
        selector: 'is_delivered',
        sortable: true,
    },


    {
        name: 'Date',
        selector: 'created_at',
        sortable: true,
        cell: row => new Date(row.created_at).toDateString()
    },

    {
        name: 'Actions',
        selector: 'actions',
        cell: row => <div style={{ height: '80px', wordBreak: 'keep-all' }} className="d-flex justify-content-center align-items-center">
            <Link to={"/customer/orders/" + row.id + "/edit"} className="btn btn-sm btn-secondary mr-3">Edit</Link>
            <button onClick={() => Axios.delete('/api/customer/orders/' + row.id).then(res => console.log(res).catch(err => console.log(err)))} className="btn btn-sm btn-danger">Delete</button>
        </div>,

    },
];

const review_columns = [
    {
        name: 'Product',
        selector: 'product.title',
        sortable: true,
    },

    {
        name: 'Comment',
        selector: 'comment',
        sortable: true,
    },


    {
        name: 'Date',
        selector: 'created_at',
        sortable: true,
        cell: row => new Date(row.created_at).toDateString()
    },

    {
        name: 'Actions',
        selector: 'actions',
        cell: row => <div style={{ height: '80px', wordBreak: 'keep-all' }} className="d-flex justify-content-center align-items-center">
            <Link to={"/customer/reviews/" + row.id + "/edit"} className="btn btn-sm btn-secondary mr-3">Edit</Link>
            <button onClick={() => Axios.delete('/api/customer/reviews/' + row.id).then(res => console.log(res).catch(err => console.log(err)))} className="btn btn-sm btn-danger">Delete</button>
        </div>,

    },
];

const CustomerDashboard = () => {

    const [profile, setProfile] = useState({})
    const [orders, setOrders] = useState([])
    const [reviews, setReviews] = useState([])

    const getCustomerOrders = () => {
        Axios.get('/api/customer/orders')
            .then(res => setOrders(res.data.data))
            .catch(err => console.log(err))
    }

    const getCustomerReviews = () => {
        Axios.get('/api/customer/reviews')
            .then(res => setReviews(res.data.data))
            .catch(err => console.log(err))
    }

    const getCustomerInfo = () => {
        Axios.get('/auth-user')
            .then(res => setProfile(() => res.data.user))
            .catch(err => console.log(err));
    }


    const updateProfile = (e) => {

        e.preventDefault();

        Axios.put('/user/profile-information')
            .then(res => console.log(res))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getCustomerInfo();
        getCustomerOrders();
        getCustomerReviews();
    }, [])

    return (
        <>
            <AuthProvider>
                <CartProvider>
                    <Header></Header>

                    <Carousel></Carousel>

                    <div className="container py-5">

                        <div className="row">
                            <div className="col-3">
                                <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                                    <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Orders</a>
                                    <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Reviews</a>
                                    <a className="nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Profile</a>
                                </div>
                            </div>
                            <div className="col-9">
                                <div className="tab-content" id="v-pills-tabContent">
                                    <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="card-title">Your orders</h4>
                                                <DataTable
                                                    defaultSortField="created_at"
                                                    striped={true}
                                                    noHeader={true}
                                                    pagination={true}
                                                    data={orders}
                                                    columns={order_columns}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="card-title">Your orders</h4>
                                                <DataTable
                                                    defaultSortField="created_at"
                                                    striped={true}
                                                    noHeader={true}
                                                    pagination={true}
                                                    data={reviews}
                                                    columns={review_columns}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h4 className="card-title">Profile information</h4>
                                                        <form action="" onClick={(e) => updateProfile(e)}>
                                                            <div className="form-group">
                                                                <label>Full name</label>

                                                                <input
                                                                    type="text"
                                                                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                                    value={profile.name || ''}
                                                                    name="name" id="name"
                                                                    className="form-control"
                                                                    placeholder="Full name" />

                                                                <small id="nameMsg" className="text-muted">Help text</small>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Email</label>
                                                                <input
                                                                    type="text"
                                                                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                                    value={profile.email || ''}
                                                                    email="email" id="email"
                                                                    className="form-control"
                                                                    placeholder="Confirm Password" />
                                                                <small id="emailMsg" className="text-muted">Help text</small>
                                                            </div>

                                                            <button type="submit" className="btn btn-secondary">Update</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row my-3">
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <h4 className="card-title">Change Password</h4>
                                                        <form action="" onClick={(e) => updateProfile(e)}>
                                                            <div className="form-group">
                                                                <label>Password</label>
                                                                <input type="text" password="password" id="password" className="form-control" placeholder="Password" aria-describedby="passwordMsg" />
                                                                <small id="passwordMsg" className="text-muted">Help text</small>
                                                            </div>
                                                            <div className="form-group">
                                                                <label>Confirm Password</label>
                                                                <input type="text" password_confirmation="password_confirmation" id="password_confirmation" className="form-control" placeholder="Confirm Password" aria-describedby="passwordConfirmationMsg" />
                                                                <small id="passwordConfirmationMsg" className="text-muted">Help text</small>
                                                            </div>

                                                            <button type="submit" className="btn btn-secondary">Update</button>
                                                        </form>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

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

if (document.getElementById('customerDashboard')) {
    ReactDOM.render(<CustomerDashboard />, document.getElementById('customerDashboard'))
}

export default CustomerDashboard
