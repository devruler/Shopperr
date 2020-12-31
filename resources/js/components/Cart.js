import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Contexts/CartContext'
import { AuthContext } from '../Contexts/AuthContext'
import EmptyCart from '../assets/images/empty_cart.svg'
import Axios from 'axios'
import LoadingOverlay from 'react-loading-overlay';

const emptyCartStyles = {
    width: "70%",
    position: "relative",
    opacity: "0.6"
}

const Cart = ({ setIsLoading }) => {

    const [cartItems, setCartItems] = useContext(CartContext)

    const [user] = useContext(AuthContext)

    const [userDetails, setUserDetails] = useState({ errors: {} })

    const [checkoutStep, setCheckoutStep] = useState(1)

    const [isPaypalInit, setIsPaypalInit] = useState(false)

    const [isPaid, setIsPaid] = useState(false)

    const [order, setOrder] = useState({
        total: 0,
        payment_method: '',
        shipping_method: '',
        products: cartItems
    })

    const setItemQty = (index) => (e) => {

        let product = cartItems[index]

        let existingItem = cartItems.find(element => element.id == product.id)

        let newCart

        if (existingItem) {

            newCart = cartItems.map(element => {
                return element.id == product.id
                    ? { ...element, id: element.id, qty: parseInt(e.target.value), amount: (element.price * e.target.value).toFixed(2) }
                    : { ...element }
            })

            setCartItems(newCart)
            localStorage.setItem('cartItems', JSON.stringify(newCart.map(item => ({ id: item.id, qty: item.qty, amount: item.amount }))))

        }
    }

    const goToCheckout = () => {

        if (checkoutStep === 1) {

            setTimeout(() => {
                document.getElementById('checkoutInformation').scrollIntoView({
                    behavior: 'smooth',
                    block: "center"
                });
            }, 700)

            setCheckoutStep(2)
        } else {
            setCheckoutStep(1)
        }

    }


    const updateUserDetails = () => {
        setIsLoading(true)

        Axios.put('/user/profile-information', userDetails)
        .then(res => {
            console.log(res)
            setCheckoutStep(3)
            let alert = document.querySelector('#userDetailsAlert')
            alert.innerHTML = "You've confirmed your information."
            alert.className = "alert alert-success"

        })
        .catch(err => {
            if (err.response) {
                // client received an error response (5xx, 4xx)
                setUserDetails({ ...userDetails, errors: err.response.data.errors })
            } else if (err.request) {
                // client never received a response, or request never left
            } else {
                // anything else
            }
        })

        .finally(() => setIsLoading(false))


    }

    const createNewUser = () => {
        setIsLoading(true)
        Axios.post('/register', userDetails)
            .then(res => {
                console.log(res)
                setCheckoutStep(3)
                let alert = document.querySelector('#userDetailsAlert')
                alert.innerHTML = "You've successfuly registered a new account."
                alert.className = "alert alert-success"
            })
            .catch(err => {
                if (err.response) {
                    // client received an error response (5xx, 4xx)
                    setUserDetails({ ...userDetails, errors: err.response.data.errors })
                } else if (err.request) {
                    // client never received a response, or request never left
                } else {
                    // anything else

                }
            })
            .finally(() => {
                location.reload()
                setIsLoading(false)
            })

    }

    const handleUserDetails = (e) => {
        e.preventDefault()
        if (user) {
            console.log('user exist')
            updateUserDetails()
        } else {
            console.log('user doesn\'t exist')
            createNewUser()
        }
    }

    const storeOrder = (shippingMethod, paymentMethod) => {

        let data = {
            products: cartItems,
            total: order.total,
            shipping_method:shippingMethod,
            payment_method: paymentMethod,
        }


            Axios.post('/api/customer/orders', data)
            .then((res) => {
                console.log(res)
            }).catch(err => console.log(err))


    }

    const initPaypal = () => {
        // Handle payment event

        window.paypal.Buttons({
            createOrder: function (data, actions) {
                // This function sets up the details of the transaction, including the amount and line item details.
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: order.total
                        }
                    }]
                });
            },
            onApprove: function (data, actions) {
                // This function captures the funds from the transaction.
                return actions.order.capture().then(function (details) {
                    // This function shows a transaction success message to your buyer.

                    return setOrder({ ...order, products: cartItems, payment_method: 'Paypal', shipping_method: 'Standard Shipping' })






                }).then(() => {

                    storeOrder('Standard Shipping', 'Paypal')

                    setIsPaid(true);

                    setCartItems([])

                    localStorage.removeItem('cartItems')

                    console.log(details)

                });
            }
        }).render('#paypal-button-container');
        //This function displays Smart Payment Buttons on your web page.

    }


    useEffect(() => {
        setOrder({ ...order, total: cartItems.reduce((acc, item) => parseFloat(item.amount) + acc, 0).toFixed(2) })
    }, [cartItems])

    useEffect(() => {
        if (document.getElementById('paypal-button-container') && !isPaypalInit) {
            setTimeout(() => {
                initPaypal()
            }, 1000)
            setIsPaypalInit(true)
        }
    }, [order.total])

    useEffect(() => {
        setUserDetails({ ...user, errors: {} } || { errors: {} })
    }, [user])


    useEffect(() => {
        switch (checkoutStep) {
            case 1:
                $('#checkoutInformation').collapse('hide')
                $('#paypal_button_container').collapse('hide')
                break;
            case 2:
                $('#checkoutInformation').collapse('show')
                $('#paypal_button_container').collapse('hide')
                break;
            case 3:
                $('#paypal_button_container').collapse('show')
                break;
            default:
                break;
        }

        if (checkoutStep === 3) {
            document.querySelector('#paypal-container').style.display = "block"
        }

    }, [checkoutStep])

    return (
        <>


            <div className="container py-5">
                {cartItems.length ?
                    <div className="row">
                        <div className="col-12 col-md-9">

                            <div className="card rounded-0 border-0 shadow-sm">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <div className="table-responsive-md w-100">
                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th className="border-0 text-sm" scope="col"></th>
                                                            <th className="border-0 text-sm" scope="col">Name</th>
                                                            <th className="border-0 text-sm" scope="col">Category</th>
                                                            <th className="border-0 text-sm" scope="col">Maker</th>
                                                            <th className="border-0 text-sm" scope="col">Model</th>
                                                            <th className="border-0 text-sm" scope="col">Engine</th>
                                                            <th className="border-0 text-sm" scope="col">Qty</th>
                                                            <th className="border-0 text-sm" scope="col">Amount</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            cartItems && cartItems.map((item, i) => {
                                                                return (
                                                                    <tr key={item.id}>
                                                                        <td style={{ height: '80px' }}>
                                                                            <img className="d-block h-100 mx-auto" src={'/images/products/' + item.image} alt="" />
                                                                        </td>
                                                                        <td>{item.title}</td>
                                                                        <td>{item.category.name}</td>
                                                                        <td>{item.maker}</td>
                                                                        <td>{item.model}</td>
                                                                        <td>{item.engine}</td>
                                                                        <td className="d-flex align-items-center"><input onChange={setItemQty(i)} value={item.qty || 1} className="form-control mr-1" type="number" min="1" style={{ width: '50px' }} disabled={checkoutStep === 1 ? false : true} /> x</td>
                                                                        <td>{item.amount}$</td>

                                                                    </tr>
                                                                )
                                                            })
                                                        }

                                                        <tr>

                                                            <td colSpan="6"></td>
                                                            <td colSpan="1">Total: </td>
                                                            <td colSpan="1">{cartItems && order.total}$</td>

                                                        </tr>

                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row collapse" id="checkoutInformation">
                                        <div className="col mt-4">
                                            <h4 className="mb-4">Your information</h4>
                                            <form onSubmit={(e) => handleUserDetails(e)}>
                                                <div className="form-group">
                                                    <label>Full name</label>
                                                    <input type="text" minLength="3" onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })} value={userDetails.name || ''} className={userDetails.errors.hasOwnProperty('name') ? "form-control is-invalid" : "form-control"} placeholder="Full name" required />
                                                    {userDetails.errors.hasOwnProperty('name') && <div className="unvalid-feedback"></div>}
                                                </div>
                                                <div className="form-group">
                                                    <label>Email</label>
                                                    <input type="email" onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })} value={userDetails.email || ''} className={userDetails.errors.hasOwnProperty('email') ? "form-control is-invalid" : "form-control"} placeholder="Email" required />
                                                    {userDetails.errors.hasOwnProperty('email') && <div className="unvalid-feedback"></div>}
                                                </div>
                                                <div className="form-group">
                                                    <label>Phone number</label>
                                                    <input type="tel" onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })} value={userDetails.phone || ''} className={userDetails.errors.hasOwnProperty('phone') ? "form-control is-invalid" : "form-control"} placeholder="Phone number" required />
                                                    {userDetails.errors.hasOwnProperty('phone') && <div className="unvalid-feedback"></div>}
                                                </div>
                                                <div className="form-group">
                                                    <label>Address</label>
                                                    <input type="text" minLength="3" onChange={(e) => setUserDetails({ ...userDetails, address: e.target.value })} value={userDetails.address || ''} className={userDetails.errors.hasOwnProperty('address') ? "form-control is-invalid" : "form-control"} placeholder="Address" required />
                                                    {userDetails.errors.hasOwnProperty('address') && <div className="unvalid-feedback"></div>}
                                                </div>
                                                <div className="row">
                                                    <div className="col">
                                                        <div className="form-group">
                                                            <label>Country</label>
                                                            <input type="text" minLength="3" onChange={(e) => setUserDetails({ ...userDetails, country: e.target.value })} value={userDetails.country || ''} className={userDetails.errors.hasOwnProperty('country') ? "form-control is-invalid" : "form-control"} placeholder="Country" required />
                                                            {userDetails.errors.hasOwnProperty('country') && <div className="unvalid-feedback"></div>}
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="form-group">
                                                            <label>City</label>
                                                            <input type="text" minLength="3" onChange={(e) => setUserDetails({ ...userDetails, city: e.target.value })} value={userDetails.city || ''} className={userDetails.errors.hasOwnProperty('city') ? "form-control is-invalid" : "form-control"} placeholder="City" required />
                                                            {userDetails.errors.hasOwnProperty('city') && <div className="unvalid-feedback"></div>}
                                                        </div>
                                                    </div>
                                                    <div className="col">
                                                        <div className="form-group">
                                                            <label>Postal code</label>
                                                            <input type="text" minLength="3" onChange={(e) => setUserDetails({ ...userDetails, postal_code: e.target.value })} value={userDetails.postal_code || ''} className={userDetails.errors.hasOwnProperty('postal_code') ? "form-control is-invalid" : "form-control"} placeholder="Postal code" required />
                                                            {userDetails.errors.hasOwnProperty('postal_code') && <div className="unvalid-feedback"></div>}
                                                        </div>
                                                    </div>
                                                </div>
                                                {
                                                    !user &&
                                                    <div className="row form-group">
                                                        <div className="col">
                                                            <label>Password</label>
                                                            <input type="password" minLength="8" onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })} className={userDetails.errors.hasOwnProperty('password') ? "form-control is-invalid" : "form-control"} placeholder="Password" required />
                                                            {userDetails.errors.hasOwnProperty('password') && <div className="unvalid-feedback"></div>}
                                                        </div>
                                                        <div className="col">
                                                            <label>Confirm Password</label>
                                                            <input type="password" minLength="8" onChange={(e) => setUserDetails({ ...userDetails, password_confirmation: e.target.value })} className={userDetails.errors.hasOwnProperty('password_confirmation') ? "form-control is-invalid" : "form-control"} placeholder="Confirm password" required />
                                                            {userDetails.errors.hasOwnProperty('password_confirmation') && <div className="unvalid-feedback"></div>}
                                                        </div>
                                                    </div>
                                                }

                                                <div id="userDetailsAlert"></div>
                                                <button type="submit" className="btn btn-primary rounded-0" disabled={checkoutStep < 3 ? false : true} >{user ? 'Confirm' : 'Sign up'} & Proceed</button>
                                            </form>
                                        </div>
                                    </div>



                                    <div className="row" style={{ display: "none" }} id="paypal-container">
                                        <div className="col d-flex justify-content-center">
                                            <div id="paypal-button-container"></div>
                                        </div>
                                    </div>


                                </div>
                            </div>


                        </div>


                        <div className="col-12 col-md-3">
                            <div className="card sticky-top rounded-0 border-0 shadow-sm" style={{ top: "90px", zIndex: "1" }}>
                                <div className="card-body">
                                    <div className="w-100">
                                        <button onClick={() => goToCheckout()} className="btn btn-primary rounded-0 w-100 mb-3">Go To Checkout</button>
                                        <a href="/" className="btn btn-secondary rounded-0 w-100">Continue Shopping</a>
                                    </div>

                                </div>
                            </div>
                        </div>



                    </div>
                    :
                    <div className="row py-5">
                        <div className="col d-flex justify-content-center align-items-center" >
                            <img src={EmptyCart} style={emptyCartStyles} alt="empty cart" />
                            <div className="d-flex flex-column" style={{ position: "absolute", top: "100px", left: "100px" }}>
                                <h2 style={{ fontSize: "5vw", color: '#D3AD2E' }}>{isPaid ? 'Payment has been succesfully completed!' : 'Your cart is empty'}</h2>
                                <div>
                                    <a href="/" className="btn btn-secondary rounded-0">Continue shopping</a>

                                </div>
                            </div>
                        </div>
                    </div>

                }

            </div>
        </>
    )
}

export default Cart
