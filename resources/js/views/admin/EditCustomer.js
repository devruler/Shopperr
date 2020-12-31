import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import Axios from 'axios';


const EditCustomer = () => {

    const { id } = useParams();

    const [customer, setCustomer] = useState({errors: {}})

    const history = useHistory()

    const [success, setSuccess] = useState(false)

    const updateCustomer = (e) => {
        e.preventDefault()

        Axios.put('/api/admin/customers/' + id, customer)
            .then(res => setSuccess(true))
            .catch(err => {
                if(err.response.status >= 400 && err.response.status < 500){
                    setCustomer({...customer, errors: err.response.data.errors})
                }
            })

    }

    const getCustomer = () => {
        Axios.get('/api/admin/customers/' + id)
            .then((res) => setCustomer({errors: {}, ...res.data}))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getCustomer()
    }, []);

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
                                        <h2>Edit Customer #{id}</h2>

                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                {
                                                    Object.keys(customer).length &&

                                                    <form onSubmit={(e) => updateCustomer(e)}>

                                                        <div className="row">
                                                            <div className="col-12 col-md-8">
                                                                <div className="row">
                                                                    <div className="col-12">
                                                                        <h5 className="mb-4">Customer information</h5>
                                                                        <div className="form-group">
                                                                            <label>Full Name</label>
                                                                            <input type="text" onChange={(e) => setCustomer({ ...customer, name: e.target.value })} value={customer.name || ''} className="form-control" name="full_name" id="fullName" placeholder="Full Name" />
                                                                        </div>{customer.errors.hasOwnProperty('name') && <small className="form-text text-danger">{customer.errors.name[0]}</small>}

                                                                        <div className="form-group">
                                                                            <label>Email</label>
                                                                            <input type="text" onChange={(e) => setCustomer({ ...customer, email: e.target.value })} value={customer.email || ''} className="form-control" name="email" id="email" placeholder="Email" />
                                                                        </div>{customer.errors.hasOwnProperty('email') && <small className="form-text text-danger">{customer.errors.email[0]}</small>}

                                                                        <div className="form-group">
                                                                            <label>Phone number</label>
                                                                            <input type="text" className="form-control" onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} value={customer.phone || ''} name="phone" id="phone" placeholder="Phone number" />
                                                                        </div>{customer.errors.hasOwnProperty('phone') && <small className="form-text text-danger">{customer.errors.phone[0]}</small>}
                                                                        <div className="form-group">
                                                                            <label>Address</label>
                                                                            <input type="text" className="form-control" onChange={(e) => setCustomer({ ...customer, address: e.target.value })} value={customer.address || ''} name="address" id="address" placeholder="Address" />
                                                                        </div>{customer.errors.hasOwnProperty('address') && <small className="form-text text-danger">{customer.errors.address[0]}</small>}
                                                                    </div>



                                                                    <div className="col-12 col-md-4">
                                                                        <div className="form-group">
                                                                            <label>Country</label>
                                                                            <input type="text" onChange={(e) => setCustomer({ ...customer, country: e.target.value })} value={customer.country || ''} className="form-control" name="country" id="country" placeholder="Country" />
                                                                        </div>{customer.errors.hasOwnProperty('country') && <small className="form-text text-danger">{customer.errors.country[0]}</small>}
                                                                    </div>
                                                                    <div className="col-12 col-md-4">
                                                                        <div className="form-group">
                                                                            <label>City</label>
                                                                            <input type="text" onChange={(e) => setCustomer({ ...customer, city: e.target.value })} value={customer.city || ''} className="form-control" name="city" id="city" placeholder="City" />
                                                                        </div>{customer.errors.hasOwnProperty('city') && <small className="form-text text-danger">{customer.errors.city[0]}</small>}
                                                                    </div>
                                                                    <div className="col-12 col-md-4">
                                                                        <div className="form-group">
                                                                            <label>Postal code</label>
                                                                            <input type="text" onChange={(e) => setCustomer({ ...customer, postal_code: e.target.value })} value={customer.postal_code || ''} className="form-control" name="postal_code" id="postal_code" placeholder="Postal code" />
                                                                        </div>{customer.errors.hasOwnProperty('postal_code') && <small className="form-text text-danger">{customer.errors.postal_code[0]}</small>}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="col-12 col-md-4">
                                                                <div className="d-flex flex-column">
                                                                    <h5 className="mb-4">Latest Orders</h5>

                                                                    {
                                                                        customer.hasOwnProperty('orders') && customer.orders.map((order, index) => {
                                                                            return (
                                                                                <div className="d-flex justify-content-between" key={order.id}>
                                                                                    <Link to={'/admin/orders/' + order.id + '/edit'}>Order #{order.uuid.slice(0, 7)}</Link>
                                                                                    <span>${order.total}</span>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }

                                                                </div>

                                                                <hr />

                                                                <div className="d-flex flex-column">
                                                                    <h5 className="mb-4">Latest Reviews</h5>
                                                                    {
                                                                        customer.hasOwnProperty('orders') && customer.reviews.map((review, index) => {
                                                                            return (
                                                                                <div className="d-flex justify-content-between" key={review.id}>
                                                                                    <Link to={'/admin/reviews/' + review.id + '/edit'}>Comment #{review.id}</Link>
                                                                                    <span>{review.comment.slice(0, 30)}</span>
                                                                                </div>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>


                                                        </div>

                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="d-flex">
                                                                    <div className="mr-2">
                                                                        <button type="submit" className="btn btn-primary" >Update</button>

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
                                                                        <strong>Customer details has been successfully updated!</strong>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }

                                                    </form>
                                                }

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

export default EditCustomer
