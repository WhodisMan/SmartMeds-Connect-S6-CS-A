import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const Footer = () => {
  return (
    <FooterContainer className="main-footer"> 
        <div className="footer-middle">
            <div className="container">
                {/* Footer Bottom */}
                <div className="site-title">
                    <img src={require('../Assets/Icon.png')} alt=""/>
                    <p className="text-xl-center" >
                        SmartMeds Connect
                    </p>
                </div>
                <div className="row justify-content-center">
                    {/* Column 1 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>Contact Us</h4>
                        <ul class="list-unstyled">
                            <li> Email: support@smartmeds.com</li>
                            <li> Phone: 2947283746, 8394593488</li>
                            
                        </ul>     
                    </div>
                    {/* Column 2 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>Legal</h4>
                        <ul class="list-unstyled">
                            <li><Link to='/Terms'>Terms and Conditons</Link></li>
                            <li><Link to='/Privacy'>Privacy</Link></li>
                            <li><Link to='/Security'>Security</Link></li>
                        </ul>     
                    </div>
                    {/* Column 3 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>Learn More</h4>
                        <ul class="list-unstyled">
                            <li><Link to='/About'>About us</Link></li>
                            <li><Link to='/Team'>Team</Link></li>
                            <li><Link to='/FAQ'>FAQ</Link></li>
                        </ul>     
                    </div>
                    {/* Column 3 */}
                    <div className="col-md-3 col-sm-6">
                        <h4>Social</h4>
                            <ul class="list-unstyled social">
                                <li>
                                    <Link to='/'><img src={require('../Assets/Instagram.png')} class="icon"  alt="" /></Link>
                                </li>
                                <li>
                                    <Link to='/'><img src={require('../Assets/Facebook.png')} class="icon"  alt="" /></Link>
                                </li>
                                <li>
                                    <Link to='/'><img src={require('../Assets/Twitter.png')} class="icon"  alt="" /></Link>
                                </li>
                            </ul>    
                    </div>
                </div>
                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p className="text-xs-center">
                        &copy;{new Date().getFullYear()} SmartMeds Hub
                    </p>
                </div>
            </div>
        </div>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer=styled.footer`
.footer-middle{
    background: lightblue;
    padding-top: 3rem;
    width:100vw;
    position:relative;
    bottom:0;
}

.footer-bottom{
    padding-top:2rem;
    padding-bottom:1rem
}

ul li a{
    color:black;
    text-decoration:none;
}

ul li a:hover{
    color:var(--highlightGrey);
}

.row {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  .col-md-3 {
    flex-basis: calc(25% - 2rem); /* adjust this value to control the width of the columns */
  }
  .social{
    display:flex;
    gap: 2rem;
    padding-top:1rem;
  }
  .icon {
    max-width: 2.5rem;
    height: auto;
  }
  .icon:hover{
    opacity: 0.5;
  }
`;