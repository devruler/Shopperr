import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import Axios from 'axios';


const EditCategory = () => {

    const { id } = useParams();

    const [category, setCategory] = useState({})

    const [success, setSuccess] = useState(false)

    const history = useHistory()

    const updateCategory = (e) => {
        e.preventDefault()

        Axios.put('/api/admin/categories/' + id, category)
            .then(res => setSuccess(true))
            .catch(err => console.log(err))

    }

    const getCategory = () => {
        Axios.get('/api/admin/categories/' + id)
            .then((res) => setCategory(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getCategory()
    }, []);

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
                                        <h2>Edit Category #{id}</h2>

                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                {
                                                    Object.keys(category).length > 0 &&

                                                    <form onSubmit={(e) => updateCategory(e)}>

                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="form-group">
                                                                    <label htmlFor="categoryName">Category</label>
                                                                    <input value={category.name || ''} onChange={(e) => setCategory({ name: e.target.value })} type="text" className="form-control" placeholder="Category Name" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="row">
                                                            <div className="col">
                                                                <div className="d-flex">
                                                                    <div className="mr-2">
                                                                        <button type="submit" className="btn btn-primary" >Update</button>

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
                                                                        <strong>Review has been successfully updated!</strong>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        }

                                                    </form>
                                                }




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

export default EditCategory
