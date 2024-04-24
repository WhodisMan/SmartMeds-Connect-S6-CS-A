import React,{useState} from 'react'
import imgGirl from '../Assets/Icon.png';
// import axios from 'axios';

const FoodItem = ({data,showItemCountProp,showCancelButtonProp}) => {

    const handleClickCancel = () => {
        console.log(data[0].food+" canceled")
        /*     Api need to be created for canceling item in cart*/
        // // Send a POST request to the backend API using Axios
        // axios
        //   .post("/your-backend-endpoint", JSON.stringify(data))
        //   .then((response) => {
        //     // Handle the response from the backend
        //     console.log("Message sent to backend successfully");
        //   })
        //   .catch((error) => {
        //     console.error("Failed to send message to backend", error);
        //   });
      };

    const [defaultImage, setDefaultImage] = useState({});

    const [count, setCount] = useState(0);
  
    const handleIncrement = () => {
        setCount(count + 1);
        //API for chaning count in cart
    };
    
    const handleDecrement = () => {
        if(count>0)
        {
        setCount(count - 1);
        //API for changing
        }
    };
    
    const handleErrorImage = (data) => {
        setDefaultImage((prev) => ({
            ...prev,
            [data.target.alt]: data.target.alt,
            linkDefault: imgGirl,
        }));
        };
  return (
    <div className='d-flex flex-row justify-content-center'>
        <div style={{ width: '300px'}}>
            {data.map((item) => (
            <div className="card food-card">
                <div className="card-top food-card-top">
                 {item.linkImg?(    
                <img
                    src={
                    defaultImage[item.restaurant] === item.restaurant
                        ? defaultImage[item.restaurant] === defaultImage["'" + item.restaurant + "'"]? defaultImage.linkDefault: item.linkImg
                        : item.linkImg
                    }
                    alt={item.restaurant}
                    onError={handleErrorImage}
                />
                 ):(
                    <img src={imgGirl} alt={item.restaurant}/>
                 )
                }   
                </div>
                <div className="card-bottom food-card-bottom">
                <h1 className='card-bottom-restuarant-name'>{item.restaurant}</h1>
                
                <div className="rating ">
                    {item.rating &&
                    <div className="rating-bg-color  d-flex flex-row rounded ps-2 pe-2 ">
                    <h1 className={`${ item.rating && item.rating.toString().length === 1 ? 'rating--large' : 'rating--small'}`}>{item.rating}</h1> 
                    
                    <img className='pt-1 ps-1' src={require('../Assets/Star.png')} alt="" />
                    </div>
                    }
                </div>
            
                <h3>{item.food}</h3>
                <h2>Rs.{item.price}</h2>
                </div>
                
                { showItemCountProp &&
                    <div className="item-count d-flex flex-row justify-content-around pt-3 pb-3" style={{fontSize: '3rem'}}>

                        <div onClick={handleDecrement} class="btn  restaurant-btn add-sub-btn p-0" >-</div>
                        <div style={{fontSize: '2rem', color: 'grey'}}>{count}</div>
                        <div onClick={handleIncrement} class="btn  restaurant-btn add-sub-btn p-0">+</div>
                    </div>
                }
                { showCancelButtonProp &&
                    <div className="item-count d-flex flex-row justify-content-around pt-3 pb-3" style={{fontSize: '3rem'}}>
                            <button className='btn custom-button' onClick={handleClickCancel}>Cancel</button>
                    </div>
                }
            </div>
            
            ))}
                
        </div>
        
    </div>
  )
}

export default FoodItem