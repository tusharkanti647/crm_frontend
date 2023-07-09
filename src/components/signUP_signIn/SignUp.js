
import { useState } from "react";

import { Box, TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import Lodar from "../lodar/Lodar";
import { mailValidation, numberValidation, passwordValidation } from "../operation/operation";






function SignUp() {
    const [isLodar, setIsLodar] = useState(false);
    const [signUpData, setSignUpData] = useState({
        name: "",
        number: "",
        email: "",
        password: "",
        conPassword: ""
    });
    const navigate = useNavigate();



    //handel control input
    //-------------------------------------------------------------------------
    const handelInput = (event) => {
        const { name, value } = event.target;
        setSignUpData({ ...signUpData, [name]: value });
    }


    //signup data send to the server
    //-------------------------------------------------------------------------
    const signupUser = async (event) => {
        event.preventDefault();
        try {
            setIsLodar(true);
            const { name, number, email, password, conPassword } = signUpData;
        //check all filled is filledup or not
        if (!name || !number || !email || !password || !conPassword) {
            alert("please filled the all input box");
            setIsLodar(false);
            return;
        }
        if (!passwordValidation(password)) {
            alert("password between 8 to 15 characters. password contain at least one lowercase letter, uppercase letter, numeric digit, and special character");
            setIsLodar(false);
            return;
        }
        if (password !==conPassword) {
            alert("password and conform password do not match");
            setIsLodar(false);
            return;
        }

        if (!mailValidation(email)) {
            alert("email is invalid");
            setIsLodar(false);
            return;
        }
        if (!numberValidation(number)) {
            alert("phone number is invalid");
            setIsLodar(false);
            return;
        }

            //console.log("hello");
            const respons = await fetch("https://crm-api-pzus.onrender.com/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, number, email, password, conPassword })
            });

            const data = await respons.json();
            if (respons.status === 422 || !signUpData) {
                alert("no data matching");
            }else if (respons.status !== 200 ) {
                alert("no data matching");
            }else {
                alert("user successfully signup");

                //console.log(data);
                localStorage.setItem("token", data.token);
                navigate("/");
                window.location.reload();
                //navigate to the home page
                navigate("/");
                window.location.reload();

                setSignUpData({
                    ...signUpData, name: "",
                    number: "",
                    email: "",
                    password: "",
                    conPassword: ""
                });
                setIsLodar(false);
            }
        } catch (e) {
            setIsLodar(false);
            console.log(e);
        }
    }


    if (isLodar) {
        return (
            <Lodar />
        )
    }

    return (<div className='login-modal'>
        <Box
            component="form"
            method="POST"
            onSubmit={signupUser}
            sx={{
                '& .MuiTextField-root': { m: 1, width: '50ch' },
            }}
            noValidate
            autoComplete="on"
        >
            <div className='login-modal'>
                <h2>SignUp</h2>

                <TextField
                    error={false}
                    required
                    name="name"
                    id="outlined-required-name"
                    label="Name"
                    value={signUpData.name}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="number"
                    type="number"
                    id="outlined-required-number"
                    label="Number"
                    value={signUpData.number}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="email"
                    id="outlined-required-email"
                    label="Email"
                    value={signUpData.email}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="password"
                    type="password"
                    id="outlined-required-password"
                    label="Password"
                    value={signUpData.password}
                    onChange={handelInput}
                />
                <TextField
                    error={false}
                    required
                    name="conPassword"
                    type="password"
                    id="outlined-required-conPassword"
                    label="Confrom Password"
                    value={signUpData.conPassword}
                    onChange={handelInput}
                />

                <button className="modal-signin-button">CONTINUE</button>

                <h4>if you have a account go to signIn</h4>


                <p className="privacy">By continuing, I accept <a>Terms and Conditions</a> and <a>Privacy Policy.</a></p>
            </div>

        </Box>

        <Link to="/signIn">
            <button className="modal-signin-button">SignIn </button>
        </Link>
    </div>)
}

export default SignUp;