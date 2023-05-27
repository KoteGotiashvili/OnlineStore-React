import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import logo from "./komade.jpg"
import { logout } from "../redux/actions/UserActions"
const Header = () => {

    const [keyword, setKeyword] = useState()

    const dispatch = useDispatch()

    let history = useNavigate()
    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
        history("/")


    }
    const submitHandler = (e) => {
        e.preventDefault()

        if (keyword.trim()) {
            history(`/search/${keyword}`)

        } else {
            history("/")
        }


    }

    return (
        <div>
            {/* <div className='Announcement'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6 d-flex align-items-center display-none'>
                            <p>591885628</p>
                            <p>komade@gmail.com</p>
                        </div>
                        <div className='col-12 col-lg-6 justify-content-center justify-content-lg-center'>
                            <Link tp="">
                                <i className='fab fa-facebook-f'></i>
                            </Link>
                            <Link tp="">
                                <i className='fab fa-instagram'></i>
                            </Link>
                            <Link tp="">
                                <i className='fab fa-linkedin-in'></i>
                            </Link>
                            <Link tp="">
                                <i className='fab fa-youtube'></i>
                            </Link>
                            <Link tp="">
                                <i className='fab fa-pinterest-p'></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div> */}
            <div className='header '>
                <div className='container'>
                    {/* Mobile Header */}
                    <div className='mobile-header'>
                        <div className='container'>
                            <div className='row'>
                                <div className='col-6 d-flex align-items-center'>
                                    <Link className='navbar-brand' to="/">
                                        <img alt="logo" src={logo} />
                                    </Link>
                                </div>
                                <div className='col-6 d-flex align-items-center justify-content-end Login-Register'>
                                    {
                                        userInfo ? (
                                            <div className='btn-group'>
                                                <button
                                                    type='button'
                                                    className='name-button dropdown-toggle'
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <i class="fas fa-user"></i>
                                                </button>
                                                <div className='dropdown-menu'>
                                                    <Link className='dropdown-item' to="/profile" >
                                                        პროფილი
                                                    </Link>
                                                    <Link className='dropdown-item' to="#" onClick={logoutHandler}>
                                                        გასვლა
                                                    </Link>
                                                </div>
                                            </div>

                                        ) : (
                                            <div className='btn-group'>
                                                <button
                                                    type='button'
                                                    className='name-button dropdown-toggle'
                                                    data-toggle="dropdown"
                                                    aria-haspopup="true"
                                                    aria-expanded="false"
                                                >
                                                    <i class="fas fa-user"></i>
                                                </button>
                                                <div className='dropdown-menu'>
                                                    <Link className='dropdown-item' to="/login">
                                                        შესვლა
                                                    </Link>
                                                    <Link className='dropdown-item' to="/register">
                                                        რეგისტრაცია
                                                    </Link>
                                                </div>
                                            </div>

                                        )
                                    }

                                    <Link to="/cart" className='cart-mobile-icon'>
                                        <i className='fas fa-shopping-bag'></i>
                                        <span className='badge'>{cartItems.length}</span>
                                    </Link>
                                </div>
                                <div className='col-12 d-flex align-items-center'>
                                    <form onSubmit={submitHandler} className='input-group'>
                                        <input
                                            type="search"
                                            className="form-control rounded search"
                                            placeholder="მოძებნეთ სასურველი პროდუქტი..."
                                            onChange={(e) => setKeyword(e.target.value)}
                                        />
                                        <button type='submit' className='search-button'>
                                            ძიება
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='pc-header'>
                        <div className='row'>
                            <div className='col-md-3 col-4 d-flex align-items-center'>
                                <Link className='navbar-brand' to="/">
                                    <img alt="logo" src={logo} />
                                </Link>
                            </div>
                            <div className='col-md-6 col-8 d-flex align-items-center'>
                                <form onSubmit={submitHandler} className='input-group'>
                                    <input
                                        type="search"
                                        className="form-control rounded search"
                                        placeholder="მოძებნეთ სასურველი პროდუქტი..."
                                        onChange={(e) => setKeyword(e.target.value)}
                                    />
                                    <button type="submit" className='search-button'>
                                        ძიება
                                    </button>
                                </form>
                            </div>
                            <div className='col-md-3  d-flex align-items-center justify-content-end Login-Register'>

                                {
                                    userInfo ? (
                                        <div className='btn-group'>
                                            <button
                                                type='button'
                                                className='name-button dropdown-toggle'
                                                data-toggle="dropdown"
                                                aria-haspopup="true"
                                                aria-expanded="false"
                                            >
                                                გამარჯობა,{userInfo.name}
                                                <i class="fas fa-user"></i>
                                            </button>
                                            <div className='dropdown-menu '>
                                                <Link className='dropdown-item' to="/profile">
                                                    პროფილი
                                                </Link>
                                                <Link className='dropdown-item' to="#"
                                                    onClick={logoutHandler}
                                                >
                                                    გასვლა
                                                </Link>
                                            </div>
                                        </div>

                                    ) : (
                                        <>
                                            <Link to="/register">
                                                რეგისტრაცია
                                            </Link>
                                            <Link to="/login">
                                                შესვლა
                                            </Link>

                                        </>

                                    )
                                }

                                <Link to="/cart" className='cart-mobile-icon'>
                                    <i className='fas fa-shopping-bag'></i>
                                    <span className='bagde'>{cartItems.length}</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header