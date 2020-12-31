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
                                                        <div className="text-value-lg">124</div>
                                                        <div>New users</div>
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
                                                    <div className="text-value-lg">9</div>
                                                    <div>New Orders</div>
                                                </div>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-lg-3">
                                        <div className="card text-white bg-secondary">
                                            <div className="card-body card-body pb-0 d-flex justify-content-between align-items-start"  style={{height:"100px"}}>
                                            <Link to='#' className="text-white">

                                                <div>
                                                    <div className="text-value-lg">$185.95</div>
                                                    <div>Revenue</div>
                                                </div>
                                                </Link>

                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-sm-6 col-lg-3">
                                        <div className="card text-white bg-secondary">
                                            <div className="card-body card-body pb-0 d-flex justify-content-between align-items-start" style={{height:"100px"}}>
                                            <Link to='/admin/reviews' className="text-white">
                                                <div>
                                                    <div className="text-value-lg">12</div>
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
