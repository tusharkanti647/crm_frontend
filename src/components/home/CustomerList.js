import { Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Avatar from '@mui/material/Avatar';

import "./CustomerList.css";
import Lodar from "../lodar/Lodar";
import { useState } from "react";
import Tostyfy from "../tostyfy/Tostyfy";
import { Link } from "react-router-dom";

function CustomerList({ setRefreshPage, refreshpage, customersData }) {
    const token = localStorage.getItem('token');
    const [isLodar, setIsLodar] = useState(false);
    const [isShowTostyfy, setShowTostyfy] = useState(false);
    const [satingTostyfy, setSatingTostyfy] = useState({
        message: "",
        severity: ""
    });



    //delete customer
    //-----------------------------------------------------------------------------------------
    const remove1Product = async (id) => {
        setIsLodar(true);
        const response = await fetch(`https://crm-api-pzus.onrender.com/customer-delete/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": token
            },
        });
        if (response.status !== 200) {
            setIsLodar(false);
            setSatingTostyfy({ ...satingTostyfy, message: "Please login first.", severity: "info" });
            setShowTostyfy(true);
            return;
        } else {
            setRefreshPage(!refreshpage);
            setIsLodar(false);
            setSatingTostyfy({ ...satingTostyfy, message: "Customer Delete successfully.", severity: "warning" });
            setShowTostyfy(true);
        }
    }

    //loder show
    if (isLodar) {
        return (
            <Lodar />
        )
    }

    return (<div className="customers_list_table">
        {isShowTostyfy ? <Tostyfy satingTostyfy={satingTostyfy} /> : ""}
        <table className="customer_list_Box">
            <tr className="customer_table_heder">
                <th className="customer_img">Photo</th>
                <th className="customer_name">Name</th>
                <th className="customer_email">Email</th>
                <th className="customer_action">Action</th>
            </tr>

            {customersData.map((customer, ind) => {
                return (<tr key={ind} className="customer_table_row">

                    <td className="customer_img"><Link to={"/customerDetails/" + customer._id} >
                        <IconButton >
                            <Avatar src={"https://avatars.dicebear.com/api/human/500" + ind + ".svg"} />
                        </IconButton>
                    </Link></td>
                    <td className="customer_name"><Link to={"/customerDetails/" + customer._id} style={{ textDecoration: 'none', color: "black" }}>{customer.name}</Link></td>
                    <td className="customer_email"><Link to={"/customerDetails/" + customer._id} style={{ textDecoration: 'none', color: "black" }}>{customer.email}</Link></td>

                    <td className="customer_action">
                        <IconButton>
                            <DeleteIcon onClick={(e) => remove1Product(customer._id)} />
                        </IconButton>
                        <Link to={'/customerEdit/' + customer._id}>
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Link>
                    </td>
                </tr>)
            })}
        </table>
    </div>)
}

export default CustomerList;