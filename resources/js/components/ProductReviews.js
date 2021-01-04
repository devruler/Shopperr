import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Contexts/AuthContext'
import Pagination from './Pagination'

const ProductReviews = ({ productId }) => {

    const [user] = useContext(AuthContext)

    const [reviews, setReviews] = useState({})

    const [comment, setComment] = useState('')

    const [error, setError] = useState('')

    const [success, setSuccess] = useState(false)

    const storeReview = () => {
        let products = user.orders.map(order => order.products).flat()
        if (!user) {
            setError('You\'re not logged in to post a review!')
        } else if (!products.some((product) => product.id === productId)) {
            console.log(products)
            setError('You should buy this product to post a review.')
        } else {
            Axios.post('/api/customer/reviews', { comment: comment, product_id: productId })
            .then(res => setReviews([...reviews, res.data.review]))
            .catch(err => console.log(err))
            .finally(() => {
                setComment('')
                setSuccess(true)
            })
        }

    }

    const getReviews = (page = '/api/reviews?page=1') => {
        Axios.get(page)
            .then(res => setReviews(res.data))
            .catch(err => console.log(err))
    }

    useEffect(() => {
        getReviews()
    }, [])

    return (
        <>
            <div className="card rounded-0 card-outline-secondary my-4 py-4">

                <div className="card-body">

                    <h4 className="mb-4">Product Reviews</h4>

                    {Object.keys(reviews).length && reviews.data.map(review => {
                        return (
                            <div key={review.id}>
                                <p>{review.comment}</p>
                                <small className="text-muted">Posted by {review.user.name} on {new Date(review.created_at).toLocaleString()}</small>
                                <hr />
                            </div>
                        )
                    })}

                    <Pagination meta={reviews.meta} getPageData={(page) => getReviews(page)} />


                    <div className="form-group">
                        <label>Review</label>
                        <textarea onChange={(e) => setComment(e.target.value)} value={comment || ''} className="form-control" name="comment" id="comment" rows="3"></textarea>
                    </div>



                    <br />

                    <button className="btn btn-secondary rounded-0" onClick={() => storeReview()} disabled={comment.length == ''}>Leave a Review</button>

                    {
                    error.length > 0 &&
                    <div className="alert alert-danger mt-3" role="alert">
                        <strong>{error}</strong>
                    </div>
                    }

                    {
                        success &&
                        <div className="alert alert-success mt-3" role="alert">
                            <strong>Review has been successfully posted!</strong>
                        </div>
                    }


                </div>
            </div>
        </>
    )
}

export default ProductReviews
