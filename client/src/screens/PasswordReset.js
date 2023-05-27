import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Header from '../components/Header';
import URL from '../redux/actions/Url';
import "./mix.css"
const PasswordReset = () => {

    const [email, setEmail] = useState("");

    const [message, setMessage] = useState("");

    const sendLink = async (e) => {
        e.preventDefault();

        if (email === "") {
            toast.error("მაილი სავალდებულოა", {
                position: "top-center"
            });
        } else if (!email.includes("@")) {
            toast.warning("includes @ in your email!", {
                position: "top-center"
            });
        } else {
            const res = await fetch(`${URL}/api/users/sendpasswordlink`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const data = await res.json();

            if (data.status === 201) {
                setEmail("");
                setMessage(true)
            } else {
                toast.error("მომხმარებელი ვერ მოიძებნა", {
                    position: "top-center"
                })
            }
        }
    }

    return (
        <>
            <Header />
            <section>
                <div className="form_data">
                    <div className="form_heading">
                        <h1>შეიყვანეთ მაილი</h1>
                    </div>

                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>ლინკი წარმატებით გაიგზავნა შეამოწმეთ გიმაილი</p> : ""}
                    <form>
                        <div className="form_input">
                            <label htmlFor="email">მაილი</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" placeholder='შეიყვანეთ მაილის მისამართი...' />
                        </div>

                        <button className='btn' onClick={sendLink}>გაგზავნა</button>
                    </form>
                    <ToastContainer />
                </div>
            </section>
        </>
    )
}

export default PasswordReset