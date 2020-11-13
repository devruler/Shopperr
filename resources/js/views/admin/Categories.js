import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import DataTable from 'react-data-table-component';
import Axios from 'axios';
import {Link} from 'react-router-dom';

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


    const getCategories = () => {
        Axios.get('/api/categories')
            .then(res => setCategories(() => res.data.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getCategories();

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
                                        <h2>Categories</h2>
                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12">
                                    <div>
                                            {

                                                <DataTable
                                                    defaultSortField="created_at"
                                                    striped={true}
                                                    noHeader={true}
                                                    pagination={true}
                                                    data={categories}
                                                    columns={columns}
                                                />

                                            }
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
