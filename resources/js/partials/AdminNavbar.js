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
                <button className="c-header-toggler c-class-toggler d-lg-none mfe-auto" type="button" data-target="#sidebar" data-class="c-sidebar-show">
                    <svg id="cil-menu" height="25" viewBox="0 0 512 512">
                        <rect width="352" height="32" x="80" y="96" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></rect><rect width="352" height="32" x="80" y="240" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></rect><rect width="352" height="32" x="80" y="384" fill="var(--ci-primary-color, currentColor)" className="ci-primary"></rect>
                    </svg>
                </button>
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
