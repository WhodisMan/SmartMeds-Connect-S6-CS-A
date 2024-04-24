import React, { useContext } from 'react'
import { CartContext } from './Cart';

const Items = ({restaurant, price, food, id ,linkImg, quantity}) => {

    const {removeItem, increment, decrement} = useContext(CartContext);
  return (
    <>
        <div className='items-info Cart-Container'>
            <div className='product-img'>
                <img src={linkImg } alt="" />  
            </div>
            <div className='title'>
                <h2 className='cart-text'>{food}</h2>
                <p className='cart-text'>{restaurant}</p>
            </div>
            <div className='add-minus-quantity'>
                <i className='fas fa-minus minus' onClick={()=> decrement(id)}></i>
                <input type="text" placeholder={quantity} />
                <i className='fas fa-plus add' onClick={()=> increment(id)}></i>
            </div>
            <div className='price'>
                <h3>Rs {price}</h3>
            </div>
            <div className='remove-item'>
                <i className='fas fa-trash-alt remove' 
                onClick={()=>removeItem(id)}></i>
            </div>
        </div>
        <hr /> 
    </>
  )
}

export default Items