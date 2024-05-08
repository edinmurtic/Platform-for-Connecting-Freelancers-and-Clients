import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./Search.css";
import newRequest from "../../utils/newRequest";

const Search = () => {



  const [search, setSearch]= useState("");
  const [searchData,setSearchData]= useState([])
  const [selectedItem,setSelectedItem] = useState(-1)
  const handleChange = e =>
    {
      setSearch(e.target.value)
    }
  const handleClose = () =>
    {
      setSearch("");
      setSearchData([]);
      setSelectedItem(-1);
    }
  const handleKeyDown = e =>
  {
    if(selectedItem < searchData.length)
      {
          if(e.key === "ArrowUp" && selectedItem > 0)
      {
        setSelectedItem(prev => prev-1)
      }
    else if (e.key === "ArrowDown" && selectedItem < searchData.length -1)
        {
          setSelectedItem(prev => prev + 1)

        }
    else if (e.key === "Enter" && selectedItem >= 0)
      {
        console.log(searchData[selectedItem]._id)
        // window.open(searchData[selectedItem]._id)
      }
      }
      else{
        setSelectedItem(-1)
      }
  
  }
    useEffect(()=> {
      const fetchSearch = async () => {
        if(search !== ""){
          try {
            const response = await newRequest.get(`/services?search=${search}&isActive=true`);
            setSearchData(response.data)
            console.log(response.data)
          } catch (error) {
            console.error('Error fetching total users:', error);
          }
        }
       
      };
    
      fetchSearch();
    }
  ,[search])
    return (
      <section className='search_section'>
      
 
          <div className='search_input_div'>
              <input
              id="searchInputnew"
                  type='text'
                  className='search_input'
                  placeholder='Search...'
                  autoComplete='off'
                  onChange={handleChange}
                  value={search}
                  onKeyDown={handleKeyDown}
              />
              <div className='search_icon'>
                  {search === "" ? <SearchIcon /> : <CloseIcon onClick={handleClose} />}
                  
              </div>
          </div>
          <div className='search_result'>
          {
            searchData.map((data,index)=>
            {
              return  <a href={data._id} key={index} target='_blank' 
              className={selectedItem === index ? 'search_suggestion_line active' :'search_suggestion_line'}>
              {data.shortTitle}
                </a>
            })
           
          }
              
          </div>
      </section>
    );
};

export default Search;
