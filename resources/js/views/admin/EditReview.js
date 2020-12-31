import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import Axios from 'axios';


const EditReview = () => {

    const { id } = useParams();

    const [review, setReview] = useState({ errors: {} })

    const [updatedReview, setUpdatedReview] = useState({})

    const [success, setSuccess] = useState(false)

    const history = useHistory()

    const updateReview = (e) => {
        e.preventDefault()

        Axios.put('/api/admin/reviews/' + id, updatedReview)
            .then(res => {
                setSuccess(true)
            })
            .catch(err => {
                if (err.response.status >= 400 && err.response.status < 500) {
                    setReview({ ...review, errors: err.response.data.errors })
                }
            })

    }

    const getReview = () => {
        Axios.get('/api/admin/reviews/' + id)
            .then((res) => setReview({...res.data, errors: {}}))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getReview()
    }, []);

    useEffect(() => {
        if (success) {
            setTimeout(() => {
                history.push('/admin/reviews')
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
                                        <h2>Edit Review #{id}</h2>

                                    </div>
                                </div>
                                <div className="row mb-5">
                                    <div className="col-12">
                                        <div className="card">
                                            <div className="card-body">
                                                {
                                                    Object.keys(review).length &&

                                                    <form onSubmit={(e) => updateReview(e)}>

                                                        <div className="row">
                                                            <div className="col-12">
                                                                <div className="form-group">
                                                                    <label>Comment</label>
                                                                    <textarea onChange={(e) => setUpdatedReview({ ...updatedReview, comment: e.target.value })} defaultValue={review.comment || ''} className="form-control" rows="6"></textarea>
                                                                    {review.errors.hasOwnProperty('comment') && <small className="form-text text-danger">{review.errors.comment[0]}</small>}
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
                                                                        <Link to={'/admin/reviews'} className="btn btn-block btn-secondary" >Go Back</Link>

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

export default EditReview
