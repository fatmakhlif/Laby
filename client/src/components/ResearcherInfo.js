import Wrapper from '../assets/wrappers/ResearcherInfo'

const ResearcherInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='icon'>{icon}</span>
      <span className='text'>{text}</span>
    </Wrapper>
  )
}

export default ResearcherInfo