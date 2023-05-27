import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { saveShippingAddress } from ".././redux/actions/CartActions"
import Message from '../components/loadingError/Error'
function isValiEmail(val) {
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regEmail.test(val)) {
        return 'Invalid Email Address';
    }
}
const ShippingScreen = () => {
    window.scrollTo(0, 0)


    const history = useNavigate()

    const cart = useSelector((state) => state.cart)
    const { shippingAddress } = cart



    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!address || !city || !postalCode || !country || isNaN(postalCode) || isValiEmail(country)) {
            toast.error("შეავსეთ ყველა ველი სწორად", {
                position: "top-center"
            });
            history("/shipping")
        } else {
            history("/payment")
        }
    }

    return (
        <>
            <Header />
            <div className='container d-flex flex-column justify-content-center align-items-center login-form'>
                <ToastContainer />
                <form className='Login col-md-8 col-lg-4 col-11' >

                    <input value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        type="text"
                        placeholder='ქალაქი...'

                    />

                    <input value={address}

                        onChange={(e) => setAddress(e.target.value)}
                        required type="text" placeholder='მისამართი..'
                    />

                    <input
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        required
                        type="tel"
                        placeholder='ნომერი' />
                    <input value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        type="email"
                        placeholder='გიმაილი' />

                    <button type="submit" onClick={submitHandler}>
                        გაგრძელება
                    </button>
                    <p>
                    </p>

                </form>
            </div>
        </>
    )
}

export default ShippingScreen