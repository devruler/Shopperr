import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../partials/AdminSidebar';
import AdminNavbar from '../../partials/AdminNavbar';
import { Link } from 'react-router-dom';
import Axios from 'axios';

const Dashboard = () => {

    const [statistics, setStatistics] = useState({})

    const getStatistics = () => {
        Axios.get('/api/admin/statistics')
        .then((res) => setStatistics(res.data))
        .catch(err => console.log(err))
    }

    useEffect(() => {

        getStatistics()

        return () => {
            setStatistics({})
        }

    }, [])

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
                                        <h2>Dashboard</h2>
                                    </div>
                                </div>

                                <div className="row">
                                    <div className="col-12">
                                    <h5>Today's statistics</h5>
                                    </div>
                                    <div className="col-sm-6 col-lg-3">

                                        <div className="card text-white bg-secondary">
                                            <div className="card-body card-body pb-0 d-flex justify-content-between align-items-start"  style={{height:"100px"}}>

                                                <Link to='/admin/customers' className="text-white">
                                                    <div>
                                                        <div className="text-value-lg">{statistics.customers_count}</div>
                                                        <div>New customers</div>
                                                    </div>
                                                </Link>


                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-lg-3">
                                        <div className="card text-white bg-secondary">
                                            <div className="card-body card-body pb-0 d-flex justify-content-between align-items-start"  style={{height:"100px"}}>
                                            <Link to='/admin/orders' className="text-white">

                                                <div>
                                                    <div className="text-value-lg">{statistics.orders_count}</div>
                                                    <div>New Orders</div>
                                                </div>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>

                                    {
                                        statistics.hasOwnProperty('revenue') &&

                                        <div className="col-sm-6 col-lg-3">
                                        <div className="card text-white bg-secondary">
                                            <div className="card-body card-body pb-0 d-flex justify-content-between align-items-start"  style={{height:"100px"}}>
                                            <a href='#' className="text-white" data-toggle="modal" data-target="#revenueModal">

                                                <div>
                                                    <div className="text-value-lg">{'$' + statistics.revenue.today}</div>
                                                    <div>Revenue</div>
                                                </div>
                                            </a>


                                            <div className="modal fade text-dark" id="revenueModal" tabIndex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
                                                <div className="modal-dialog  modal-dialog-centered" role="document">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title">Revenue statistics</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                        </div>
                                                        <div className="modal-body d-flex flex-column">
                                                            <div className="py-3">
                                                                <span className="font-weight-bold">Today's revenue: </span>
                                                                <span>{'$' + statistics.revenue.today}</span>
                                                            </div>
                                                            <div className="py-3">
                                                                <span className="font-weight-bold">This week revenue: </span>
                                                                <span>{'$' + statistics.revenue.week}</span>
                                                            </div>
                                                            <div className="py-3">
                                                                <span className="font-weight-bold">This month revenue: </span>
                                                                <span>{'$' + statistics.revenue.month}</span>
                                                            </div>
                                                            <div className="py-3">
                                                                <span className="font-weight-bold">All time revenue: </span>
                                                                <span>{'$' + statistics.revenue.allTime}</span>
                                                            </div>
                                                        </div>
                                                        <div className="modal-footer">
                                                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            </div>
                                        </div>
                                    </div>}

                                    <div className="col-sm-6 col-lg-3">
                                        <div className="card text-white bg-secondary">
                                            <div className="card-body card-body pb-0 d-flex justify-content-between align-items-start" style={{height:"100px"}}>
                                            <Link to='/admin/reviews' className="text-white">
                                                <div>
                                                    <div className="text-value-lg">{statistics.reviews_count}</div>
                                                    <div>Reviews</div>
                                                </div>
                                                </Link>

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


export default Dashboard
