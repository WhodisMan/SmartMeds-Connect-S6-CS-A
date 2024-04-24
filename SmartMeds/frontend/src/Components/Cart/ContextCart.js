import React, {useContext} from 'react';
import {Scrollbars} from 'react-custom-scrollbars-2';
import Items from './Items';
import { CartContext } from './Cart';
import { Link } from 'react-router-dom'
const ContextCart = () => {

    const handleGoBack = () => {
        window.history.back();
      };
    const {item , clearCart,totalAmount , totalItem}= useContext(CartContext);
    if(item.length === 0){
        return(
            <>
            
            <div className="Cart-Container">

            
     <header>
            
        <div className='continue-shopping' onClick={handleGoBack}>
            <img src={require('../../Assets/arrow.png')} alt="arrow" className='arrow-icon' />
            <h3>Continue Shopping</h3>
            <div className='cart-icon'>
                <img src={require('../../Assets/cart.png')} alt="cart" />
                <p>0</p>
            </div>
            
            
        </div>
    </header>
    <section className='main-cart-section'>
        <h1> Shopping Cart </h1>
        <p className='total items'>you have <span className='total-items-count'> </span> items in your cart</p>
        </section>
        </div>
        
            </>

        )
    }
  return (
    <>
    
    <div className="Cart-Container ">
     <header>
            
        <div className='continue-shopping' onClick={handleGoBack}>
            <img src={require('../../Assets/arrow.png')} alt="arrow" className='arrow-icon' />
            <h3>Continue Shopping</h3>
            <div className='cart-icon'>
                <img src={require('../../Assets/cart.png')} alt="cart" />
                
                <p>{totalItem}</p>
            </div>
            
        </div>
    </header>
    <section className='main-cart-section'>
        <h1>Your Selection</h1>
        <p className='total items'>You have <span className='total-items-count'>{totalItem}</span> items in your cart</p>

        <div className='cart-items w-90'>
            <div className='cart-items-container'>
                <Scrollbars>
                    {
                        item.map((curItem)=>{
                            return <Items key={ curItem.id}{...curItem} />

                        })

                    }
                        

                </Scrollbars>  
            </div>
        </div>
        <div className='card-total pb-5'>
            <h3>cart Total: <span>Rs {totalAmount}</span></h3>
            <button className='clear-cart me-5' onClick={clearCart}>Clear Cart</button>
            <Link to='/Checkout'><button >Checkout</button></Link>
            
        </div>
    </section>
    </div>
    
    </>
  )
}

export default ContextCart