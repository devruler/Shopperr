import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Header from '../../../partials/Header';
import Carousel from '../../../components/Carousel';
import Footer from '../../../partials/Footer';
import Axios from 'axios';

import DataTable from 'react-data-table-component';
import { AuthProvider } from '../../../Contexts/AuthContext';
import { CartProvider } from '../../../Contexts/CartContext';
import Pagination from '../../../components/Pagination'
import { Link } from 'react-router-dom';

const order_columns = [


    {
        name: 'Order ID',
        selector: 'uuid',
        sortable: true,
        cell: row => row.uuid.slice(0,7)
    },


    // {
    //     name: 'Products',
    //     selector: 'products',
    //     sortable: true,
    //     cell: row => <div className="d-flex flex-column">
    //         {row.products.map((product) => (<div>{product.title} x{product.pivot.qty}</div>))}
    //     </div>
    // },
    {
        name: 'Total',
        selector: 'total',
        sortable: true
        ,
        cell: row => '$' + row.total
    },

    {
        name: 'Payment',
        selector: 'is_paid',
        sortable: true,
        cell: row => row.is_paid ? <span className="badge badge-success">Paid</span> : <span className="badge badge-warning">Unpaid</span>
    },

    {
        name: 'Shipping',
        selector: 'is_delivered',
        sortable: true,
        cell: row => row.is_delivered ? <span className="badge badge-success">Delivered</span> : <span className="badge badge-secondary">Shipped</span>
    },

    {
        name: 'Ordered at',
        selector: 'created_at',
        sortable: true,
        cell: row => new Date(row.created_at).toDateString()
    },
    // {
    //     name: 'Actions',
    //     selector: 'actions',
    //     cell: row => <div style={{height:'80px', wordBreak:'keep-all'}} className="d-flex justify-content-center align-items-center">
    //                     <Link to={"/admin/orders/" + row.id + "/edit"} className="btn btn-sm btn-secondary mr-3">Edit</Link>
    //                     <button onClick={() => Axios.delete('/api/orders/' + row.id).then(res => console.log(res).catch(err => console.log(err)))} className="btn btn-sm btn-danger">Delete</button>
    //                 </div>,

    // },
];

const review_columns = [


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

const Dashboard = () => {

    const [profile, setProfile] = useState({ errors: {} })

    const [orders, setOrders] = useState([])

    const [reviews, setReviews] = useState([])

    const [passwords, setPasswords] = useState({ current_password: '', password: '', password_confirmation: '', errors: {} })

    const [success, setSuccess] = useState({ profileUpdate: false, passwordUpdate: false })

    const getCustomerOrders = (page = '/api/customer/orders?page=1') => {
        Axios.get(page)
            .then(res => setOrders(res.data))
            .catch(err => console.log(err))
    }

    const getCustomerReviews = (page = '/api/customer/reviews?page=1') => {
        Axios.get(page)
            .then(res => setReviews(res.data))
            .catch(err => console.log(err))
    }

    const getCustomerInfo = () => {
        Axios.get('/auth-user')
            .then(res => setProfile({...res.data.user, errors: {}}))
            .catch(err => console.log(err));
    }


    const updateProfile = (e) => {

        e.preventDefault();

        Axios.put('/user/profile-information', profile)
            .then(res => setSuccess({ ...success, profileUpdate: true }))
            .catch(err => {
                if (err.response.status >= 400 && err.response.status < 500) {
                    setProfile({ ...profile, errors: err.response.data.errors })
                }
            });
    }

    const updatePassword = (e) => {

        e.preventDefault();

        const passwordsCheckElement = document.querySelector('#passwords-check')

        if(passwords.password !== passwords.password_confirmation){
            passwordsCheckElement.classList.remove('d-none')
            return false
        }else{
            passwordsCheckElement.classList.add('d-none')
        }

        Axios.put('/user/password', passwords)
            .then(res => setSuccess({ ...success, passwordUpdate: true }))
            .catch(err => {
                if (err.response.status >= 400 && err.response.status < 500) {
                    setPasswords({ ...passwords, errors: err.response.data.errors })
                }
            });
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
                                                    pagination={false}
                                                    data={orders.data}
                                                    defaultSortAsc={false}
                                                    columns={order_columns}
                                                />

                                                <Pagination meta={orders.meta} getPageData={(page) => getCustomerOrders(page)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                                        <div className="card">
                                            <div className="card-body">
                                                <h4 className="card-title">Your reviews</h4>
                                                <DataTable
                                                    defaultSortField="created_at"
                                                    striped={true}
                                                    noHeader={true}
                                                    pagination={false}
                                                    defaultSortAsc={false}
                                                    data={reviews.data}
                                                    columns={review_columns}
                                                />
                                                <Pagination meta={reviews.meta} getPageData={(page) => getCustomerReviews(page)} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="card">
                                                    <div className="card-body">
                                                        <form action="" onSubmit={(e) => updateProfile(e)}>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <h5 className="mb-4">Customer information</h5>
                                                                    <div className="form-group">
                                                                        <label>Full Name</label>
                                                                        <input type="text" onChange={(e) => setProfile({ ...profile, name: e.target.value })} value={profile.name || ''} className="form-control" name="full_name" id="fullName" placeholder="Full Name" />
                                                                        {profile.errors.hasOwnProperty('name') && <small className="form-text text-danger">{profile.errors.name[0]}</small>}
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label>Email</label>
                                                                        <input type="text" onChange={(e) => setProfile({ ...profile, email: e.target.value })} value={profile.email || ''} className="form-control" name="email" id="email" placeholder="Email" />
                                                                        {profile.errors.hasOwnProperty('email') && <small className="form-text text-danger">{profile.errors.email[0]}</small>}
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label>Phone number</label>
                                                                        <input type="text" className="form-control" onChange={(e) => setProfile({ ...profile, phone: e.target.value })} value={profile.phone || ''} name="phone" id="phone" placeholder="Phone number" />
                                                                        {profile.errors.hasOwnProperty('phone') && <small className="form-text text-danger">{profile.errors.phone[0]}</small>}
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label>Address</label>
                                                                        <input type="text" className="form-control" onChange={(e) => setProfile({ ...profile, address: e.target.value })} value={profile.address || ''} name="address" id="address" placeholder="Address" />
                                                                        {profile.errors.hasOwnProperty('address') && <small className="form-text text-danger">{profile.errors.address[0]}</small>}
                                                                    </div>

                                                                </div>



                                                                <div className="col-12 col-md-4">
                                                                    <div className="form-group">
                                                                        <label>Country</label>
                                                                        <input type="text" onChange={(e) => setProfile({ ...profile, country: e.target.value })} value={profile.country || ''} className="form-control" name="country" id="country" placeholder="Country" />
                                                                        {profile.errors.hasOwnProperty('country') && <small className="form-text text-danger">{profile.errors.country[0]}</small>}
                                                                    </div>

                                                                </div>
                                                                <div className="col-12 col-md-4">
                                                                    <div className="form-group">
                                                                        <label>City</label>
                                                                        <input type="text" onChange={(e) => setProfile({ ...profile, city: e.target.value })} value={profile.city || ''} className="form-control" name="city" id="city" placeholder="City" />
                                                                        {profile.errors.hasOwnProperty('city') && <small className="form-text text-danger">{profile.errors.city[0]}</small>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-md-4">
                                                                    <div className="form-group">
                                                                        <label>Postal code</label>
                                                                        <input type="text" onChange={(e) => setProfile({ ...profile, postal_code: e.target.value })} value={profile.postal_code || ''} className="form-control" name="postal_code" id="postal_code" placeholder="Postal code" />
                                                                        {profile.errors.hasOwnProperty('postal_code') && <small className="form-text text-danger">{profile.errors.postal_code[0]}</small>}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <button type="submit" className="btn btn-secondary">Update</button>

                                                            {

                                                                success.profileUpdate &&

                                                                <div className="row mt-3">
                                                                    <div className="col">
                                                                        <div className="alert alert-success" role="alert">
                                                                            <strong>Profile details has been successfully updated!</strong>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
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
                                                        <form action="" onSubmit={(e) => updatePassword(e)}>
                                                            <div className="form-group">
                                                                <label>Current Password</label>
                                                                <input type="password" onChange={(e) => setPasswords({ ...passwords, current_password: e.target.value })} value={passwords.current_password || ''} name="current_password" id="current_password" className="form-control" placeholder="Current password" aria-describedby="passwordMsg" />
                                                                {passwords.errors.hasOwnProperty('current_password') && <small className="form-text text-danger">{passwords.errors.current_password[0]}</small>}
                                                            </div>
                                                            <div className="form-group">
                                                                <label>New Password</label>
                                                                <input type="password" onChange={(e) => setPasswords({ ...passwords, password: e.target.value })} value={passwords.password || ''} name="password" id="password" className="form-control" placeholder="Password" aria-describedby="passwordMsg" />
                                                                {passwords.errors.hasOwnProperty('password') && <small className="form-text text-danger">{passwords.errors.password[0]}</small>}

                                                                <small className="form-text text-danger d-none" id="passwords-check">Passwords don't match!</small>

                                                            </div>
                                                            <div className="form-group">
                                                                <label>Confirm Password</label>
                                                                <input type="password" onChange={(e) => setPasswords({ ...passwords, password_confirmation: e.target.value })} value={passwords.password_confirmation || ''} name="password_confirmation" id="password_confirmation" className="form-control" placeholder="Confirm Password" aria-describedby="passwordConfirmationMsg" />
                                                                {passwords.errors.hasOwnProperty('password_confirmation') && <small className="form-text text-danger">{passwords.errors.password_confirmation[0]}</small>}
                                                            </div>

                                                            <button type="submit" className="btn btn-secondary">Update</button>

                                                            {

                                                                success.passwordUpdate &&

                                                                <div className="row mt-3">
                                                                    <div className="col">
                                                                        <div className="alert alert-success" role="alert">
                                                                            <strong>Password has been successfully updated!</strong>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            }
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



export default Dashboard
