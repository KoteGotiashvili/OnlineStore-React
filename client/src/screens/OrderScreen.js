import React, { useEffect, useState } from 'react'
import Header from "./../components/Header"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import URL from '../redux/actions/Url';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Loading from "../components/loadingError/Loading"
import Message from "../components/loadingError/Error"
import moment from "moment"
import axios from 'axios';
import { getOrderDetails } from "../redux/actions/OrderActions"
import { ORDER_PAY_RESET } from '../redux/constants/OrderConstants';
const OrderScreen = () => {
    window.scrollTo(0, 0)
    const [sdkReady, setSdkReady] = useState(false)

    const { id } = useParams()

    const dispatch = useDispatch()
    const orderDetails = useSelector((state) => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector((state) => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        const orderItems = order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        order.itemsPrice = addDecimals(orderItems)
        order.taxPrice = addDecimals(Number(0.0225 * order.itemsPrice).toFixed(2))


    }
    useEffect(() => {

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get(`${URL}/api/config/paypal`)
            const script = document.createElement("script")
            script.type = "text/javascript"
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!order || successPay) {
            dispatch({ type: ORDER_PAY_RESET })
            dispatch(getOrderDetails(id))

        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()

            } else {
                setSdkReady(true)

            }

        }
    }, [dispatch, id, order, successPay])


    return (
        <>
            <Header />
            <div className='container'>
                {
                    loading ? (<Loading />) : error ? (<Message variant="alert-danger">{error}</Message>) : (
                        <>
                            <div className='row order-detail'>
                                <div className='col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0'>
                                    <div className='row'>
                                        <div className='col-md-4 center'>
                                            <div className='alert-success order-box'>
                                                <i className='fas fa-user'></i>
                                            </div>
                                        </div>
                                        <div className='col-md-8 center'>
                                            <h5>
                                                <strong>მომხმარებელი</strong>
                                            </h5>
                                            <p>{order.user.name}</p>
                                            <p>
                                                <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0'>
                                    <div className='row'>
                                        <div className='col-md-4 center'>
                                            <div className='alert-success order-box'>
                                                <i className='fas fa-truck-moving'></i>
                                            </div>
                                        </div>
                                        <div className='col-md-8 center'>
                                            <h5>
                                                <strong>შეკვეთა</strong>
                                            </h5>
                                            <p>ტრანსპორტირება: {order.shippingAddress.country}</p>
                                            <p>გადახდა:ადგილზე </p>

                                            {
                                                order.isPaid ? (
                                                    <div className='bg-info p-2 col-12'>
                                                        <p className='text-white text-center text-sm-start'>
                                                            გადახდილია {moment(order.paidAt).calendare()}
                                                        </p>
                                                    </div>

                                                ) : (
                                                    <div className='bg-danger p-2 col-12'>
                                                        <p className='text-white text-center text-sm-start'>
                                                            არ არის გადახდილი
                                                        </p>
                                                    </div>

                                                )
                                            }

                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-4 col-sm-4 mb-lg-4 mb-5 mb-sm-0'>
                                    <div className='row'>
                                        <div className='col-md-4 center'>
                                            <div className='alert-success order-box'>
                                                <i className='fas fa-map-marker-alt'></i>
                                            </div>
                                        </div>
                                        <div className='col-md-8 center'>
                                            <h5>
                                                <strong>მიტანა</strong>
                                            </h5>
                                            <p>
                                                მისამართი:{order.shippingAddress.city},{" "}, {order.shippingAddress.address}, {" "}, {order.shippingAddress.postalCode}
                                            </p>
                                            {
                                                order.isDelivered ? (
                                                    <div className='bg-info p-2 col-12'>
                                                        <p className='text-white text-center text-sm-start'>
                                                            მიტანილია {moment(order.deliveredAt).calendare()}
                                                        </p>
                                                    </div>

                                                ) : (
                                                    <div className='bg-danger p-2 col-12'>
                                                        <p className='text-white text-center text-sm-start'>
                                                            არ არის მიტანილი
                                                        </p>
                                                    </div>

                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='row order-products justify-content-between'>
                                <div className='col-lg-8'>
                                    {
                                        order.orderItems.length === 0 ? (
                                            <Message variant="alert-info mt-5">კალათა ცარიელია</Message>
                                        )
                                            : (
                                                <>
                                                    {
                                                        order.orderItems.map((item, index) => (
                                                            <div className='order-product row' key={index}>
                                                                <div className='col-md-3 col-6'>
                                                                    <img src={item.image} alt={item.name} />

                                                                </div>
                                                                <div className='col-md-5 col-6 d-flex align-items-center'>
                                                                    <Link to={`/products/${item.product}`}>
                                                                        <h6>{item.name}</h6>
                                                                    </Link>
                                                                </div>
                                                                <div className='mt-3 mt-md-0 col-6 col-md-2 d-flex align-items-center flex-column'>
                                                                    <h4>რაოდენობა</h4>
                                                                    <h6>{item.qty}</h6>
                                                                </div>
                                                                <div className='mt-3 mt-md-0 col-6 col-md-2 d-flex align-items-end flex-column'>
                                                                    <h4>ჯამში</h4>
                                                                    <h6>{item.qty * item.price}ლ</h6>
                                                                </div>

                                                            </div>


                                                        ))

                                                    }
                                                    <h4>პროდუქტის შეძენა წარმატებით განხორციელდა გმადლობთ,რომ სარგებლობთ ჩვენი მომსახურებით დამატებითი კითხვებისთვის მოგვამრთეთ გიმაილზე komadekomade@gmail.com ან დაგვირეკეთ ნომერზე 591885628</h4>
                                                </>
                                            )
                                    }


                                </div>
                                {/* total */}
                                <div className='col-lg-3 d-flex align-items-end flex-column mt-5 subtotal-order'>
                                    <table className='table table-bordered'>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <strong>პროდუქტები</strong>
                                                </td>
                                                <td>{order.itemsPrice}ლ</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>ტრანსპორტირება</strong>
                                                </td>
                                                <td>{order.shippingPrice}ლ</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>საკომისიო</strong>
                                                </td>
                                                <td>{order.taxPrice}ლ</td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <strong>ჯამში</strong>
                                                </td>
                                                <td>{order.totalPrice}ლ</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    {
                                        !order.isPaid && (
                                            <div className="col-12">
                                                {
                                                    loadingPay && (
                                                        <Loading />
                                                    )
                                                }
                                                {!sdkReady ? (
                                                    <Loading />

                                                ) : (
                                                    null
                                                )
                                                }


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

export default OrderScreen
