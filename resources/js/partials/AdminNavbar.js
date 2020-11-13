import Axios from 'axios'
import React from 'react'
import axios from 'axios'
import '../styles/admin.css'

const AdminNavbar = () => {

    const logout = () => {
        axios.post('/logout')
        .then(() => location.replace('/'))
        .catch(err => console.log(err));
    }

    return (
        <>
            <header className="c-header c-header-light c-header-fixed">
                <ul className="c-header-nav mfs-auto">
                    <li className="c-header-nav-item px-3 c-d-legacy-none">
                        <button className="c-className-toggler c-header-nav-btn" type="button" onClick={logout}>
                            Logout
                        </button>

                    </li>
                </ul>
            </header>
        </>
    )
}

export default AdminNavbar
