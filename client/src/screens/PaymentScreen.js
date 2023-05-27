import React, { useState } from 'react'
import Header from "./../components/Header"
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { savePaymentMethod } from '../redux/actions/CartActions'

const PaymentScreen = () => {
  window.scrollTo(0, 0)
  const history = useNavigate()

  const cart = useSelector((state) => state.cart)
  const { shippingAddress } = cart


  if (!shippingAddress) {
    history("/shipping")

  }


  const [paymentMethod, setPaymentMethod] = useState("PayPal")

  const dispatch = useDispatch()

  const submitHandler = (e) => {
    e.preventDefault()
      dispatch(savePaymentMethod(paymentMethod))
      history("/placeorder")
  }

  return (
    <>
      <Header />
      <div className='container d-flex justify-content-center align-items-center login-form'>
        <form className='Login2 col-md-8 col-lg-4 col-11' onSubmit={submitHandler}>
          <h6>გადახდის მეთოდი</h6>
          <div className='payment-container'>
            <div className='radio-container'>
              <input className='form-check-input' type="radio" value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)} defaultChecked

              />
              <label className='form-check-label' >გადახდა მიტანის შემდეგ</label>
            </div>
          </div>
          <button type="submit">
            <Link to="/placeorder" className='text-white'>
              გაგრძელება

            </Link>
          </button>
        </form>
      </div>

    </>
  )
}

export default PaymentScreen