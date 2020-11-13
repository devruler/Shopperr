import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Contexts/CartContext'

const ProductCard = ({ product }) => {

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
            <div className="card">

                <div className="card-body" style={{position: 'relative'}}>
                    <a href={'/categories/' + product.category.slug} class="badge badge-secondary p-2" style={{ position: 'absolute', top: '10px', right: '10px' }}>{product.category.name}</a>

                    <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                        <a href={'/products/' + product.slug}><img style={{ height: '200px' }} src={"/images/products/" + product.image} alt="" /></a>

                    </div>
                    <a href={'/products/' + product.slug} style={{ display: 'block', height: '80px' }}>
                        <h5>
                            {product.title.slice(0,60)}
                        </h5></a>
                    <h6>$ {product.price}</h6>
                    <button className="btn btn-primary rounded-0" onClick={() => addToCart()}>Add To Cart</button>

                </div>

            </div>
        </>
    )
}

export default ProductCard
