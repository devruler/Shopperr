import Axios from 'axios'
import gsap from 'gsap'
import React, { useEffect, useState } from 'react'
import SearchByNameBarStyles from './SearchByNameBarStyles.css'



const SearchBarByName = () => {

    const [productName, setProductName] = useState('')

    const [results, setResults] = useState([])

    const [isFetching, setIsFetching] = useState(false)

    const getSearchResults = () => {



        new Promise ((resolve, rej) => {
            setTimeout(() => {
                setIsFetching(true)
                Axios.get('/api/products/search_by_name?name=' + productName)
                .then((res) => {
                    setResults(res.data.data)
                }).catch(() => console.log(err))
                .finally(() => resolve())
            }, 700)
        }).then(() => setIsFetching(false) )


    }

    useEffect(() => {
        if (productName.length > 2) {
            getSearchResults()
        }

        if (productName.length < 1) {
            setResults([])
        }
    }, [productName])

    useEffect(() => {
        if (results.length) {
            gsap.to('.results-container', { ease: 'power2.out',  css: { opacity: 1, display: "block" } })
        } else {
            gsap.to('.results-container', { ease: 'power2.in', css: { opacity: 0, display: "none" } })
        }
    }, [results])



    return (
        <>
            <div className="input-group search-bar">
                <input
                type="text"
                id="search-input"
                onChange={(e) => setProductName(e.target.value)}
                value={productName || ''}
                className="form-control rounded-0"
                placeholder="Search.."
                onBlur={() => setProductName('')} />

                { isFetching && <div className="spinner-grow"></div> }

                <div className="input-group-append">
                    <button className="btn btn-outline-default search-btn" type="button" id="button-addon2">
                        <i className="fa fa-search search-icon" aria-hidden="true"></i>
                    </button>
                </div>

            </div>

            <div className="card results-container rounded-0 border-0 shadow-sm">
                <div className="card-body">

                    <div className="d-flex flex-column">
                        {
                            results.map((product, index) => {
                                return (
                                    <a className="result" href={'/products/' + product.slug} key={product.id}>
                                        <img src={'/images/products/' + product.image} alt={product.title} />
                                        <span>{product.title.slice(0, 20) + ".."}</span>
                                        <span className="ml-auto">{'$' + product.price}</span>
                                    </a>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchBarByName;
