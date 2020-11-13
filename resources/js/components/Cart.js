import React, { useContext } from 'react'
import { CartContext } from '../Contexts/CartContext'

const Cart = () => {
    const [cartItems, setCartItems] = useContext(CartContext)

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
    return (
        <>
            <div className="container py-5">
                <div className="row">
                    <div className="col-12 col-md-9">
                        <div className="table-responsive-md w-100">
                            <table className="table table-striped table-hover">
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
                                                    <td style={{ maxHeight: '250px', maxWidth: '250px' }}>
                                                        <img className="w-100 " src={'/images/products/' + item.image} alt="" />
                                                    </td>
                                                    <td>{item.title}</td>
                                                    <td>{item.category.name}</td>
                                                    <td>{item.maker}</td>
                                                    <td>{item.model}</td>
                                                    <td>{item.engine}</td>
                                                    <td className="d-flex align-items-center"><input onChange={setItemQty(i)} value={item.qty || 1} className="form-control mr-1" type="number" min="1" style={{ width: '50px' }} /> x</td>
                                                    <td>{item.amount}$</td>

                                                </tr>
                                            )
                                        })
                                    }

                                    <tr>

                                        <td colSpan="6"></td>
                                        <td colSpan="1">Total: </td>
                                        <td colSpan="1">{cartItems && cartItems.reduce((acc, item) => parseFloat(item.amount) + acc,0).toFixed(2)}$</td>

                                    </tr>

                                </tbody>
                            </table>
                        </div>

                    </div>


                    <div className="col-12 col-md-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="w-100">
                                            <button className="btn btn-primary rounded-0 w-100 mb-3">Go To Checkout</button>
                                            <a href="/" className="btn btn-secondary rounded-0 w-100">Continue Shopping</a>
                                            </div>

                                        </div>
                                    </div>
                    </div>



                </div>
            </div>
        </>
    )
}

export default Cart
