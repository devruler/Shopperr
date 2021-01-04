import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import DataTable from 'react-data-table-component';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import Pagination from '../../components/Pagination';



const Categories = () => {

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
            cell: row => <div style={{ height: '80px', wordBreak: 'keep-all' }} className="d-flex justify-content-center align-items-center">
                {
                    isTrashed ?
                    <a href="#" onClick={(e) => restoreCategory(row.id, e)} className="btn btn-sm btn-secondary mr-3">Restore</a>
                    :
                    <Link to={"/admin/categories/" + row.id + "/edit"} className="btn btn-sm btn-secondary mr-3">Edit</Link>
                }
                <button onClick={(e) => deleteCategory(row.id, e)} className="btn btn-sm btn-danger">Delete</button>
            </div>,

        },
    ];

    const [categories, setCategories] = useState([]);

    const [isTrashed, setIsTrashed] = useState(false)

    const [status, setStatus] = useState({
        message: '',
        trigger: '',
    })

    const getCategories = (page = null) => {
        Axios.get(page ? (page + (isTrashed ? '&trashed=1' : '&trashed=0')) : ('/api/admin/categories?page=1' + (isTrashed ? '&trashed=1' : '&trashed=0')))
            .then(res => setCategories(() => res.data))
            .catch(err => console.log(err))
    }

    const deleteCategory = (id, e) => {
        e.preventDefault()
        if (confirm((isTrashed ? 'Do you want to permanently delete this category?' : 'Do you want to delete this category?'))) {
            Axios.delete('/api/admin/categories/' + id + (isTrashed ? '?force_delete=1' : ''))
                .then(res => {
                    setStatus({
                        message: 'Category has been successfully deleted!',
                        trigger: 'success'
                    })
                })
                .catch(err => console.log(err))
                .finally(() => getCategories())
        }

    }

    const restoreCategory = (id, e) => {
        e.preventDefault()

        Axios.put('/api/admin/categories/' + id + '?restore=1')
        .then(() => {
            setStatus({
                message: 'Category has been restored!',
                trigger: 'success'
            })
            getCategories()
        }).catch((err) => {
            console.log(err);
        })
    }



    useEffect(() => {
        getCategories();
        return () => setCategories([])

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
                                        <h2>Categories</h2>
                                        <div>
                                            <Link to="/admin/categories/create" className="btn btn-block btn-primary">Create</Link>
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

                                            <Pagination meta={categories.meta} getPageData={(page) => getCategories(page)} />
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
