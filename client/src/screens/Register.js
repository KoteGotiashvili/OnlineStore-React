import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../redux/actions/UserActions'
import Message from "../components/loadingError/Error"
import Loading from "../components/loadingError/Loading"
const Register = () => {
    window.scrollTo(0, 0)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const location = useLocation()
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split("=")[1] : "/"
    const history = useNavigate()


    const userRegister = useSelector((state) => state.userRegister)
    const { error, loading, userInfo } = userRegister


    useEffect(() => {
        if (userInfo) {
            history(redirect)

        }
    }, [userInfo, history, redirect])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(register(name, email, password))
    }
    return (
        <>
            <Header />
            <div className='container d-flex flex-column justify-content-center align-items-center' >
                {error && <Message variant="alert-danger">{error}</Message>}
                {loading && <Loading />}

                <form className='Login col-md-8 col-lg-4 col-11' onSubmit={submitHandler}>
                    <input type="text" placeholder='სახელი...'
                        value={name} onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input type="email" placeholder='მაილი...'
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input type="password" placeholder='პაროლი...'

                        value={password} onChange={(e) => setPassword(e.target.value)}
                        required

                    />
                    <button type="submit" >
                        რეგისტრაცია
                    </button>
                    <p>
                        <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                            გაქვთ ექაუნთი? <strong>შესვლა</strong>
                        </Link>
                    </p>

                </form>
            </div>
        </>
    )
}

export default Register