import React, { useContext } from 'react'
import CartWidgetStyles from './CartWidgetStyles.css'
import {CartContext} from '../Contexts/CartContext'

const CartWidget = () => {
    const [cartItems, setCartItems] = useContext(CartContext)

    return (
            <div className="card cart-widget shadow-sm text-left rounded-0 border-none">
              <div className="card-body">
                <div className="d-flex flex-column">
                {   cartItems && cartItems.map((item, i) => {
                        return (
                            <div key={item.id} className="d-flex justify-content-between align-items-center border-bottom py-2">
                                <img className="product-img" src={'/images/products/' + item.image} alt="" />
                                <span>{item.title && item.title.slice(0,20) + '..'}</span>
                                <span>{item.amount}$</span>
                            </div>
                        )
                    })
                }

                {
                    cartItems &&
                    (
                        <>
                            <hr/>
                            <h6 className="text-right font-weight-bold">Total: {cartItems.reduce((acc, item) => parseFloat(item.amount) + acc, 0).toFixed(2)}$</h6>
                        </>
                    )
                }
                </div>
              </div>
            </div>
    )
}

export default CartWidget
