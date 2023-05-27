import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Header from "./../components/Header"
import URL from '../redux/actions/Url';

const ForgotPassword = () => {

    const { id, token } = useParams();
    const history = useNavigate();

    const [data2, setData] = useState(false);


    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");



    const setval = (e) => {
        setPassword(e.target.value)
    }


    const sendPassword = async (e) => {
        e.preventDefault();

        if (password === "") {
            toast.error("პაროლი სავალდებულოა", {
                position: "top-center"
            });
        } else if (password.length < 6) {
            toast.error("პაროლი უნდა იყოს 5 ასოზე მეტი", {
                position: "top-center"
            });
        } else {
            const res = await fetch(`${URL}/api/users/${id}/${token}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ password })
            });
            const data = await res.json()

            if (data.status === 201) {
                setPassword("")
                setMessage(true)
            } else {
                toast.error("ლინკს მოქმედების ვადა გაუვიდა ცადეთ თავიდან", {
                    position: "top-center"
                })
            }

        }
    }
    useEffect(() => {
        const userValid = async () => {
            const res = await fetch(`${URL}/api/users/forgotpassword/${id}/${token}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json()

            if (data.status === 201) {

            } else {
                history("*")
            }
        }
        setData(true)
        userValid()
    }, [history, id, token])



    return (
        <>
            <Header />
            {
                data2 ? (
                    <>
                        <section>
                            <div className="form_data">
                                <div className="form_heading">
                                    <h1>შეიყვანეთ ახალი პაროლი</h1>
                                </div>

                                <form>
                                    {message ? <p style={{ color: "green", fontWeight: "bold" }}>პაროლი წარმატებით განახლდა </p> : ""}
                                    <div className="form_input">
                                        <label placeholder="პაროლი">ახალი პაროლი</label>
                                        <input type="password" value={password} onChange={setval} name="password" id="password" placeholder='ჩაწერეთ ახალი პაროლი...' />
                                    </div>

                                    <button className='btn' onClick={sendPassword}>განახლება</button>
                                </form>
                                <p><NavLink to="/">სახლი</NavLink></p>
                                <ToastContainer />
                            </div>
                        </section>
                    </>
                ) : <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "100vh" }}>
                    Loading... &nbsp;
                    <CircularProgress />
                </Box>
            }
        </>
    )
}

export default ForgotPassword