import { useEffect, useState } from "react";
import "./CustomerDetails.css";
import { useNavigate, useParams } from "react-router-dom";
import Lodar from "../lodar/Lodar";
import { Box } from "@mui/material";

function CustomerDetails() {
    const [eachCustomer, setEachcustomer] = useState({});
    const [isLodar, setIsLodar] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const { id } = useParams();


    //fetch the customer details
    //-------------------------------------------------------------------------
    useEffect(() => {
        const fetchFun = async () => {
            setIsLodar(true);
            const response = await fetch(`https://crm-api-pzus.onrender.com/customer-deltas/${id}`, {
                method: "GET",
                headers: {
                    "Authorization": token,
                },
            });
            if (response.status !== 200) {
                navigate("/signIn");
            } else {
                const data = await response.json();
                setEachcustomer(data);
            }
            setIsLodar(false);
        }
        fetchFun();
    }, []);

//loder show
    if (isLodar) {
        return (
            <Lodar />
        )
    }

    return (<div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <div className="customer_ditails customers_list_table">
            <Box style={{fontSize:"20px", color:" #FB8628"}}>Customer Details</Box>
            <table>
                <tr className="customer_table_heder">
                    <th >Property</th>
                    <th >Value</th>
                </tr>
                <tr>
                    <td>Name</td>
                    <td>{eachCustomer.name}</td>
                </tr>
                <tr>
                    <td>Emaile</td>
                    <td>{eachCustomer.email}</td>
                </tr>
                <tr>
                    <td>Number</td>
                    <td>{eachCustomer.number}</td>
                </tr>
                <tr>
                    <td>Country</td>
                    <td>{eachCustomer.country}</td>
                </tr>
                <tr>
                    <td>state</td>
                    <td>{eachCustomer.state}</td>
                </tr>
                <tr>
                    <td>City</td>
                    <td>{eachCustomer.city}</td>
                </tr>
                <tr>
                    <td>Pin Code</td>
                    <td>{eachCustomer.pinCode}</td>
                </tr>
                {eachCustomer.information ? (<tr>
                    <td>Information</td>
                    <td>{eachCustomer.information}</td>
                </tr>): ""}
            </table>
        </div>
    </div>);
}

export default CustomerDetails;