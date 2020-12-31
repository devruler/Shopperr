import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom';
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import Axios from 'axios';
import DataTable from 'react-data-table-component';
import Pagination from '../../components/Pagination';

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
        cell: row => <div style={{height:'80px', wordBreak:'keep-all'}} className="d-flex justify-content-center align-items-center">
                        <Link to={"/admin/reviews/" + row.id + "/edit"} className="btn btn-sm btn-secondary mr-3">Edit</Link>
                        <button onClick={() => Axios.delete('/api/reviews/' + row.id).then(res => console.log(res).catch(err => console.log(err)))} className="btn btn-sm btn-danger">Delete</button>
                    </div>,

    },
];

const Reviews = () => {

    const [reviews, setReviews] = useState([]);


    const getReviews = (page) => {
        Axios.get(page ? page : '/api/admin/reviews?page=1')
            .then(res => setReviews(() => res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getReviews();
        return () => setReviews([])
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
                                        <h2>Reviews</h2>
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

                                            <Pagination meta={reviews.meta} getPageData={(page) => getReviews(page)}/>
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
