import { Box, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mailValidation, numberValidation, pinCodeValidation } from "../operation/operation";
import Lodar from "../lodar/Lodar";


function CustomerEditPage() {
    const [editCustomerData, setEditCustomerData] = useState({});
    const [isLodar, setIsLodar] = useState(false);
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const { id } = useParams();

    //fetch customer detals
    //-------------------------------------------------------------------------
    useEffect(() => {
        const fetchFun = async () => {

            try {
                setIsLodar(true);
                const response = await fetch(`https://crm-api-pzus.onrender.com/customer-deltas/${id}`, {
                    method: "GET",
                    headers: { "Authorization": token },
                });
                if (response.status !== 200) {
                    navigate("/signIn");
                } else {
                    const data = await response.json();
                    setEditCustomerData({ ...data });
                }
                setIsLodar(false);
            } catch (error) {
                setIsLodar(false)
                console.log(error);
            }
        }

        fetchFun();
    }, [])

    //handel control input
    //-------------------------------------------------------------------------
    const handelInput = (event) => {
        const { name, value } = event.target;
        setEditCustomerData({ ...editCustomerData, [name]: value });
    }

    //customer data send to the server
    //-------------------------------------------------------------------------
    const handelSubmit = async (event) => {
        event.preventDefault();
        try {
            setIsLodar(true);
            const { name, number, email, country, state, city, pinCode, information } = editCustomerData;

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

            const response = await fetch(`https://crm-api-pzus.onrender.com/customer-edit/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },
                body: JSON.stringify({ name, number, email, country, state, city, pinCode, information })
            });
            if (response.status !== 200) {
                setIsLodar(false);
                navigate("/signIn");
            } else {
                const data = await response.json();
                if (response.status === 422 || !editCustomerData) {
                    alert("no data");
                } else {
                    alert("successfully edit the customer Details");

                    //navigate to the home page
                    navigate("/");

                    setEditCustomerData({
                        ...editCustomerData,
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

    //--------------------------------------------------------------------------
    if (isLodar) {
        return (
            <Lodar />
        )
    }

    return (<>
        {editCustomerData.name ? (
            <Box
                component="form"
                method="POST"
                onSubmit={handelSubmit}
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '50ch' },
                    display: 'flex',
                    justifyContent: "center"
                }}
                noValidate
                autoComplete="on"
            >
                <div style={{ display: "flex", flexDirection: "column", }} >
                    <h2 style={{marginTop:"30px", marginBottom:"30px", color:"#FB8628"}}>Edit Customer Information</h2>

                    <TextField
                        error={false}
                        required
                        name="name"
                        id="outlined-required-name"
                        label="Customer Name"
                        value={editCustomerData.name}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="number"
                        type="number"
                        id="outlined-required-number"
                        label="Phone Number"
                        value={editCustomerData.number}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="email"
                        id="outlined-required-email"
                        label="Email"
                        type="email"
                        value={editCustomerData.email}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="country"
                        id="outlined-required-country"
                        label="Country"
                        value={editCustomerData.country}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="state"
                        id="outlined-required-state"
                        label="State"
                        value={editCustomerData.state}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="city"
                        id="outlined-required-city"
                        label="City"
                        value={editCustomerData.city}
                        onChange={handelInput}
                    />

                    <TextField
                        error={false}
                        required
                        name="pinCode"
                        type="number"
                        id="outlined-required-pinCode"
                        label="PIN Code"
                        value={editCustomerData.pinCode}
                        onChange={handelInput}
                    />
                    <TextField
                        error={false}
                        required
                        name="information"
                        id="outlined-required-information"
                        label="Information"
                        value={editCustomerData.information}
                        onChange={handelInput}
                    />

                    <Button color="warning" style={{marginTop:"30px", marginBottom:"30px"}} onClick={handelSubmit} variant="contained">SUBMIT</Button>
                </div>

            </Box>) : <></>}
    </>);
};

export default CustomerEditPage;
