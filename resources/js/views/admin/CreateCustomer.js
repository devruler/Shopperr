import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import Axios from 'axios';



const CreateCustomer = () => {

    const [customer, setCustomer] = useState({ errors: {} });

    const history = useHistory()

    const [success, setSuccess] = useState(false)

    const storeCustomer = (e) => {
        e.preventDefault();

        Axios.post('/api/admin/customers', customer)
        .then((res) => {
            setSuccess(true)
        }).catch( err => {
            if(err.response.status >= 400 && err.response.status < 500){
                setCustomer({...customer, errors: err.response.data.errors})
            }
        })
    }



    useEffect(() => {
        if(success){
            setTimeout(() => {
                history.push('/admin/customers')
            }, 800)
        }
    }, [success])

    return (
        <>
            <AdminSidebar></AdminSidebar>

            <div className="c-wrapper">

                <AdminNavbar></AdminNavbar>

                <div className="c-body w-100">
                    <main className="c-main">
                        <div className="container-fluid">
                            <div className="fade-in">
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <h2>Create New Customer</h2>

                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <form onSubmit={(e) => storeCustomer(e)}>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <h5 className="mb-4">Customer information</h5>
                                                                    <div className="form-group">
                                                                        <label>Full Name</label>
                                                                        <input type="text" onChange={(e) => setCustomer({ ...customer, name: e.target.value })} value={customer.name || ''} className="form-control" name="full_name" id="fullName" placeholder="Full Name" />
                                                                        {customer.errors.hasOwnProperty('name') && <small className="form-text text-danger">{customer.errors.name[0]}</small>}
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label>Email</label>
                                                                        <input type="text" onChange={(e) => setCustomer({ ...customer, email: e.target.value })} value={customer.email || ''} className="form-control" name="email" id="email" placeholder="Email" />
                                                                        {customer.errors.hasOwnProperty('email') && <small className="form-text text-danger">{customer.errors.email[0]}</small>}
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <label>Phone number</label>
                                                                        <input type="text" className="form-control" onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} value={customer.phone || ''} name="phone" id="phone" placeholder="Phone number" />
                                                                        {customer.errors.hasOwnProperty('phone') && <small className="form-text text-danger">{customer.errors.phone[0]}</small>}
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <label>Address</label>
                                                                        <input type="text" className="form-control" onChange={(e) => setCustomer({ ...customer, address: e.target.value })} value={customer.address || ''} name="address" id="address" placeholder="Address" />
                                                                        {customer.errors.hasOwnProperty('address') && <small className="form-text text-danger">{customer.errors.address[0]}</small>}
                                                                    </div>
                                                                </div>



                                                                <div className="col-12 col-md-4">
                                                                    <div className="form-group">
                                                                        <label>Country</label>
                                                                        <input type="text" onChange={(e) => setCustomer({ ...customer, country: e.target.value })} value={customer.country || ''} className="form-control" name="country" id="country" placeholder="Country" />
                                                                        {customer.errors.hasOwnProperty('country') && <small className="form-text text-danger">{customer.errors.country[0]}</small>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-md-4">
                                                                    <div className="form-group">
                                                                        <label>City</label>
                                                                        <input type="text" onChange={(e) => setCustomer({ ...customer, city: e.target.value })} value={customer.city || ''} className="form-control" name="city" id="city" placeholder="City" />
                                                                        {customer.errors.hasOwnProperty('city') && <small className="form-text text-danger">{customer.errors.city[0]}</small>}
                                                                    </div>
                                                                </div>
                                                                <div className="col-12 col-md-4">
                                                                    <div className="form-group">
                                                                        <label>Postal code</label>
                                                                        <input type="text" onChange={(e) => setCustomer({ ...customer, postal_code: e.target.value })} value={customer.postal_code || ''} className="form-control" name="postal_code" id="postal_code" placeholder="Postal code" />
                                                                        {customer.errors.hasOwnProperty('postal_code') && <small className="form-text text-danger">{customer.errors.postal_code[0]}</small>}
                                                                    </div>
                                                                </div>

                                                                <div className="col-12 col-md-6">
                                                                <div className="form-group">
                                                                        <label>Password</label>
                                                                        <input type="password" onChange={(e) => setCustomer({ ...customer, password: e.target.value })} value={customer.password || ''} className="form-control" name="password" id="password" placeholder="Password" />
                                                                        {customer.errors.hasOwnProperty('password') && <small className="form-text text-danger">{customer.errors.password[0]}</small>}
                                                                    </div>

                                                                </div>

                                                                <div className="col-12 col-md-6">
                                                                <div className="form-group">
                                                                        <label>Password confirmation</label>
                                                                        <input type="password" onChange={(e) => setCustomer({ ...customer, password_confirmation: e.target.value })} value={customer.password_confirmation || ''} className="form-control" name="password_confirmation" id="password_confirmation" placeholder="Password confirmation" />
                                                                        {customer.errors.hasOwnProperty('password_confirmation') && <small className="form-text text-danger">{customer.errors.password_confirmation[0]}</small>}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="d-flex">
                                                                <div className="mr-2">
                                                                    <button type="submit" className="btn btn-primary" >Create</button>

                                                                </div>
                                                                <div>
                                                                    <Link to={'/admin/customers'} className="btn btn-block btn-secondary" >Go Back</Link>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {

                                                        success &&

                                                        <div className="row mt-3">
                                                            <div className="col">
                                                                <div className="alert alert-success" role="alert">
                                                                    <strong>Customer details has been successfully created!</strong>
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
                    </main>
                </div>

            </div>
        </>
    )
}

export default CreateCustomer
