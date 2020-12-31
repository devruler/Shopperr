import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import Axios from 'axios';
import DataTable from 'react-data-table-component';
import Pagination from '../../components/Pagination';

const columns = [


    {
        name: 'Order ID',
        selector: 'uuid',
        sortable: true,
        cell: row => row.uuid.slice(0,7)
    },

    {
        name: 'Customer',
        selector: 'user.name',
        sortable: true,
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
        sortable: true,
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
        name: 'Created at',
        selector: 'created_at',
        sortable: true,
        cell: row => new Date(row.created_at).toDateString()
    },
    {
        name: 'Actions',
        selector: 'actions',
        cell: row => <div style={{height:'80px', wordBreak:'keep-all'}} className="d-flex justify-content-center align-items-center">
                        <Link to={"/admin/orders/" + row.id + "/edit"} className="btn btn-sm btn-secondary mr-3">Edit</Link>
                        <button onClick={() => Axios.delete('/api/orders/' + row.id).then(res => console.log(res).catch(err => console.log(err)))} className="btn btn-sm btn-danger">Delete</button>
                    </div>,

    },
];



const Orders = () => {

    const [orders, setOrders] = useState([]);


    const getOrders = (page = null) => {
        Axios.get(page ? page : '/api/admin/orders?page=1')
            .then(res => setOrders(() => res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getOrders();
        return () => setOrders([])

    }, []);



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
                                        <h2>Orders</h2>

                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12">
                                    <div>

                                        {

                                            Object.keys(orders).length

                                            ?

                                            <DataTable
                                                    defaultSortField="created_at"
                                                    striped={true}
                                                    noHeader={true}
                                                    data={orders.data}
                                                    defaultSortAsc={false}
                                                    columns={columns}
                                                />

                                            :

                                            'Loading...'

                                        }




                                            <Pagination meta={orders.meta} getPageData={(page) => getOrders(page)}/>
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

export default Orders
