import React from 'react'

const Footer = () => {

    const year = new Date().getFullYear()

    return (
        <footer style={{backgroundColor: "#171919"}}>
            <div className="container">
                <div className="row py-4">
                    <div className="col-md-4 footer-column">
                        <ul className="nav flex-column">
                            <li className="nav-item mb-3">
                                <span className="footer-title">Product</span>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Product 1</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Product 2</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Plans & Prices</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Frequently asked questions</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 footer-column">
                        <ul className="nav flex-column">
                            <li className="nav-item mb-3">
                                <span className="footer-title">Company</span>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">About us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Job postings</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">News and articles</a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 footer-column">
                        <ul className="nav flex-column">
                            <li className="nav-item mb-3">
                                <span className="footer-title">Contact & Support</span>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link"><i className="fas fa-phone"></i>+47 45 80 80 80</span>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="fas fa-comments"></i>Live chat</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="fas fa-envelope"></i>Contact us</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><i className="fas fa-star"></i>Give feedback</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <hr/>

                <div className="text-center"><i className="fas fa-ellipsis-h"></i></div>

                <div className="row">
                    <div className="col-md-4 box">
                        <span className="copyright quick-links">Copyright &copy; Shopperr {year}
                        </span>
                    </div>
                    <div className="col-md-4 box text-center">
                        <ul className="list-inline social-buttons">
                            <li className="list-inline-item">
                                <a href="#">
                                    <i className="fab fa-twitter"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-4 box d-flex justify-content-end">
                        <ul className="list-inline quick-links">
                            <li className="list-inline-item">
                                <a href="#">Privacy Policy</a>
                            </li>
                            <li className="list-inline-item">
                                <a href="#">Terms of Use</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
