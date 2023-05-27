import React, { useEffect } from 'react'
import Header from "../components/Header"
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, removeFromCart } from "./../redux/actions/CartActions"
const CartScreen = () => {
    window.scrollTo(0, 0)
    const dispatch = useDispatch()
    const history = useNavigate()
    const { id } = useParams()
    const location = useLocation()
    const qty = location.search ? Number(location.search.split("=")[1]) : 1



    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const total = cartItems.reduce((a, i) => a + i.qty * i.price, 0).toFixed(2)

    useEffect(() => {

        if (id) {
            dispatch(addToCart(id, qty))

        }
    }, [dispatch, history, id, qty])

    const checkOutHandler = (e) => {
        e.preventDefault()
        history("/shipping")
    }
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    return (
        <>
            <Header />
            <div className="container">
                {
                    cartItems.length === 0 ? (
                        <div className='alert alert-info text-center mt-3'>
                            კალათა ცარიელია
                            <Link
                                className='btn btn-success mx-5 px-5 py-3'
                                to="/"
                                style={{
                                    fontSize: "12px",
                                }}
                            >
                                შოფინგი

                            </Link>

                        </div>

                    ) :
                        (
                            <>
                                <div className='alert alert-info text-center mt-3'>
                                    კალათაში არის
                                    <Link className="text-success mx-2" to="/cart">
                                        {cartItems.length + " პროდუქტი"}
                                    </Link>
                                </div>
                                {
                                    cartItems.map((item, index) => (
                                        <div className='cart-iterm row' key={index} >
                                            <div className='remove-button d-flex justify-content-center align-items-center'>
                                                <i onClick={() => removeFromCartHandler(item.product)} className='fas fa-times'></i>
                                            </div>
                                            <div className='cart-image col-md-3'>
                                                <img src={item.image} alt={item.name} />

                                            </div>
                                            <div className='cart-text col-md-5 d-flex align-items-center'>
                                                <Link to={`/products/${item.product}`}>
                                                    <h4>{item.name}</h4>
                                                </Link>
                                            </div>
                                            <div className='cart-qty col-md-2 col-sm-5 mt-md-5 mt-3 mt-md-0 d-flex flex-column'>
                                                <h6>რაოდენობა</h6>
                                                <select value={item.qty} onChange={(e) => dispatch(addToCart(item.product, Number(e.target.value)))}>
                                                    {[...Array(item.countInStock).keys()].map((x) => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}

                                                        </option>
                                                    ))}

                                                </select>
                                            </div>
                                            <div className='cart-price mt-3 mt-md-0 col-md-2 align-items-sm-end align-items-center'>
                                                <h6>ფასი</h6>
                                                <h4>{item.price}ლ</h4>
                                            </div>
                                            <hr />

                                        </div>

                                    ))
                                }
                                <div className='cart-button d-flex align-items-center row'>
                                    <Link to="/" className='col-md-6'>
                                        <button className='btn btn-secondary'>გააგრძელეთ შოფინგი</button>
                                    </Link>

                                </div>


                                <div className='total item-center text-center'>
                                    {
                                        total > 0 && (
                                            <div className='col-md-6 d-flex justify-content-md-end mt-3 mt-md-0 flex-column w-100 '>
                                                <button className='btn btn-secondary btn-lg btn-block ' onClick={checkOutHandler}>

                                                    შეკვეთა

                                                </button>
                                                <span className='sub text-center '>ჯამში:</span>
                                                <span className='total-price '>{total}ლ</span>
                                            </div>

                                        )
                                    }
                                </div>
                            </>
                        )
                }




            </div>
        </>
    )
}

export default CartScreen