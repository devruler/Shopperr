import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import DataTable from 'react-data-table-component';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Pagination from '../../components/Pagination';

const columns = [
    {
        name: 'Name',
        selector: 'name',
        sortable: true
    },

    {
        name: 'Products',
        selector: 'products_count',
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
                        <Link to={"/admin/categories/" + row.id + "/edit"} className="btn btn-sm btn-secondary mr-3">Edit</Link>
                        <button onClick={() => Axios.delete('/api/categories/' + row.id).then(res => console.log(res).catch(err => console.log(err)))} className="btn btn-sm btn-danger">Delete</button>
                    </div>,

    },
];

const Categories = () => {

    const [categories, setCategories] = useState([]);


    const getCategories = (page = null) => {
        Axios.get(page ? page : '/api/admin/categories?page=1')
            .then(res => setCategories(() => res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getCategories();
        return () => setCategories([])

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
                                        <h2>Categories</h2>
                                        <div>
                                            <Link to="/admin/categories/create" className="btn btn-block btn-primary">Create</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12">
                                    <div>
                                            {

                                                Object.keys(categories).length ?

                                                <DataTable
                                                    defaultSortField="created_at"
                                                    striped={true}
                                                    noHeader={true}
                                                    data={categories.data}
                                                    defaultSortAsc={false}
                                                    columns={columns}
                                                />

                                                :

                                                'Loading...'

                                            }

                                            <Pagination meta={categories.meta} getPageData={(page) => getCategories(page)}/>
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

export default Categories
