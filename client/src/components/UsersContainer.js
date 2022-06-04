import React from 'react'
import { useAppContext } from '../context/appContext'
import { useEffect, useState } from 'react'
import Loading from './Loading'
import User from './User'
import Wrapper from '../assets/wrappers/UsersContainer'
import SearchContainer from './SearchContainer'

function UsersContainer() {
  const { getUsers, users, isLoading, totalUsers } = useAppContext()
  useEffect(() => {
    getUsers()
  }, [])
  const [value, setValues] = useState('');
  const handleChange = (event) => {
    setValues(event.target.value)
  }

  if (isLoading) {
    return <Loading center />
  }
  if (users.length === 0) {
    return (
      <Wrapper>
        <h2>No users to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <SearchContainer value= {value} handleChange={handleChange} />
      <h5>
        {totalUsers} user{users.length > 1 && 's'} found
      </h5>
      <div className='users'>
        {users.filter((user) => {
          let compare = user.name+' '+user.lastName
          if ( value === "") {
            return user
          } else if(compare.toLowerCase().includes(value.toLocaleLowerCase())) {  
            return user
          }
        }).map((user) => {
          return <User key={user._id} {...user} />
        })}
      </div>
    </Wrapper>
  )
}

export default UsersContainer