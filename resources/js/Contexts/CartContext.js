import Axios from 'axios'
import React, {useState, useEffect} from 'react'

const CartContext = React.createContext()


const CartProvider = (props) => {

    const [cartItems, setCartItems] = useState([])

    const getCartItems = () => {
        const data = JSON.parse(localStorage.getItem('cartItems'));
        if(data){
            let listOfIds = data.map(v => v.id)
            Axios.get('/api/products/search_ids?ids=' + listOfIds)
            .then(res => {
                setCartItems(() => {
                    return res.data.data.map((item) => {
                        let itemDetails = data.find((element) => element.id === item.id)
                        return {...item,...itemDetails}
                    })
                })
            })
            .catch(err => console.log(err))
        }
    }

    useEffect(() => {
        getCartItems()
    }, [])

    return (
        <CartContext.Provider value={[cartItems, setCartItems, getCartItems]}>
            { props.children }
        </CartContext.Provider>
    )
}

export {CartContext, CartProvider}
