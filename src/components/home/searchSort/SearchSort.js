import { Box, IconButton, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import "./SearchSort.css";


function SearchSort({ setSortData, setSearchData, setPageNumber }) {
    const [searchInput, setSearchInput] = useState("");
    const [sortInput, setSortInput] = useState("");
    //console.log(searchInput)

    //----------------------------------------------------------------
    const handelSearchFun = () => {
        setPageNumber(1);
        setSearchData(searchInput);
    }

    //------------------------------------------------------------------------
    useEffect(() => {
        const fetchFun = async () => {
            let sData = sortInput.split(" ").join("+");
            setPageNumber(1);
            setSortData(sData);

        }
        fetchFun();
    }, [sortInput])

    return (<div className="SearchSort_box">
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
    </div>)
};

export default SearchSort;