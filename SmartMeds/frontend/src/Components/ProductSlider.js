
import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './ProductSlider.css';
import { Link } from 'react-router-dom';
import FoodItem from './FoodItem';





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

const ProductSlider = ({ data,showItemCountProp,showCancelButtonProp }) => {


  const settings = {
    dots: (data.length <= 100),
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow/>,
  
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          
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

 

  return (
    <div className="ProductSlider">
      <Slider   {...settings}>
        {data.map((item) => (
          <Link to={{
            pathname: showCancelButtonProp ? "" : "/Restaurant",
            state: { data: item }
          }}
           state={{data:item}} className='no-text-decoration'>
            <FoodItem data={[item]} showItemCountProp={showItemCountProp} showCancelButtonProp={showCancelButtonProp}/>
          </Link>
          
        ))}
      </Slider>
    </div>
  );
}

export default ProductSlider