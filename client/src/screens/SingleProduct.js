import React, { useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import Rating from "../components/homeComponents/Rating"
import Message from "./../components/loadingError/Error"
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { createProductReview, listProductDetails } from '../redux/actions/ProductActions'
import Loading from '../components/loadingError/Loading'
import { useNavigate } from 'react-router-dom'
import moment from "moment"
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/ProductConstants'
const SingleProduct = () => {
    const history = useNavigate()
    //add to cart function
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")
    const { id } = useParams()
    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails


    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin


    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const { loading: loadingCreateReview, error: errorCreateReview, succes: successCreateReview } = productReviewCreate



    //get product from server
    useEffect(() => {

        if (successCreateReview) {
            setRating(0)
            setComment("")
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }


        dispatch(listProductDetails(id))

    }, [dispatch, id, successCreateReview])

    const addToCartHandle = (e) => {
        e.preventDefault()
        history(`/cart/${id}?qty=${qty}`)
    }
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(id, {
            rating, comment,
        }))


    }
    return (
        <>
            <Header />
            <div className='container single-product'>
                {
                    loading ? (
                        <Loading />
                    )
                        : error ? (
                            <Message variant={"alert-danger"}>{error}</Message>

                        )
                            : (
                                <>
                                    <div className='row'>
                                        <div className='col-md-6'>
                                            <div className='single-image'>
                                                <img src={product.image} alt={product.name}></img>
                                            </div>
                                        </div>
                                        <div className='col-md-6'>
                                            <div className='product-dtl'>
                                                <div className='product-info'>
                                                    <div className='product-name'>{product.name}</div>
                                                </div>
                                                <p>{product.description}</p>
                                                <div className='product-count col-lg-7'>
                                                    <div className='flex-box d-flex justify-content-between align-items-center  '>
                                                        <h6>ფასი</h6>
                                                        <span>{product.price}ლ</span>
                                                    </div>
                                                    <div className='flex-box d-flex justify-content-between align-items-center '>
                                                        <h6>სტატუსი</h6>
                                                        {product.countInStock > 0 ? (
                                                            <span>ხელმისაწვდომი</span>
                                                        ) : (
                                                            <span>ხელმიუწვდომელი</span>
                                                        )
                                                        }
                                                    </div>
                                                    <div className='flex-box d-flex justify-content-between align-items-center '>
                                                        <h6>შეფასებები</h6>
                                                        <Rating value={product.rating}
                                                            text={`${product.numReviews} reviews`}
                                                        />
                                                    </div>
                                                    {product.countInStock > 0 ? (
                                                        <>
                                                            <div className='flex-box d-flex justify-content-between align-items-center'>
                                                                <h6>რაოდენობა</h6>
                                                                <select value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                    {[...Array(product.countInStock).keys()].map((x) => (
                                                                        <option key={x + 1} value={x + 1}>
                                                                            {x + 1}

                                                                        </option>
                                                                    ))}

                                                                </select>

                                                            </div>
                                                            <button onClick={addToCartHandle} className='round-black-btn'>კალათაში დამატება</button>

                                                        </>
                                                    ) : null}

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Rating */}
                                    <div className='row my-5'>
                                        <div className='col-md-6'>
                                            <h6 className='mb-3'>შეფასებები</h6>
                                            {
                                                product.reviews.length === 0 && (
                                                    <Message variant={"alert-info mt-3"}>არ აქვს შეფასება</Message>

                                                )
                                            }
                                            {
                                                product.reviews.map((review) => (
                                                    <div key={review._id} className='mb-5 mb-md-3 bg-light p-3 shadow-sm rounded'>
                                                        <strong>{review.name}</strong>
                                                        <Rating value={review.rating} />
                                                        <span>{moment(review.createdAt).calendar()}</span>
                                                        <div className='alert alert-info mt-3'>
                                                            {review.comment}
                                                        </div>
                                                    </div>
                                                ))
                                            }

                                        </div>
                                        <div className='col-md-6'>
                                            <h6>დაწერეთ შეფასება</h6>

                                            <div className='my-4'>
                                                {loadingCreateReview && <Loading />}
                                                {errorCreateReview && (
                                                    <Message variant="alert-danger">{errorCreateReview}</Message>
                                                )
                                                }

                                            </div>
                                            {
                                                userInfo ? (
                                                    <form onSubmit={submitHandler}>
                                                        <div className='my-4'>
                                                            <strong>შეფასება</strong>
                                                            <select value={rating} onChange={(e) => setRating(e.target.value)} className='col-12 bg-light p-3 mt-2 border-0 rounded'>
                                                                <option value="">აირჩიეთ...</option>
                                                                <option value="1">1 - ცუდი</option>
                                                                <option value="2">2 - საშუალო</option>
                                                                <option value="3">3 - კარგი</option>
                                                                <option value="4">4 - ძალიან კარგი</option>
                                                                <option value="5">5 - გასაოცარი</option>
                                                            </select>
                                                        </div>
                                                        <div className='my-4'>
                                                            <strong>კომენტარი</strong>
                                                            <textarea value={comment} onChange={(e) => setComment(e.target.value)} row="3" className='col-12 bg-light p-3 mt-2 border-0 rounded'>
                                                            </textarea>
                                                        </div>
                                                        <div className='my-3'>
                                                            <button disabled={loadingCreateReview} className='col-12 bg-black border-0 p-3 rounded text-white'>
                                                                დაწერა
                                                            </button>
                                                        </div>
                                                    </form>

                                                ) : (
                                                    <div className='my-3'>
                                                        <Message variant={"alert-warning"}>
                                                            გთხოვთ {" "}
                                                            <Link to="/login">
                                                                "<strong>შედით ექაუნთზე</strong>"
                                                            </Link>{" "}
                                                            რომ დაწეროთ შეფასება{" "}
                                                        </Message>
                                                    </div>

                                                )

                                            }


                                        </div>
                                    </div>

                                </>
                            )
                }

            </div>
        </>
    )
}

export default SingleProduct