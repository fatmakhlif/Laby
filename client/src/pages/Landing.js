import React, { Component } from 'react'; 
import logo1 from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage.js'
import { Link } from 'react-router-dom'
class Landing extends Component {
    state = {  } 
    render() { 
        return (
        <Wrapper>
           <nav>
           <img src={logo1} alt='laby' className='logo'/>
         </nav> 
         <div  className='container page'>
             <div className='info'>
                 <h1>Lab App</h1>
                 <p>
                     Web App for laboratory mangement 
                  </p>
                 <Link to='/login' className='btn btn-hero'>
            Login
          </Link>
             </div>
             
            <img src={main} alt="lab hunt" className='img main-img'/> 
             
             
         </div>
        </Wrapper>);
    }
}


 
export default  Landing ;
