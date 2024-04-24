import React,{useState,useEffect} from 'react'
import Navbar2 from './Navbar2'
import Footer from './Footer'
import './Dashboard.css'
import ProductSlider from './ProductSlider'
import SearchBar from './SearchBar'
import axios from 'axios'

const Dashboard = () => {

  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  }

  const [recommended, setrecommended] = useState([]);
  const [popular, setpopular] = useState([]);
  const [recommendedRestaurants, setrecommendedRestaurants] = useState([]);
  const fetchItems=async()=>{
    try{
        const response=await axios.get("http://localhost:3030/food");//api for food recommedation
        if (response && response.data) { // Check if response and response.data exist
          setrecommended(response.data);
        }
        
    }
    catch (error) {
        console.log(error);
    
  }
  try{
    const response=await axios.get("http://localhost:3030/food");//api for restaurant recommedation
    if (response && response.data) { // Check if response and response.data exist
      setrecommendedRestaurants(response.data);
      console.log(response.data)
    }
      
  }
  catch (error) {
      console.log(error);
    }
    try{
      const response=await axios.get("http://localhost:3030/food");//api for popular foods
      if (response && response.data) { // Check if response and response.data exist
        setpopular(response.data);
          
      }
        
    }
    catch (error) {
        console.log(error);
      }

    
  }

  useEffect(()=>{
    fetchItems()
    },[]);

    
  return (
    <div className='dashboard'>
        <nav>
            <Navbar2/>
        </nav>
        <body className='dashboard-body'>

            <div className="bg-img position-relative d-flex justify-content-center">
              <div className="fg-content d-flex flex-column justify-content-center align-items-center gap-5 ">
                <h1 className>Satisfy your cravings</h1> 
                <SearchBar onSearchResults={handleSearchResults} />
              </div>
            </div>
            {searchResults.length > 0 &&
              <div className="container pb-5">
                <h2 className='pt-5'>Search Results</h2>
                <div className="container p-0 m-0">
                  {/* {searchResults.map(results => 
                      <li key={results.id}>{results.name}</li>
                    )} */}
                  <ProductSlider data={searchResults}/>
                  
                </div>
              </div>
            }

            <div className="container pb-5">
              <h2 className='pt-5'>Recommended for you</h2>
              <div className="container p-0 m-0">
                
                <ProductSlider data={recommended}/>
              </div>
            </div>

            

            <div className="container pb-5">
              <h2 className='pt-5'>Restaurants for you</h2>
              <div className="container p-0 m-0">
                {console.log(recommendedRestaurants)}
                <ProductSlider data={recommendedRestaurants}/>
              </div>
            </div>

            <div className="container pb-5">
              <h2 className='pt-5'>Popular</h2>
              <div className="container p-0 m-0">
                <ProductSlider data={popular}/>
              </div>
            </div>

        </body>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Dashboard