import "./Menu.css";

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, TextField } from '@mui/material';
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";


export default function Menu({setUserName}) {
    const [open, setOpen] = useState(false);
    const [showLoginButton, setShowLoginButton] = useState(true);
    const navigate=useNavigate();
    const token=localStorage.getItem('token');



    //handel model close or open
    //-------------------------------------------------------------------------
    const menuOpen = () => {
        setOpen(true);
    };
    const menuClose = () => {
        setOpen(false);
    };

    //check user login or not 
    //-------------------------------------------------------------------------
    useEffect(()=>{
        const fetchFun =async()=>{
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
                setUserName(data.name);
                setShowLoginButton(false);
            }
        }
        fetchFun();
    }, []);


    //logout function
    //----------------------------------------------------------------
    const handelLogOut=()=>{
        localStorage.removeItem("token");
        setShowLoginButton(true);
        navigate("/signIn");
        menuClose();
    }


    return (
        <div>
            <IconButton
                size="large"
                edge="start"
                color="black"
                aria-label="open drawer"
                sx={{ mr: 2 }}
                onClick={menuOpen}
            >
                <MenuIcon style={{ fontSize: 50 }} />
            </IconButton>

            <Modal
                open={open}
                onClose={menuClose}
            >
                <Box className='menu-modal' >
                    <Link to="/" style={{ textDecoration: 'none', color:  "black" }} onClick={menuClose}>
                        <div>Home</div>
                    </Link>
                        {showLoginButton ? <Link to="/signIn" onClick={menuClose}  style={{ textDecoration: 'none', color:  "black" }}> <div>SignIn</div> </Link> : <div style={{cursor:"pointer"}} onClick={handelLogOut}>Log Out</div>}
                    
                    <Link to="/customerAdd" style={{ textDecoration: 'none', color:  "black" }} onClick={menuClose} >
                        <div>Add New Customer Information</div>
                    </Link>
                   
                </Box>
            </Modal>
        </div >
    );
}
