import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lodar from "../lodar/Lodar";
import { mailValidation, numberValidation, pinCodeValidation } from "../operation/operation";


function CustomerAddPage() {
    const [isLodar, setIsLodar] = useState(false);
    const [customerData, setCustomerData] = useState({
        name: "",
        number: "",
        email: "",
        country: "",
        state: "",
        city: "",
        pinCode: "",
        information: ""
    });
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    //handel control input
    //-------------------------------------------------------------------------
    const handelInput = (event) => {
        const { name, value } = event.target;
        setCustomerData({ ...customerData, [name]: value });
    }

     //check user login or not 
    //-------------------------------------------------------------------------
    useEffect(()=>{
        const fetchFun =async()=>{
            setIsLodar(true);
            const response = await fetch("https://crm-api-pzus.onrender.com/userIs-signIn",{
                method: "GET",
                headers:{
                    "Authorization": token,
                },
            });
            if(response.status !== 200){
                navigate("/signIn");
            }else{
                const data = await response.json();
            }
            setIsLodar(false);
        }
        fetchFun();
    }, []);

    //customer data send to the server
    //-------------------------------------------------------------------------
    const handelSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLodar(true);
            const { name, number, email, country, state, city, pinCode, information } = customerData;

            //check all filled is filledup or not
            if (!name || !number || !email || !country || !state || !city || !pinCode) {
                alert("please filled the all input box");
                setIsLodar(false);
                return;
            }
            //for email validation check
            if (!mailValidation(email)) {
                alert("email is invalid");
                setIsLodar(false);
                return;
            }
            //for number validation check
            if (!numberValidation(number)) {
                alert("phone number is invalid");
                setIsLodar(false);
                return;
            }
            //for pin validation check
            if (!pinCodeValidation(pinCode)) {
                alert("PIN number is invalid");
                setIsLodar(false);
                return;
            }

            //fetch funtion
            const response = await fetch("https://crm-api-pzus.onrender.com/customer-add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({ name, number, email, country, state, city, pinCode, information })
            });
            if (response.status !== 200) {
                navigate("/signIn");
            } else {
                const data = await response.json();
                if (response.status === 422 || !customerData) {
                    alert("no data");
                } else {
                    alert("successfully add the new Customer Details");
                    navigate("/");
                    setCustomerData({
                        ...customerData,
                        name: "",
                        number: "",
                        email: "",
                        country: "",
                        state: "",
                        city: "",
                        pinCode: "",
                        information: ""
                    });
                }
            }
            setIsLodar(false);
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
    //----------------------------------------------------------------
    return (<div style={{ display: "flex", justifyContent: "center" }} >

        <div style={{ width: "400px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <Box
                component="form"
                method="POST"
                onSubmit={handelSubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                }}
                noValidate
                autoComplete="on"
            >
                <div >
                    <div style={{ display: "flex", justifyContent: "center", marginTop:"30px", marginBottom:"30px", color:"#FB8628"}}>
                        <h2>Add new Customer Information</h2>
                    </div>
                    <TextField
                        error={false}
                        required
                        name="name"
                        id="outlined-required-name"
                        label="Customer Name"
                        value={customerData.name}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="number"
                        type="number"
                        id="outlined-required-number"
                        label="Phone Number"
                        value={customerData.number}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="email"
                        id="outlined-required-email"
                        label="Customer Email"
                        type="email"
                        value={customerData.email}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="country"
                        id="outlined-required-country"
                        label="Country"
                        value={customerData.country}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="state"
                        id="outlined-required-state"
                        label="State"
                        value={customerData.state}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="city"
                        id="outlined-required-city"
                        label="City"
                        value={customerData.city}
                        onChange={handelInput}
                    />

                    <TextField
                        error={false}
                        required
                        name="pinCode"
                        type="number"
                        id="outlined-required-pinCode"
                        label="PIN Code"
                        value={customerData.pinCode}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="information"
                        id="outlined-required-information"
                        label="Information"
                        value={customerData.information}
                        onChange={handelInput}
                    />


                    <div style={{ display: "flex", justifyContent: "center", marginTop:"30px", marginBottom:"30px",}}>
                        <Button onClick={handelSubmit} color="warning" variant="contained">SUBMIT</Button>
                    </div>
                </div>

            </Box>
        </div>
    </div>);
};

export default CustomerAddPage;
