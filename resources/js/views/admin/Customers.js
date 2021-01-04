import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import Axios from 'axios';
import DataTable from 'react-data-table-component';
import Pagination from '../../components/Pagination';


const Customers = () => {

    const columns = [
        {
            name: 'Full Name',
            selector: 'name',
            sortable: true,
            grow: 2
        },

        {
            name: 'Email',
            selector: 'email',
            sortable: true,
            grow: 3
        },

        {
            name: 'Orders',
            selector: 'orders_count',
            sortable: true,
            maxWidth: '50px'
        },

        {
            name: 'Reviews',
            selector: 'reviews_count',
            sortable: true,
            maxWidth: '50px'
        },


        {
            name: 'Registered at',
            selector: 'created_at',
            sortable: true,
            cell: row => new Date(row.created_at).toDateString()
        },

        {
            name: 'Verified at',
            selector: 'verified_at',
            sortable: true,
            cell: row => new Date(row.created_at).toDateString()

        },

        {
            name: 'Actions',
            selector: 'actions',
            cell: row => <div style={{ height: '80px', wordBreak: 'keep-all' }} className="d-flex justify-content-center align-items-center">
                {
                    isTrashed ?
                        <>
                            <a href="#" onClick={(e) => restoreCustomer(row.id, e)} className="btn btn-sm btn-secondary mr-3">Restore</a>
                            <button onClick={(e) => deleteCustomer(row.id, e)} className="btn btn-sm btn-danger">Delete</button>
                        </>
                        :
                        <>
                            <Link to={"/admin/customers/" + row.id + "/edit"} className="btn btn-sm btn-secondary mr-3">Edit</Link>
                            <button onClick={(e) => deleteCustomer(row.id, e)} className="btn btn-sm btn-danger">Suspend</button>
                        </>
                }


            </div>,

        },
    ];

    const [customers, setCustomers] = useState({});

    const [isTrashed, setIsTrashed] = useState(false)

    const [status, setStatus] = useState({
        message: '',
        trigger: '',
    })

    const getCustomers = (page = null) => {
        Axios.get(page ? (page + (isTrashed ? '&trashed=1' : '&trashed=0')) : ('/api/admin/customers?page=1' + (isTrashed ? '&trashed=1' : '&trashed=0')))
            .then(res => setCustomers(() => res.data))
            .catch(err => console.log(err))
    }

    const deleteCustomer = (id, e) => {
        e.preventDefault()
        if (confirm(isTrashed ? 'Do you want to permanently delete this customer?' : 'Do you want to suspend this customer?')) {
            Axios.delete('/api/admin/customers/' + id + (isTrashed ? '?force_delete=1' : ''))
                .then(res => {
                    setStatus({
                        message: 'Customer has been successfully deleted!',
                        trigger: 'success'
                    })
                })
                .catch(err => console.log(err))
                .finally(() => getCustomers())
        }

    }

    const restoreCustomer = (id, e) => {
        e.preventDefault()

        Axios.put('/api/admin/customers/' + id + '?restore=1')
            .then(() => {
                setStatus({
                    message: 'Customer has been restored!',
                    trigger: 'success'
                })
                getCustomers()
            }).catch((err) => {
                console.log(err);
            })
    }


    useEffect(() => {
        getCustomers();

    }, [isTrashed]);

    useEffect(() => {
        if (status.trigger != '') {

            setTimeout(() => {
                setStatus({
                    message: '',
                    trigger: ''
                })
            }, 5000)

        }

    }, [status])

    return (
        <>
            <AdminSidebar></AdminSidebar>

            <div className="c-wrapper">

                <AdminNavbar></AdminNavbar>

                <div className="c-body w-100">
                    <main className="c-main">
                        <div className="container-fluid">
                            <div className="fade-in">

                                {
                                    status.message.length > 0 &&
                                    <div className="row mb-3">
                                        <div className="col-12">
                                            <div className={"alert " + (status.trigger === 'success' ? "alert-success" : "alert-danger")} role="alert">
                                                <strong>{status.message}</strong>
                                            </div>
                                        </div>
                                    </div>
                                }

                                <div className="row mb-3">
                                    <div className="col-12 d-flex justify-content-between">
                                        <h2>Customers</h2>
                                        <div>
                                            <Link to="/admin/customers/create" className="btn btn-block btn-primary">Create</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-12">
                                        <a className={"btn btn-primary rounded-0 mr-2 " + (!isTrashed ? 'active' : 'false')} href="#" role="button" onClick={(e) => setIsTrashed(false)}>All</a>
                                        <a className={"btn btn-primary rounded-0 " + (isTrashed ? 'active' : 'false')} href="#" role="button" onClick={(e) => setIsTrashed(true)}>Suspended</a>
                                    </div>
                                </div>

                                <div className="row mb-5">
                                    <div className="col-12">
                                        <div>

                                            {
                                                Object.keys(customers).length ?

                                                    <DataTable
                                                        defaultSortField="created_at"
                                                        striped={true}
                                                        noHeader={true}
                                                        defaultSortAsc={false}
                                                        data={customers.data}
                                                        columns={columns}
                                                    />

                                                    :

                                                    'Loading...'

                                            }

                                            <Pagination meta={customers.meta} getPageData={(page) => getCustomers(page)} />
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

export default Customers
