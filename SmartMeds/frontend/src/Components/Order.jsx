import React,{useState,useEffect} from 'react'
import Navbar2 from './Navbar2'
import Footer from './Footer'
import axios from 'axios'
import ProductSlider from './ProductSlider'
import Stepper from './Stepper'
const Order = () => {


  const [orders, setorders] = useState([]);
  const [prevOrders, setprevOrders] = useState([]);
  const [showCancelButton, setShowCancelButton] = useState(true);
  const fetchItems=async()=>{
    try{
        const response=await axios.get("http://127.0.0.1:8000/api/food/");
        if (response && response.data.ProductSlider) { // Check if response and response.data exist
          setorders(response.data.ProductSlider);
        }
        
    }
    catch (error) {
        console.log(error);
      }
    try{
      const response=await axios.get("http://127.0.0.1:8000/api/food/");
      if (response && response.data.ProductSlider) { // Check if response and response.data exist
        setprevOrders(response.data.ProductSlider);
          
      }
        
    }
    catch (error) {
        console.log(error);
      }

    
  }

  useEffect(()=>{
    fetchItems()
    },[]);

    const handleStepChange = (nextStep) => {
        setShowCancelButton(nextStep<3); // Update showCancelButton state based on currentStep
      };
  return (
    <div>
        <nav>
            <Navbar2/>
        </nav>
        <body>
            {orders.length>0?(
            <div className="container pb-5">
              <h2 className='pt-5'>Orders on the way</h2>
                <div className="container">
                    <Stepper onStepChange={handleStepChange} />
                </div>
              <div className="container p-0 m-0">
                
                <ProductSlider data={orders} showCancelButtonProp={showCancelButton} />
              </div>
            </div>
            ):(
                <div className="container pb-5">
                    <h2 className='pt-5'>Orders on the way</h2>
                    <h4 className='d-flex flex-row justify-content-center' style={{color:"gray"}}>You have no current orders :)</h4>
                </div>
            )
            }
            {prevOrders.length>0?(
            <div className="container pb-5">
              <h2 className='pt-5'>Previous Orders</h2>
              <div className="container p-0 m-0">
                <ProductSlider data={prevOrders}/>
              </div>
            </div>
            ):
            (
                <div className="container pb-5">
                    <h2 className='pt-5'>Previous Orders</h2>
                    <h4 className='d-flex flex-row justify-content-center' style={{color:"gray"}}>You have no previous orders :)</h4>
                </div>
            )
        }
        </body>
        <footer>
            <Footer/>
        </footer>
    </div>
  )
}

export default Order