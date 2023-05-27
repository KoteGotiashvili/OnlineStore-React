import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Message from '../loadingError/Error'
import Loading from '../loadingError/Loading'
import Toast from "./../loadingError/Toast"
import { updateUserProfile } from "../../redux/actions/UserActions"
const ProfileTabs = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const toastId = React.useRef(null)
    const ToastObjects = {
        pauseOnFocusLoss: false,
        draggable: false,
        pauseOnHover: false,
        autoClose: 2000,
    }
    const dispatch = useDispatch()

    const userDetails = useSelector((state) => state.userDetails)

    const { loading, error, user } = userDetails

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { loading: updateLoading } = userUpdateProfile
    useEffect(() => {

        if (user) {
            setName(user.name)
            setName(user.email)
        }

    }, [dispatch, user])

    const submitHandler = (e) => {
        e.preventDefault()
        //password match
        if (password !== confirmPassword || password.length < 5 || confirmPassword.length < 5) {
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.error("პაროლი არ ემთხვევა ან ნაკლებია 5 სიმბოლოზე", ToastObjects)
            }

        } else {
            //Update
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
            if (!toast.isActive(toastId.current)) {
                toastId.current = toast.success("პროფილი განახლდა", ToastObjects)
            }

        }

    }
    return (
        <>
            <Toast />
            {error && <Message variant="alert-danger">{error}</Message>}
            {loading && <Loading />}
            {updateLoading && <Loading />}

            <form className='row form-container' onSubmit={submitHandler}>
                <div className='col-md-6'>
                    <div className='form'>
                        <label for="account-fn">სახელი</label>
                        <input className='form-control' type="text"
                            value={name || ""}
                            onChange={(e) => setName(e.target.value)}
                        />

                    </div>

                </div>
                <div className='col-md-6'>
                    <div className='form'>
                        <label for="account-email">მაილი</label>
                        <input className='form-control' type="email"
                            value={email || ""}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                    </div>

                </div>
                <div className='col-md-6'>
                    <div className='form'>
                        <label for="account-pass">ახალი პაროლი</label>
                        <input className='form-control' type="password"
                            value={password || ""}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                </div>
                <div className='col-md-6'>
                    <div className='form'>
                        <label for="account-confirm-pass">პაროლის დადასტურება</label>
                        <input className='form-control' type="password"
                            value={confirmPassword || ""}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />

                    </div>

                </div>
                <button type='submit'>პროფილის განახლება</button>

            </form>
        </>
    )
}

export default ProfileTabs