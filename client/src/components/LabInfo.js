import React from 'react'
import Wrapper from '../assets/wrappers/LabInfo'
const LabInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span>
    </Wrapper>
  )
}

export default LabInfo