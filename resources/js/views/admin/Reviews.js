import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import Axios from 'axios';
import DataTable from 'react-data-table-component';
import Pagination from '../../components/Pagination';



const Reviews = () => {

    const columns = [
        {
            name: 'Customer',
            selector: 'user.name',
            sortable: true,
            cell: row => <Link to={'/admin/users/' + row.user.id + '/edit'}>{row.user.name}</Link>
        },

        {
            name: 'Comment',
            selector: 'comment',
            sortable: true,
        },

        {
            name: 'Product',
            selector: 'product',
            sortable: true,
            cell: row => <a href={'/products/' + row.product.slug} target='_blank'>{row.product.title.slice(0, 40)}</a>
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
                        <a href="#" onClick={(e) => restoreReview(row.id, e)} className="btn btn-sm btn-secondary mr-3">Restore</a>
                        :
                        <Link to={"/admin/reviews/" + row.id + "/edit"} className="btn btn-sm btn-secondary mr-3">Edit</Link>
                }
                <button onClick={(e) => deleteReview(row.id, e)} className="btn btn-sm btn-danger">Delete</button>
            </div>,

        },
    ];

    const [reviews, setReviews] = useState([]);

    const [isTrashed, setIsTrashed] = useState(false)

    const [status, setStatus] = useState({
        message: '',
        trigger: '',
    })

    const getReviews = (page) => {
        Axios.get(page ? (page + (isTrashed ? '&trashed=1' : '&trashed=0')) : ('/api/admin/reviews?page=1' + (isTrashed ? '&trashed=1' : '&trashed=0')))
            .then(res => setReviews(() => res.data))
            .catch(err => console.log(err))
    }

    const deleteReview = (id, e) => {
        e.preventDefault()
        if (confirm(isTrashed ? 'Do you want to permanently delete this review?' : 'Do you want to delete this review?')) {
            Axios.delete('/api/admin/reviews/' + id + (isTrashed ? '?force_delete=1' : ''))
                .then(res => {
                    setStatus({
                        message: 'Review has been successfully deleted!',
                        trigger: 'success'
                    })
                })
                .catch(err => console.log(err))
                .finally(() => getReviews())
        }

    }

    const restoreReview = (id, e) => {
        e.preventDefault()

        Axios.put('/api/admin/reviews/' + id + '?restore=1')
            .then(() => {
                setStatus({
                    message: 'Review has been restored!',
                    trigger: 'success'
                })
                getReviews()
            }).catch((err) => {
                console.log(err);
            })
    }

    useEffect(() => {
        getReviews();
        return () => setReviews([])
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
                                    <div className="col-12">
                                        <h2>Reviews</h2>
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

                                                Object.keys(reviews).length

                                                    ?

                                                    <DataTable
                                                        defaultSortField="created_at"
                                                        striped={true}
                                                        noHeader={true}
                                                        data={reviews.data}
                                                        defaultSortAsc={false}
                                                        columns={columns}
                                                    />

                                                    :

                                                    'Loading...'

                                            }

                                            <Pagination meta={reviews.meta} getPageData={(page) => getReviews(page)} />
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

export default Reviews
