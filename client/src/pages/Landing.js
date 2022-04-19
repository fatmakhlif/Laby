import React, { Component } from 'react';
import {Logo} from '../components';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage.js'
class Landing extends Component {
    state = {  } 
    render() { 
        return (
        <Wrapper>
           <nav>
            <Logo/>
         </nav> 
         <div  className='container page'>
             <div className='info'>
                 <h1>Lab App</h1>
                 <p>
                     labdvegzfbufbgehbvfhdbvhfsdbvd
                 </p>
                 <button className='btn btn-hero'>Login</button>
             </div>
             
            <img src={main} alt="lab hunt" className='img main-img'/> 
             
             
         </div>
        </Wrapper>);
    }
}


 
export default  Landing ;
