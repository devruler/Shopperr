import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import Axios from 'axios';
import DataTable from 'react-data-table-component';

const columns = [


    {
        name: 'Title',
        selector: 'title',
        sortable: true,
    },

    {
        name: 'Price',
        selector: 'price',
        sortable: true,
        cell: row => row.price + ' $'
    },
    {
        name: 'Maker',
        selector: 'maker',
        sortable: true,
    },
    {
        name: 'Model',
        selector: 'model',
        sortable: true,
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


    const getOrders = () => {
        Axios.get('/api/admin/orders')
            .then(res => setOrders(() => res.data.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getOrders();

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
                                    <div className="col-12 d-flex justify-content-between">
                                        <h2>Orders</h2>
                                        <div>
                                            <Link to="/admin/orders/create" className="btn btn-block btn-primary">Create</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12">
                                    <div>


                                                <DataTable
                                                    defaultSortField="created_at"
                                                    striped={true}
                                                    noHeader={true}
                                                    pagination={true}
                                                    data={orders}
                                                    columns={columns}
                                                />


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