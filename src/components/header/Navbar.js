
import { Box, IconButton, Typography } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import "./Navbar.css"

import Menu from "./menuModel/Menu";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";




function Navbar() {
    const [username, setUserName] = useState("");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();



 

    return (<div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <header >
            <nav>
                <div className="left">
                    <IconButton sx={{marginLeft:"5%"}} >
                        <Avatar src="https://avatars.dicebear.com/api/human/5050.svg" />
                    </IconButton>
                    <Box className="logo_text" >{username}</Box>
                </div>

                <div className="right">
                    <Menu setUserName={setUserName} />
                </div>
            </nav>



        </header>
    </div>)
}

export default Navbar;