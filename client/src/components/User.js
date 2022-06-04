import React from 'react'
import Wrapper from '../assets/wrappers/User'


const User = ({ _id, name, email, lastName }) => {
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{name.charAt(0)}</div>
                <div className='info'>
                    <h5>{ `${name} ${lastName}` }</h5>
                    <p>{email}</p>
                </div>
            </header>
        </Wrapper>
    )
}

export default User