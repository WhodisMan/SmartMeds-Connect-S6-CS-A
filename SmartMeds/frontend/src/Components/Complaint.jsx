import React,{useState,useEffect,useRef} from 'react'
import Navbar2 from './Navbar2'
import Footer from './Footer'
import ComplaintFormPopUp from './ComplaintFormPopUp'
import axios from 'axios'
import { ImMenu3 } from 'react-icons/im';
import complaintData from './ComplaintsTestData.json'
const Complaint = () => {
    

    const [hasComplaint, sethasComplaint] = useState(false)
    const [triggerPopUp,setTriggerPopUp]=useState(false)
    const [currentComplaints, setCurrentComplaints] = useState([])

    const addComplaint=()=>{
        setTriggerPopUp(true)
        //Add complaint
    }
    

    //Fetching data
    const [items, setitems] = useState([]);
    
    const fetchItems=async()=>{

        //Fetch previous order history
        try{
            const response=await axios.get("http://127.0.0.1:8000/api/food/");
            if (response && response.data.ProductSlider) { // Check if response and response.data exist
                setitems(response.data.ProductSlider);
                
            }
            
        }
        catch (error) {
            console.log(error);
          }
          
          //Change when implementing api
          if(complaintData)
          {
            sethasComplaint(true);
            setCurrentComplaints(complaintData.Complaints);
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
    

    const toggleDropdown=()=>{
        setSearchDropDown(!SearchDropDown)
    }

    // const [SearchResults, setSearchResults] = useState({})
    const [SearchDropDown, setSearchDropDown] = useState(false);

    const [complaintDetails, setComplaintDetails] = useState({
        item: '',
        description: '',
        res_Id:'',
      });
    const submitComplaint=()=>{

        //If form is not completely filled
        if (!complaintDetails.item || !complaintDetails.description) {
            alert("Please fill in the details before submitting")
            // Perform any necessary actions or error handling
            return;
        }

        // Split complaintDetails.item into restaurant and food
        const [restaurant, food] = complaintDetails.item.split('-');

        // Check if the restaurant and food exist in the items array
        const complaintItem = items.find(
            (unit) =>
            unit.restaurant.toLowerCase().includes(restaurant.toLowerCase()) &&
            unit.food.toLowerCase().includes(food.toLowerCase())
        );

        if (!complaintItem) {
            console.log('Item not found in the items array:', complaintDetails.item);
            alert("Item not found.Please select the item from drop down menu")
            // Perform any necessary actions or error handling
            return;
        }

        // Create a new complaint object using the complaintDetails state
        const newComplaint = {
            Name: complaintDetails.item,
            Complaint: complaintDetails.description,
            res_Id:complaintDetails.res_Id,
        };

        // Add the new complaint at the beginning of the current complaints
        setCurrentComplaints([newComplaint, ...currentComplaints]);

        // Post complaint to backend
        axios
        .post('http://localhost:3030/Complaint-Post', newComplaint)
        .then((response) => {
            console.log('Complaint posted successfully:', response.data);
            // Perform any additional actions or handle the response as needed
        })
        .catch((error) => {
            console.error('Error posting complaint:', error);
            // Handle the error appropriately
        });


        // Clear the complaint details
        setComplaintDetails({
            item: '',
            description: '',
            res_Id:'',
        });

        // Close the complaint form pop-up
        setTriggerPopUp(false);

    }
  return (
    <div>
        <nav>
            <Navbar2/>
        </nav>
        <body>
            {!hasComplaint &&
            <div className="complaints-container">
                <div className="container pb-5">
                    <h2 className='pt-5'>Complaints</h2>
                    <h4 className='d-flex flex-row justify-content-center' style={{color:"gray"}}>You have no complaints:)</h4>
                </div>
            </div>
            }
            {hasComplaint &&
            <div className="complaints-container">
                <div className="container">
                    <h2 className='pt-5'>Complaints</h2>
                    <div className="complaint-cards-container" style={{ height: "500px", overflowY: "auto" }}>
                        {currentComplaints.map((item) => (
                            <div className="card" style={{backgroundColor:"floralwhite",marginTop:"1rem",paddingLeft:"1.2rem"}}>
                                <div className="card-top" style={{fontWeight:"700",fontSize:"1.4rem"}}>
                                   Item: {item.Name}
                                </div>
                                <div className="card-bottom" style={{fontSize:"1.2rem"}}>
                                    Complaint: {item.Complaint}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            }
            <div className="complaint-form-pop-up ">
                <ComplaintFormPopUp trigger={triggerPopUp} setTrigger={setTriggerPopUp}>
                    <div  >
                        <h1>Complaint Form</h1>
                        <label className='p-3'>Note: Complaints can only be registered for items that have been ordered before</label>
                        <div>
                            <h5 className=''>Select the item</h5>
                            <div className="search d-flex flex-column border ms-5" style={{ backgroundColor: "white" }}>
                                <div className="search-box d-flex gap-3 align-items-center">
                                    <input className='search-input' type="text"
                                        placeholder='Search for restaurants or dishes...'
                                        value={complaintDetails.item}
                                        onChange={(e) => {
                                            const value = e.target.value;
                                            setsearch(value);
                                            setComplaintDetails((prevDetails) => ({
                                              ...prevDetails,
                                              item: searchRef.current.value,
                                            }));
                                          }}
                                        ref={searchRef}
                                        
                                    />
                                    <ImMenu3 onClick={toggleDropdown} className='drop-down-menu-icon' size={37} />
                                </div>
                                {(search.length>0 || SearchDropDown) && 
                                    <div className="search-dropdown d-flex flex-column" >
                                        {filtered.length>0?
                                            filtered.slice(0, 9).map((result,index)=>{
                                            return(
                                                <div className="search-result-card ps-3" style={{ backgroundColor: "white" }} key={index} 
                                                onClick={(e)=>{
                                                    
                                                    (searchRef.current.value=result.restaurant + '-'+ result.food)
                                                    setsearch('');
                                                    setComplaintDetails((prevDetails) => ({
                                                        ...prevDetails,
                                                        item: searchRef.current.value,
                                                        res_Id:result.res_Id?result.res_Id:0
                                                      }));
                                                    // setSearchResults([result]);
                                                    toggleDropdown()
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
                        <div>
                            <h5 className='pt-4'>Please provide a desciption for the complaint</h5>
                            <textarea
                                style={{ height: 'fit-content', width: '100%' }}
                                name=""
                                id=""
                                cols="10"
                                rows="10"
                                value={complaintDetails.description}
                                onChange={(e) =>
                                    setComplaintDetails({
                                    ...complaintDetails,
                                    description: e.target.value,
                                    })
                                }
                            ></textarea>

                        </div>
                        <div className='btn custom-button d-flex justify-content-center ' onClick={submitComplaint}>
                            Submit
                        </div>
                    </div>
                </ComplaintFormPopUp>
            </div>
            <div className="d-flex flex-row justify-content-around  pb-3 mb-5" style={{fontSize: '3rem'}}>
                <button className='btn custom-button' onClick={addComplaint}>Add Complaint</button>
            </div>
            
        </body>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Complaint