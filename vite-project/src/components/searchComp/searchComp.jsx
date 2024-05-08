import React, { useEffect, useState } from 'react'
import './searchComp.css'
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from "@mui/icons-material/Close";
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

const SearchComp = () => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('Sve kategorije');
  const [inputPlaceholder, setInputPlaceholder] = useState('Pretraga za sve kategorije');
  const [search, setSearch]= useState("");
  const [searchData,setSearchData]= useState([])
  const [selectedItem,setSelectedItem] = useState(-1);
  const [category, setCategory] = useState("");

  const handleSearch = (e) => {
    e.preventDefault(); // Prevent form submission
    navigate(`/services?search=${search}`);
    window.location.reload(); // Refresh page

  }
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
  { console.log(e.key)
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
      else if (e.key === "Enter" && selectedItem == -1)
        {
         handleSearch();
        }
      }
      else{
        setSelectedItem(-1)
      }
  
  }
    useEffect(()=> {
      const fetchSearch = async () => {
        if(search.length>=3){
          try {
            const response = await newRequest.get(`/services?search=${search}&category=${category}&isActive=true`);
            setSearchData(response.data)
            console.log(response.data)
          } catch (error) {
            console.error('Error fetching total users:', error);
          }
        }
        else {
        setSearchData([]);
        }
      };
     
    
      fetchSearch();
    }
  ,[search,category])
  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (option) => {

    setSelectedOption(option);
    if (option === 'Sve kategorije') {
      setInputPlaceholder('Pretraži sve kategorije...');
      setCategory("")
    } else {
      setInputPlaceholder(`Pretraga u kategoriji ${option}...`);
      setCategory(option)

    }
    setIsOpen(false);
  }; 
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.dropdown2')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);


  return (
    <> <div className='search-bar2'>
    {/* Dropdown start */}
    <div className='dropdown2'>
      <div id='drop-text' className='dropdown2-text' onClick={handleDropdownClick}>
        <span id='span'>{selectedOption}</span>
        <ExpandMoreIcon />
      </div>
      <ul id='list' className={`dropdown2-list ${isOpen ? 'show' : ''}`}>
        <li className='dropdown2-list-item' onClick={() => handleItemClick('Sve kategorije')}>
          Sve kategorije
        </li>
        <li className='dropdown2-list-item' onClick={() => handleItemClick('Grafika i dizajn')}>
        Grafika i dizajn
        </li>
        <li className='dropdown2-list-item' onClick={() => handleItemClick('IT konsalting')}>
        IT konsalting
        </li>
        <li className='dropdown2-list-item' onClick={() => handleItemClick('Razvoj video igara')}>
        Razvoj video igara
        </li>
        <li className='dropdown2-list-item' onClick={() => handleItemClick('Video i animacija')}>
        Video i animacija
        </li>
      </ul>
    </div>

    <div className='search-box2'>
      <input type='text' id='search-input' placeholder={inputPlaceholder}
                  autoComplete='off'
                  onChange={handleChange}
                  value={search}
                  onKeyDown={handleKeyDown} />
      {search === "" ? <SearchIcon  /> : <CloseIcon onClick={handleClose} />}  </div>
  </div>
  <div className='search_result'>
          {
            searchData.map((data,index)=>
            {
              return  <a href={`/service/${data._id}`} key={index} target='_blank' 
              className={selectedItem === index ? 'search_suggestion_line active' :'search_suggestion_line'}>
              {data.shortTitle}
                </a>
            })
           
          }
              
          </div></>
   


    // <div className='search-bar2'>
    //     {/* Dropdown start */}
    // <div className='dropdown2'>
    // <div id='drop-text' className='dropdown2-text'>
    //     <span id='span'>Everything</span>
    //     <ExpandMoreIcon />    </div>
    // <ul id='list' className='dropdown2-list'>
    //     <li className='dropdown2-list-item'>Everything</li>
    //     <li className='dropdown2-list-item'>Videos</li>
    //     <li className='dropdown2-list-item'>Community</li>
    //     <li className='dropdown2-list-item'>Playlists</li>
    //     <li className='dropdown2-list-item'>Shorts</li>

    // </ul>
    // </div>
   
    // <div className='search-box2'>
    //   <input type='text' id="search-input" placeholder='Search Anything' />
    //   <SearchIcon  />    
    //     </div>
    // </div>

// let dropdownBtn =document.getElementById("drop-text");
// let list =document.getElementById("list");
// let icon =document.getElementById("icon");
// let span =document.getElementById("span");
// let input = document.getElementById("search-input");
// let listItems = document.querySelectorAll("dropdown2-list-item");

//     dropdownBtn.onClick= function(){
//     if(list.classList.contain("show"))
//       {
//         icon.style.rotate = "0deg";
//       }  
//       else{
//         icon.style.rotate= "-180deg";
//       }
//     list.classList.toogle("show"); }
//     icon.style.rotate="-180deg";   }
//     window.onClick = function (e) {if(e.target.id !== "drop-text" && e.target.id !== "span" && e.target.id !== "icon"){
//       list.classList.remove("show"); icon.style.rotate="-180deg";
//     }}

   
//     for(item of listItems)
//       {
//         item.onclick = function(e)
//         {
//           span.innerText = e.target.innerText;
//       if(e.target.innerText === "Everything")
//         {
//           input.placeholder = "Search Anything... "
//         }
//         else {input.placeholder = "Search in" + e.target.innerText + "...";}
            

//         }
//       }
      
  )
}

export default SearchComp