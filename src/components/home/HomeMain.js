import { useEffect, useState } from "react";
import CustomerList from "./CustomerList";
import { useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import Lodar from "../lodar/Lodar";

//=-------------------------------------------------------------------------------------

import { IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
// import { useEffect, useState } from "react";
import "./searchSort/SearchSort.css";


//=------------------------------------------------------------------------------------


function HomeMain() {
    const [customersData, setCustomersData] = useState([]);
    const [nextPage, setNextPage] = useState(false);
    const [searchData, setSearchData] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const [sortInput, setSortInput] = useState("");
    const [isLodar, setIsLodar] = useState(false);
    const [refreshpage, setRefreshPage] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    //handel next and previous button page number
    //------------------------------------------------------------------------------------------------
    const increse = () => setPageNumber(pageNumber + 1)
    const decrese = () => setPageNumber(pageNumber - 1)

    //fetch the customer list
    //-------------------------------------------------------------------------
    useEffect(() => {
        const fetchFun = async () => {
            setIsLodar(true);
            let url = "https://crm-api-pzus.onrender.com/customer-get?page=" + pageNumber;
            if (sortInput) {
                let sData = sortInput.split(" ").join("+");
                url = url + "&sortQue=" + sData;
                url = searchData ? url + "&searchName=" + searchData : url;
            } else {
                url = searchData ? url + "&searchName=" + searchData : url;
            }
           
            //fetch method
            const response = await fetch(url, {
                method: "GET",
                headers: {
                    "Authorization": token,
                },
            });
            if (response.status !== 200) {
                navigate("/signIn");
            } else {
                const data = await response.json();
                setCustomersData(data.data);
                setNextPage(data.isNextPagePresent);
            }
            setIsLodar(false);
        }
        fetchFun();
    }, [refreshpage, sortInput, searchData, pageNumber]);


    //handel search function
    //----------------------------------------------------------------
    const handelSearchFun = () => {
        setPageNumber(1);
        setSearchData(searchInput);
    }


    //show the lodar
    //--------------------------------------------------------------------------------------
    if (isLodar) {
        return (
            <Lodar />
        )
    }

    return (<div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>

        {/* search and sort from  */}
        {/* ------------------------------------------------------------------------------------------------------------------------------------------ */}
        <div className="SearchSort_box">
            <Box className="search" style={{ display: "flex", marginTop: "30px" }}>
                <h3>Search</h3>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1, width: '25ch' },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <TextField
                        error={false}
                        required
                        name="searchInput"
                        id="outlined-required-searchInput"
                        label="Enter Customer Name"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />


                </Box>
                <IconButton>
                    <SearchIcon onClick={handelSearchFun} />
                </IconButton>

            </Box>

            <Box className="sortable" style={{ display: "flex", marginTop: "30px" }}>
                <h2>Sort The Customer By</h2>
                <FormControl sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="demo-simple-select-helper-label">Sort</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        id="demo-simple-select-helper"
                        value={sortInput}
                        label="Age"
                        onChange={(e) => setSortInput(e.target.value)}
                    >

                        <MenuItem value={""}>None</MenuItem>
                        <MenuItem value={"name 1"}>Name</MenuItem>
                        <MenuItem value={"lastActivity -1"}>LastActivity</MenuItem>
                    </Select>
                </FormControl>
            </Box>
        </div>

        {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------ */}
        {customersData.length > 0 ? <CustomerList refreshpage={refreshpage} setRefreshPage={setRefreshPage} customersData={customersData} setCustomersData={setCustomersData} /> : ""}

        <Box sx={{ display: "flex", width: "90%", justifyContent: "space-around", marginBottom: "30px" }}>
            {pageNumber > 1 ? <Button onClick={() => decrese()} variant="contained" color="warning">Previous</Button> : ""}
            {nextPage ? <Button onClick={() => increse()} variant="contained" color="warning">Next</Button> : ""}
        </Box>
    </div>)
}

export default HomeMain;