import gsap from 'gsap'
import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../Contexts/CartContext'
import ProductCardStyles from './ProductCardStyles.css'

const ProductCard = ({ product }) => {

    const [cartItems, setCartItems, getCartItems] = useContext(CartContext)

    // const productCategory = useRef(null)

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

    const toggleCategory = (toggler) => {
        if (toggler) {
            gsap.to('.category-' + product.id, { duration: .1, ease: 'power2.out', y: 50 })

        } else {
            gsap.to('.category-' + product.id, { duration: .1, ease: 'power2.in', y: -50 })
        }
    }

    return (
        <>
            <div className="card product-card rounded-0 border-0 shadow-sm">

                <div className="card-body" onMouseEnter={() => toggleCategory(true)} onMouseLeave={() => toggleCategory(false)}>
                    <a href={'/categories/' + product.category.slug} className={'badge badge-secondary rounded-bottom p-2 product-category category-' + product.id} >{product.category.name}</a>

                    <div className="mb-3 d-flex align-items-center justify-content-center" style={{ height: '200px' }}>
                        <a href={'/products/' + product.slug}><img style={{ height: '200px' }} src={"/images/products/" + product.image} alt="" /></a>

                    </div>
                    <a href={'/products/' + product.slug} style={{ display: 'block', height: '80px' }}>
                        <h5>
                            {product.title.slice(0, 60)}
                        </h5></a>
                    <h6>$ {product.price}</h6>

                    <button
                        className="btn btn-primary rounded-0 d-flex align-items-center shadow-sm"
                        onClick={() => addToCart()}>
                        Add To Cart
                    </button>

                </div>

            </div>
        </>
    )
}

export default ProductCard
