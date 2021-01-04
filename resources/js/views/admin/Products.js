import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import Axios from 'axios';
import DataTable from 'react-data-table-component';
import Pagination from '../../components/Pagination'





const Products = () => {

    const columns = [
        {
            name: 'Image',
            selector: 'image',
            cell: row => <div style={{ height: '65px', padding: '5px' }}><img src={'/images/products/' + row.image} className="h-100 rounded-circle" /></div>,
        },

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
            name: 'Category',
            selector: 'category.slug',
            sortable: true,
            cell: row => <Link to={'/admin/categories/' + row.category.slug + '/edit'}>{row.category.name}</Link>,
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
            cell: row => <div style={{ height: '80px', wordBreak: 'keep-all' }} className="d-flex justify-content-center align-items-center">
                {
                        isTrashed ?
                            <a href="#" onClick={(e) => restoreProduct(row.id, e)} className="btn btn-sm btn-secondary mr-3">Restore</a>
                            :
                            <Link to={"/admin/products/" + row.id + "/edit"} className="btn btn-sm btn-secondary mr-3">Edit</Link>
                    }
                <button onClick={(e) => deleteProduct(row.id, e)} className="btn btn-sm btn-danger">Delete</button>
            </div>,

        },
    ];

    const [products, setProducts] = useState([]);

    const [isTrashed, setIsTrashed] = useState(false)

    const [status, setStatus] = useState({
        message: '',
        trigger: '',
    })

    const getProducts = (page = null) => {
        Axios.get(page ? (page + (isTrashed ? '&trashed=1' : '&trashed=0')) : ('/api/admin/products?page=1' + (isTrashed ? '&trashed=1' : '&trashed=0')))
            .then(res => setProducts(() => res.data))
            .catch(err => console.log(err))
    }

    const deleteProduct = (id, e) => {
        e.preventDefault()
        if (confirm(isTrashed ? 'Do you want to permanently delete this product?' : 'Do you want to delete this product?')) {
            Axios.delete('/api/admin/products/' + id + (isTrashed ? '?force_delete=1' : ''))
                .then(res => {
                    setStatus({
                        message: 'Product has been successfully deleted!',
                        trigger: 'success'
                    })
                })
                .catch(err => console.log(err))
                .finally(() => getProducts())
        }

    }

    const restoreProduct = (id, e) => {
        e.preventDefault()

        Axios.put('/api/admin/products/' + id + '?restore=1')
            .then(() => {
                setStatus({
                    message: 'Product has been restored!',
                    trigger: 'success'
                })
                getProducts()
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getProducts();
        return () => setProducts([])

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
                                        <h2>Products</h2>
                                        <div>
                                            <Link to="/admin/products/create" className="btn btn-block btn-primary">Create</Link>
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-3">
                                    <div className="col-12">
                                        <a className={"btn btn-primary rounded-0 mr-2 " + (!isTrashed ? 'active' : 'false')} href="#" role="button" onClick={(e) => setIsTrashed(false)}>All</a>
                                        <a className={"btn btn-primary rounded-0 " + (isTrashed ? 'active' : 'false')} href="#" role="button" onClick={(e) => setIsTrashed(true)}>Trashed</a>
                                    </div>
                                </div>

                                <div className="row mb-5">
                                    <div className="col-12">
                                        <div>
                                            {

                                                Object.keys(products).length

                                                ?

                                                <DataTable
                                                    defaultSortField="created_at"
                                                    striped={true}
                                                    noHeader={true}
                                                    data={products.data}
                                                    defaultSortAsc={false}
                                                    columns={columns}
                                                />

                                                :

                                                'Loading...'

                                            }

                                            <Pagination meta={products.meta} getPageData={(page) => getProducts(page)}></Pagination>
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

export default Products
