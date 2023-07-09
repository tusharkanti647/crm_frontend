import { useEffect, useState } from "react";
import CustomerList from "./CustomerList";
import { useNavigate } from "react-router-dom";
import SearchSort from "./searchSort/SearchSort";
import { Box, Button } from "@mui/material";
import Lodar from "../lodar/Lodar";



function HomeMain() {
    const [customersData, setCustomersData] = useState([]);
    const [nextPage, setNextPage] = useState(false);
    const [sortData, setSortData] = useState("");
    const [searchData, setSearchData] = useState("");
    const [pageNumber, setPageNumber] = useState(1);
    const [isLodar, setIsLodar] = useState(false);
    const [refreshpage, setRefreshPage] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const increse =()=> setPageNumber(pageNumber + 1)
    const decrese = ()=> setPageNumber(pageNumber - 1)
    //console.log(pageNumber)

    //fetch the customer list
    //-------------------------------------------------------------------------
    useEffect(() => {
        const fetchFun = async () => {
            setIsLodar(true);
            let url = "https://crm-api-pzus.onrender.com/customer-get?page=" + pageNumber;
            if (sortData) {
                url = url + "&sortQue=" + sortData;
                url = searchData ? url + "&searchName=" + searchData : url;
            } else {
                url = searchData ? url + "&searchName=" + searchData : url;
            }
            //console.log(url);
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
    }, [refreshpage, sortData, searchData, pageNumber]);


    if (isLodar) {
        return (
            <Lodar />
        )
    }


    //-----------------------------------------------------------------------------------------------------------
    return (<div style={{ display: "flex", alignItems: "center", flexDirection: "column" }}>
        <SearchSort setSortData={setSortData} setSearchData={setSearchData} setPageNumber={setPageNumber} />
        {customersData.length > 0 ? <CustomerList refreshpage={refreshpage} setRefreshPage={setRefreshPage} customersData={customersData} setCustomersData={setCustomersData} /> : ""}

        <Box sx={{ display: "flex", width:"90%", justifyContent:"space-around", marginBottom:"30px" }}>
            {pageNumber > 1 ? <Button onClick={()=> decrese()} variant="contained" color="warning">Previous</Button> : ""}
            {nextPage ? <Button onClick={() => increse()} variant="contained" color="warning">Next</Button> : ""}
        </Box>
    </div>)
}

export default HomeMain;