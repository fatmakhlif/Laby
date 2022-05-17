import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/SharedLayout'
function SharedLayout() {
    return (

        <Wrapper>
            <nav>
                <Link to="add-user">Add User </Link>
                <Link to="all-users">All Users </Link>
            </nav>
            <Outlet />
        </Wrapper>
    )
}

export default SharedLayout