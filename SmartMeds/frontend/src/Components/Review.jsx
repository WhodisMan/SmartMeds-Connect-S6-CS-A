import React,{useState,useRef,useEffect,useCallback} from 'react'
import Navbar2 from './Navbar2'
import Footer from './Footer'
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Link,useLocation } from 'react-router-dom';
import './Review.css';
import axios from 'axios';
import imgGirl from '../Assets/Icon.png';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const Review = () => {

    const location = useLocation();
    const [selected, setSelected] = useState(location.state?.data || null);
    

    useEffect(() => {
        if(location.state.data)
            setSelected(location.state.data);
    }, [location.state]);

    

    const [reviewData, setreviewData] = useState([])
    const fetchItems = useCallback(async () => {
        try {
          const response = await axios.get("http://localhost:3030/Reviews");
          
          if (response && response.data[selected.restaurant]) {
            setreviewData(response.data[selected.restaurant]);
            
          }
        } catch (error) {
          console.log(error);
        }
      }, [selected.restaurant]);
    
      useEffect(()=>{
        fetchItems()
        },[fetchItems]);
      
      

    const [number, setNumber] = useState(0);
    const [hoverStar, setHoverStar] = useState(undefined);

    const reviewRef = useRef(null);
    const handleScroll = (ref) => {
        window.scrollTo({
          top: ref.current.offsetTop,
          behavior: "smooth"
        });
      }

      const [defaultImage, setDefaultImage] = useState({});
        const handleErrorImage = (data) => {
          setDefaultImage((prev) => ({
              ...prev,
              [data.target.alt]: data.target.alt,
              linkDefault: imgGirl,
          }));
          };

          const [reviewText, setReviewText] = useState('');
          const [reviewStar, setReviewStar] = useState(0);
          const [userReview, setuserReview] = useState('')

        const submitReview = async () => {
            setReviewStar(number);
            if(number!==0){ 
              setreviewIsSubmitted(true)
              setuserReview(reviewText)
              try {
                const response = await axios.post('http://localhost:3030/Review-Post', {
                  restaurant: selected.restaurant,
                  Name: "current user",
                  Rating: reviewStar,
                  Review: reviewText
                });
                
                console.log(response.data);
              } catch (error) {
                console.error(error);
              }
            }
            else{
                    alert("Please give a rating before submitting ")
                    return
            }
        };

        const handleInputChange = (event) => {
            setReviewText(event.target.value);
        };

        // Click enter to submit
        // const handleKeyDown = (event) => {
        //     if (event.key === 'Enter') {
        //     submitReview();
        //     }
        // };
      
        const [reviewIsSubmitted, setreviewIsSubmitted] = useState(false)

        function getIndicatorColor(indicator) {
          if (indicator === 1) {
            return 'circle-green';
          } else if (indicator === 2) {
            return 'circle-yellow';
          } else if (indicator === 3) {
            return 'circle-red';
          } else {
            return 'circle-default'; // default color if the indicator value is not recognized
          }
        }

        function getStatusText(indicator) {
          if (indicator === 1) {
            return 'Amazing';
          } else if (indicator === 2) {
            return 'Moderate';
          } else if (indicator === 3) {
            return 'Poor';
          } else {
            return '';
          }
        }
    
  return (
    <div>
        <nav>
            <Navbar2/>
        </nav>

        <body>
            
            <div className='restaurant'>
                
                <div className="row">
                    <div className='col ps-4'>
                    <img className='restaurant-img'
                        src={
                        defaultImage[selected.restaurant] === selected.restaurant
                            ? defaultImage[selected.restaurant] === defaultImage["'" + selected.restaurant + "'"]? defaultImage.linkDefault: selected.restaurantImg
                            : selected.restaurantImg
                        }
                        alt={selected.restaurantImg}
                        onError={handleErrorImage}
                        />
                        
                    </div>
                    <div className=" d-flex flex-column justify-content-center align-items-center ps-2 pt-3 col ">
                    
                      <div className='d-flex flex-row gap-1'>
                        <h1 className='restaurant-name ps-3'>
                          {selected.restaurant}
                        </h1>
                        {/* styles in restaurant.css */}
                        <div className={`indicator-circle ${getIndicatorColor(selected.indicator)} mt-1`}>
                          <span className="status-tooltip">{getStatusText(selected.indicator)}</span>
                        </div>
                      </div>
                        <h2 className='restaurant-details'>Louis Lane, Pandit Karuppan Road, Perumanoor Thevera, Kochi</h2>
                        <h2 className='restaurant-details'>Call : +919633276393</h2>
                        <div className='text-center card rate-card m-5'>
                            <h1>Rate us</h1>
                            <div className="star-rating">
                                {Array(5)
                                .fill()
                                .map((_, index) =>
                                    number >= index + 1 || hoverStar >= index + 1 ? (
                                    <AiFillStar
                                        onMouseOver={() => !number && setHoverStar(index + 1)}
                                        onMouseLeave={() => setHoverStar(undefined)}
                                        style={{ color: "orange", fontSize: "3.7rem" }}
                                        onClick={() => setNumber(index + 1)}
                                    />
                                    ) : (
                                    <AiOutlineStar
                                        onMouseOver={() => !number && setHoverStar(index + 1)}
                                        onMouseLeave={() => setHoverStar(undefined)}
                                        style={{ color: "orange", fontSize: "3.6rem" }}
                                        onClick={() => setNumber(index + 1)}
                                    />
                                    )
                                )}
                            </div>
                        </div>
                        <div className='d-flex flex-column gap-3 '>
                            <div to='' class="btn  restaurant-btn btn-lg center-btn" onClick={() => handleScroll(reviewRef)}>Leave a Review</div>
                            <Link to={{pathname: "/Restaurant"}} state={{data:selected}}  class="btn restaurant-btn btn-lg center-btn">Continue Browsing</Link>    
                        </div>
                        
                    </div>
                </div>
                <div className="container pb-5">
                    <h2 className='pt-5'>Reviews</h2>
                    <div className="Review" ref={reviewRef}>
                        
                        <ReviewCard reviewData={reviewData} reviewIsSubmitted={reviewIsSubmitted}/>
                    </div> 
                </div>

                {reviewIsSubmitted &&
                    <div className="write-review ms-5 me-5 mb-5">
                    <div className=' card write-review-card ps-5 pt-3 pb-2'>
                        
                        <div className="card-top d-flex flex-row gap-3 align-items-start justify-content-between">
                                <div className='d-flex flex-column '>
                                    <div>Your Review</div>
                                    <text> {userReview}</text>
                                </div>
                                
                                <div >  
                                    <div className='w-100 d-flex flex-row justify-content-end pe-5'>
                                    {Array(5)
                                      .fill()
                                      .map((_, index) =>
                                          reviewStar >= index + 1 ? (
                                          <AiFillStar
                                              style={{ color: "orange", fontSize: "1.51rem" }}
                                          />
                                          ) : (
                                          <AiOutlineStar
                                              style={{ color: "orange", fontSize: "1.51rem" }}
                                          />
                                          )
                                      )}
                                    </div >
                                    
                                    
                                </div>
                                
                        </div>
                        
                    </div>   
                </div>
                }
                
                <div className="write-review ms-5 me-5 mb-5">
                    <div className=' card write-review-card ps-5 pt-3 pb-2'>
                        
                        <div className="card-top d-flex flex-row gap-3 align-items-center">
                                <div>
                                    <div>Current User</div>
                                    <textarea name="write-review-area"  cols="150" rows="5" value={reviewText} onChange={handleInputChange} ></textarea>
                                </div>
                                
                                <div >  
                                    <div className='w-100 d-flex flex-row justify-content-end pe-5'>
                                        {Array(5)
                                            .fill()
                                            .map((_, index) =>
                                                number >= index + 1 || hoverStar >= index + 1 ? (
                                                <AiFillStar
                                                    onMouseOver={() => !number && setHoverStar(index + 1)}
                                                    onMouseLeave={() => setHoverStar(undefined)}
                                                    style={{ color: "orange", fontSize: "3.1rem" }}
                                                    onClick={() => {
                                                        setNumber(index+1);
                                                        
                                                      }}
                                                />
                                                ) : (
                                                <AiOutlineStar
                                                    onMouseOver={() => !number && setHoverStar(index + 1)}
                                                    onMouseLeave={() => setHoverStar(undefined)}
                                                    style={{ color: "orange", fontSize: "3rem" }}
                                                    onClick={() => {
                                                        setNumber(index+1);
                                                      }}
                                                />
                                                )
                                            )}
                                    </div >
                                    <div className='btn custom-button d-flex justify-content-center me-4' onClick={submitReview}>
                                        Submit
                                    </div>
                                    
                                </div>
                                
                        </div>
                        
                    </div>   
                </div>
                
            </div>
        </body>

        <footer>
            <Footer/>
        </footer>
    </div>
  )
}
function CustomNextArrow(props) {
    const { className,  onClick } = props;
    return (
      <div
        className={className}
        onClick={onClick}
      />
    );
  }
  
  function CustomPrevArrow(props) {
    
    const { className,  onClick } = props;
    

    
    return (
      <div
        
        className={className}
        onClick={onClick}
      />
      
    );
  }

const ReviewCard= (reviewData,reviewIsSubmitted) => {

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        nextArrow: <CustomNextArrow />,
        prevArrow: <CustomPrevArrow/>,
      
        responsive: [
          {
            breakpoint: 1400,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            },
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              
            },
          },
        ],
      };

    return(
        <div>
           <Slider   {...settings}>
      {reviewData.reviewData.length === 0 ? (
        <div>
          {reviewIsSubmitted &&
          <h1 style={{ color: "grey", fontSize: "2rem" }}>
            No reviews available. Be the first to review!
          </h1>
          }
        </div>
      ) : (
        reviewData.reviewData.map((item) => (
            <div className="Review-Card-Slider d-flex flex row ms-1">
                
            
            <div className="card review-card ps-5 pt-3 pb-2 mt-3">
                <div className="card-top d-flex flex-row gap-3 justify-content-between">
                <div>{item.Name}</div>
                <div>
                    {Array(5)
                    .fill()
                    .map((_, index) =>
                        item.Rating >= index + 1 ? (
                        <AiFillStar
                            style={{ color: "orange", fontSize: "1.51rem" }}
                        />
                        ) : (
                        <AiOutlineStar
                            style={{ color: "orange", fontSize: "1.51rem" }}
                        />
                        )
                    )}
                </div>
                </div>
                <div className="card-bottom">{item.Review}</div>
            </div>
            
          </div>
        ))
      )}
      </Slider>
    </div>      
    )
}

export default Review