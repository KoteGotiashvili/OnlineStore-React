import React, { useEffect, useState } from 'react'
import Header from "./../components/Header"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from "./../redux/actions/UserActions"
import Message from "../components/loadingError/Error"
import Loading from "../components/loadingError/Loading"
const Login = () => {
  window.scrollTo(0, 0)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const location = useLocation()
  const redirect = location.search ? location.search.split("=")[1] : "/"
  const history = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { error, loading, userInfo } = userLogin


  useEffect(() => {
    if (userInfo) {
      history(redirect)

    }
  }, [userInfo, history, redirect])

  const submitHandler = (e) => {
    e.preventDefault()

    dispatch(login(email, password))
  }
  return (
    <>
      <Header />
      <div className='container d-flex flex-column justify-content-center align-items-center'>
        {error && <Message variant="alert-danger">{error}</Message>}
        {loading && <Loading />}
        <form className='Login col-md-8 col-lg-4 col-11'
          onSubmit={submitHandler}>
          <input type="email" placeholder='მაილი...'
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder='პაროლი...'
            value={password} onChange={(e) => setPassword(e.target.value)}

          />
          <button type='submit'>შესვლა</button>
          <p>
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>ანგარიშის გაკეთება</Link>
          </p>
          <div className='forgot-password'>
            <Link to="/password-reset">პაროლის აღდგენა</Link>

          </div>

        </form>
      </div>
    </>
  )
}

export default Login