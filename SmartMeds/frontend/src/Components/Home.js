import React ,{ useEffect }from 'react'
import Navbar from './Navbar'
import './Home.css'
import Footer from './Footer'
import { Link } from 'react-router-dom'



const Home = () => {
    useEffect(() => {
        const fadeImagesInOnScroll = () => {
          const images = document.querySelectorAll('.fade-in');
          images.forEach((image) => {
            const imageTop = image.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            if (imageTop < windowHeight) {
              image.classList.add('visible');
            }
          });
        };
    
        window.addEventListener('scroll', fadeImagesInOnScroll);
    
        return () => {
          window.removeEventListener('scroll', fadeImagesInOnScroll);
        };
      }, []);
  return (
    <div>
        <nav>
            <Navbar/>
        </nav>
        <body className='home-page'>
            <div className='home-body'>
                <div className='text-container'>
                    <h1>
                        Bridging Generations in HealthCare.
                    </h1>
                    <div>
                        <h2>Welcome to SmartMeds Connect</h2>
                        <p>Your Trusted Partner in Healthcare Management</p>
                    </div>
                </div>
                <img className='img-fluid rounded float-right' src={require('../Assets/home1.jpg')} alt="" />
            </div>
            <div className="container-fluid p-0">
                <div class="d-flex justify-content-between gap-5">
                    <img src={require('../Assets/home2.jpeg')} class="img1 rounded float-left img-fluid " alt=""/>
                    <div className='txt1 d-flex flex-column justify-content-center'>
                        <h2>Elevating Healthcare with Smart Medication Management</h2>
                        <p>Foster a collaborative healthcare environment by involving family members and healthcare providers in the patient's care journey.</p>
                    </div>
                </div>
            </div>
            <div className="container-fluid p-0">
                <div class="d-flex justify-content-between gap-5">
                    <div className='txt1 d-flex flex-column justify-content-center'>
                        <h2>Empowering Health, Simplifying Lives</h2>
                        <p>Seamless prescription uploads empower doctors to create personalized medication schedules, while real-time updates keep both healthcare providers and family members informed about the patient's medication adherence and overall health.</p>
                    </div>
                    <img src={require('../Assets/home3.jpeg')} class="img1 rounded float-right img-fluid "  alt=""/>
                </div>
            </div>
            <div className="container-fluid p-0">
                <div class="d-flex justify-content-between gap-5">
                    <img src={require('../Assets/home5.webp')} class="img1 rounded float-left img-fluid " alt=""/>
                    <div className='txt1 d-flex flex-column justify-content-center'>
                        <h2>Get connected to SmartMeds Hub. Sign up or log in now!</h2>
                        <p>It only takes a few seconds to sign up or log in – why not get started?</p>
                        <div className="d-flex flex-column gap-3">
                            <Link to='/Signup' class="btn custom-button btn-lg">Sign Up</Link>
                            <Link to='/Login' class="btn custom-button btn-lg">Login</Link>
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

export default Home
