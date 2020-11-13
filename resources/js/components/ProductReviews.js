import Axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Contexts/AuthContext'

const ProductReviews = ({ productId }) => {

    const [user] = useContext(AuthContext)

    const [reviews, setReviews] = useState({})

    const [comment, setComment] = useState('')

    const storeReview = () => {
        Axios.post('/api/customer/reviews', { comment: comment, product_id: productId })
            .then(res => setReviews([...reviews, res.data.review]))
            .catch(err => console.log(err))
            .finally(() => setComment(''))
    }

    const getReviews = () => {
        Axios.get('/api/reviews')
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
                            <div>
                                <p>{review.comment}</p>
                                <small className="text-muted">Posted by {review.user.name} on {new Date(review.created_at).toLocaleString()}</small>
                                <hr />
                            </div>
                        )
                    })}

                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                    <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                    <hr />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                    <small className="text-muted">Posted by Anonymous on 3/1/17</small>
                    <hr />
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Omnis et enim aperiam inventore, similique necessitatibus neque non! Doloribus, modi sapiente laboriosam aperiam fugiat laborum. Sequi mollitia, necessitatibus quae sint natus.</p>
                    <small className="text-muted">Posted by Anonymous on 3/1/17</small>

                    <hr /> */}

                    <div className="form-group">
                        <label>Review</label>
                        <textarea onChange={(e) => setComment(e.target.value)} className="form-control" name="comment" id="comment" rows="3"></textarea>
                    </div>

                    {!user && <small className="text-danger">You must be logged in to add a review.</small>}
                    <br />

                    <button className="btn btn-secondary rounded-0" onClick={() => storeReview()} disabled={!user}>Leave a Review</button>


                </div>
            </div>
        </>
    )
}

export default ProductReviews
