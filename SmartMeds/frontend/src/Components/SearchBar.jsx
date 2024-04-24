import React, { useEffect,useState,useRef } from 'react'
import {FaSearch} from 'react-icons/fa'
import './SearchBar.css'
import axios from 'axios'


const SearchBar = ({ onSearchResults }) => {

    //Fetching data
    const [items, setitems] = useState([]);
    
    const fetchItems=async()=>{
        try{
            const response=await axios.get("http://localhost:3030/food");
            if (response && response.data) { // Check if response and response.data exist
                setitems(response.data);
                
            }
            
        }
        catch (error) {
            console.log(error);
          }
    }
    

    useEffect(()=>{
        fetchItems()
    },[]);

  
    //Filter items
    const [filtered, setfiltered] = useState([]);
    const [search, setsearch] = useState("");

    const searchRef=useRef();

    
    useEffect(() => {
        // setfiltered(items.filter((unit) => unit.restaurant.toLowerCase().includes(search.toLowerCase())));
        setfiltered(items.filter((unit) => unit.restaurant.toLowerCase().includes(search.toLowerCase()) || unit.food.toLowerCase().includes(search.toLowerCase())));

    },[search,items]);
    

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && search.length>0) {
          onSearchResults(filtered);
        }
    }
    return (
    <div>
        <div className="search d-flex flex-column">
            <div className="search-box d-flex gap-3 align-items-center">
                <FaSearch/>
                <input className='search-input' type="text"
                    placeholder='Search by patient name or id...'
                    onChange={(e)=>setsearch(e.target.value)}
                    ref={searchRef}
                    onKeyDown={handleKeyPress} // Add key press event listener

                />
            </div>
            {search.length>0 && 
                <div className="search-dropdown d-flex flex-column">
                    {filtered.length>0?
                        filtered.slice(0, 9).map((result,index)=>{
                        return(
                            <div className="search-result-card ps-3" key={index} 
                            onClick={(e)=>{
                                
                                (searchRef.current.value=result.restaurant + '-'+ result.food)
                                setsearch('');
                                onSearchResults([result]);
                                }}>
                                <p className='ps-3'>{result.restaurant}-{result.food}</p>
                            </div>    
                        );
                        }) : (
                            <p className='ps-4'>Sorry we could not find what you are searching for...</p>
                        )
                    }   
                    
                </div>}
            
        </div>
    </div>
  )
}
export default SearchBar;



