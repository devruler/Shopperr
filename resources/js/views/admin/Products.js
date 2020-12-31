import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import Axios from 'axios';
import DataTable from 'react-data-table-component';
import Pagination from '../../components/Pagination'

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
            <Link to={"/admin/products/" + row.id + "/edit"} className="btn btn-sm btn-secondary mr-3">Edit</Link>
            <button onClick={() => Axios.delete('/api/products/' + row.id).then(res => console.log(res).catch(err => console.log(err)))} className="btn btn-sm btn-danger">Delete</button>
        </div>,

    },
];



const Products = () => {

    const [products, setProducts] = useState([]);


    const getProducts = (page = null) => {
        Axios.get(page ? page : '/api/products?page=1')
            .then(res => setProducts(() => res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getProducts();
        return () => setProducts([])

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
                                        <h2>Products</h2>
                                        <div>
                                            <Link to="/admin/products/create" className="btn btn-block btn-primary">Create</Link>
                                        </div>
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
