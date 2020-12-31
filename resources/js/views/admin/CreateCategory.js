import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import Axios from 'axios';



const CreateCategory = () => {

    const [category, setCategory] = useState({ errors: {} });

    const [success, setSuccess] = useState(false)

    const history = useHistory()

    const storeCategory = (e) => {
        e.preventDefault();

        Axios.post('/api/admin/categories', category)
            .then(res => setSuccess(true))
            .catch(err => {
                if (err.response.status >= 400 && err.response.status < 500) {
                    setCategory({ ...category, errors: err.response.data.errors })
                }
            })
    }


    useEffect(() => {
        if (success) {
            setTimeout(() => {
                history.push('/admin/categories')
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
                                        <h2>Create New Category</h2>

                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                <form onSubmit={(e) => storeCategory(e)}>
                                                    <div className="row">
                                                        <div className="col-12">
                                                            <div className="form-group">
                                                                <label htmlFor="categoryName">Category</label>
                                                                <input value={category.name || ''} onChange={(e) => setCategory({ ...category, name: e.target.value })} type="text" className="form-control" placeholder="Category Name" />
                                                                {category.errors.hasOwnProperty('name') && <small className="form-text text-danger">{category.errors.name[0]}</small>}
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="row">
                                                        <div className="col">
                                                            <div className="d-flex">
                                                                <div className="mr-2">
                                                                    <button type="submit" className="btn btn-primary" >Create</button>

                                                                </div>
                                                                <div>
                                                                    <Link to={'/admin/categories'} className="btn btn-block btn-secondary" >Go Back</Link>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {

                                                        success &&

                                                        <div className="row mt-3">
                                                            <div className="col">
                                                                <div className="alert alert-success" role="alert">
                                                                    <strong>Category has been successfully created!</strong>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }

                                                </form>
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

export default CreateCategory
