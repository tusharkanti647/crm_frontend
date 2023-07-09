
import "./SignIn.css"

// import * as React from 'react';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Lodar from "../lodar/Lodar";




export default function SignIn() {
    const [isLodar, setIsLodar] = useState(false);
    const navigate=useNavigate();
    const [signInData, setSignInData] = useState({
        password: "",
        email: ""
    });



    //handel control input
    //-------------------------------------------------------------------------
    const handelInput = (event) => {
        const { name, value } = event.target;
        setSignInData({ ...signInData, [name]: value });
    }


    //signIn data send to the server
    //-------------------------------------------------------------------------
    const signinUser = async (event) => {
        event.preventDefault();
        setIsLodar(true);
        const { email, password } = signInData;


        const respons = await fetch("https://crm-api-pzus.onrender.com/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: 'same-origin',
            body: JSON.stringify({ email, password })
        });
        

        const data = await respons.json();
        if (respons.status === 400 || !signInData ) {
            alert("no data match ");
        } else if (respons.status !== 200 ) {
            alert("no data match that you are provided ");
        }else {
            alert("user sucessfull signin");
            localStorage.setItem("token", data.token);
            navigate("/");
            window.location.reload();
            

            setSignInData({
                ...signInData,
                email: "",
                password: ""
            });
        }
        setIsLodar(false);

    }


    if (isLodar) {
        return (
            <Lodar />
        )
    }

    return (
        <div className='login-modal'>

            <Box
                component="form"
                method="POST"
                onSubmit={signinUser}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="off"
            >

                <div className='login-modal'>
                    <h2>SignIn</h2>
                    <TextField
                        error={false}
                        required
                        name="email"
                        id="outlined-required-email-data"
                        label="Email"
                        value={signInData.email}
                        onChange={handelInput}
                    />

                    <TextField
                        error={false}
                        required
                        name="password"
                        type="password"
                        id="outlined-required-password-data"
                        label="Password"
                        value={signInData.password}
                        onChange={handelInput}
                    />

                    <button className="modal-signin-button">CONTINUE</button>

                    <h4 >if you are new create a new account</h4>
                    <Link to="/signup">
                        <button className="modal-signin-button">Create Account</button>
                    </Link>
                    <p className="privacy">By continuing, I accept <a>Terms and Conditions</a> and <a>Privacy Policy.</a></p>
                </div>
            </Box>

        </div>
    );
}