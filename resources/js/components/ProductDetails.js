import React, { useContext } from 'react'
import { CartContext } from '../Contexts/CartContext'

const ProductDetails = ({ product }) => {

    const [cartItems, setCartItems, getCartItems] = useContext(CartContext)

    const addToCart = () => {

        let existingItem = cartItems.find(element => element.id == product.id)

        console.log(existingItem)

        let newCart

        if (existingItem) {

            newCart = cartItems.map(element => {
                return element.id == product.id
                ? { id: element.id, qty: (element.qty + 1), amount: (product.price * (element.qty + 1)).toFixed(2) }
                : { ...element }
            })

            setCartItems(newCart)
            localStorage.setItem('cartItems', JSON.stringify([...newCart]))


        } else {

            newCart = [...cartItems, { id: product.id, qty: 1, amount: product.price.toFixed(2) }]
            setCartItems(newCart)
            localStorage.setItem('cartItems', JSON.stringify(newCart))

        }

        getCartItems()

    }

    return (
        <>
            <div className="container my-4">
                <div className="row">
                    <div className="col-12 col-md-8">
                        <div className="card rounded-0">
                            <div className="card-body">
                                <img className="img-fluid mb-3" style={{ maxHeight: "250px", maxWidth: "250px", objectFit: "contain" }} src={'/images/products/' + product.image} alt={product.title} />

                                <h3 className="card-title">{product.title}</h3>
                                <h4>${product.price}</h4>

                                <div dangerouslySetInnerHTML={{ __html: product.description }} />

                            </div>
                        </div>


                    </div>

                    <div className="col-12 col-md-4">
                        <div className="card rounded-0">
                            <div className="card-body">
                                <div>
                                    <h5>Maker:</h5> {product.maker}
                                </div>
                                <div>
                                    <h5>Model:</h5> {product.model}
                                </div>
                                <div>
                                    <h5>Engine:</h5> {product.engine ? product.engine : "N/A"}
                                </div>
                                <hr />

                                <button className="btn btn-primary rounded-0" onClick={() => addToCart()}>Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>



            </div>
        </>

    )
}

export default ProductDetails
