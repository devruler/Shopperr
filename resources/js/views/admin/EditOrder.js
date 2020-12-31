import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import Axios from 'axios';


const EditOrder = () => {

    const { id } = useParams();

    const [order, setOrder] = useState({})

    const [updatedOrder, setUpdatedOrder] = useState({is_delivered: '', is_paid: ''})

    const updateOrder = (e) => {
        e.preventDefault()

        Axios.put('/api/admin/orders/' + id, updatedOrder)
        .then(res => console.log(res))
        .catch(err => console.log(err))

    }

    const getOrder = () => {
        Axios.get('/api/admin/orders/' + id)
            .then((res) => setOrder(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getOrder()
    }, []);

    return (
        <>
            <AdminSidebar></AdminSidebar>

            <div className="c-wrapper">

                <AdminNavbar></AdminNavbar>

                <div className="c-body w-100">
                    <main className="c-main">
                        <div className="container-fluid">
                        {
                                                    Object.keys(order).length &&
                            <div className="fade-in">
                                <div className="row mb-3">
                                    <div className="col-12">
                                        <h2>Edit Order #{order.uuid.slice(0,7)}</h2>

                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">


                                                    <form onSubmit={(e) => updateOrder(e)}>

                                                        <div className="row">
                                                            <div className="col-12 col-md-6">
                                                                <h5 className="mb-4">Order details</h5>
                                                                {order.products.map((product, index) => {
                                                                    return (
                                                                        <div className="d-flex justify-content-between" key={product.id}>
                                                                            <p><Link to={'/admin/products/' + product.id + '/edit'}>{product.title.slice(0,50) + '..'}</Link>  <span className="badge badge-dark">x {product.pivot.qty}</span> </p>
                                                                            <p>${(product.price * product.pivot.qty).toFixed(2)}</p>
                                                                        </div>
                                                                    )
                                                                })}
                                                                <hr/>
                                                                <p className="text-right font-weight-bold">${order.total}</p>

                                                                <div className="form-group">
                                                                  <label>Shipping Status</label>

                                                                    <select className="form-control"
                                                                    onChange={(e) => setUpdatedOrder({...updatedOrder, is_delivered: e.target.value})}
                                                                    defaultValue={order.is_delivered ? 1 : 0}
                                                                    name="shipping_status"
                                                                    id="shippingStatus">
                                                                        {/* <option>Waiting shipment</option> */}
                                                                        <option value="0">Shipped</option>
                                                                        <option value="1">Delivered</option>
                                                                    </select>
                                                                </div>

                                                                <div className="form-group">
                                                                  <label>Payment Status</label>
                                                                  <select className="form-control" defaultValue={order.is_paid ? 1 : 0}
                                                                  onChange={(e) => setUpdatedOrder({...updatedOrder, is_paid: e.target.value})}
                                                                  name="payment_status"
                                                                  id="paymentStatus">
                                                                        <option value="0" >Unpaid</option>
                                                                        <option value="1" >Paid</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="col-12 col-md-6">
                                                                <h5 className="mb-4">User information</h5>
                                                                <p>Customer <Link to={'/admin/customers/' + order.user.id + '/edit'}>#{order.user.id}</Link></p>
                                                                <p>Full Name: {order.user.name}</p>
                                                                <p>Email: {order.user.email}</p>
                                                                <p>Phone: {order.user.phone}</p>
                                                            </div>

                                                        </div>

                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="d-flex">
                                                                    <div className="mr-2">
                                                                    <button type="submit" className="btn btn-primary">Update</button>

                                                                    </div>
                                                                    <div>
                                                                    <Link to={'/admin/orders'} className="btn btn-block btn-secondary" >Go Back</Link>

                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </form>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                                                }

                        </div>
                    </main>
                </div>

            </div>
        </>
    )
}

export default EditOrder
