import moment from 'moment'

import { FaUniversity, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { BsFillTelephoneFill } from 'react-icons/bs'

import { MdOutlineGrade,MdPermIdentity,MdEmail } from 'react-icons/md'


import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Researcher'
import ResearcherInfo from './ResearcherInfo'

const Researcher = ({
  _id,
  fullName,
  category,
  grade,
  CIN,
  institution,
  email,
  createdAt,
  dateOfBirth,
  telephone,
  status,
}) => {
  const { setEditResearcher } = useAppContext()

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{fullName.charAt(0)}</div>
        <div className='info'>
          <h5>{fullName}</h5>
          {/* <p>{institution}</p> */}
        </div>
      </header>
      <div className='content'>
        {/* content center later */}
        <div className='content-center'>
         
         <ResearcherInfo icon={<FaBriefcase />} text={category} />
         <ResearcherInfo icon={<FaCalendarAlt />} text={date} />
         <ResearcherInfo icon={<BsFillTelephoneFill/>} text={telephone} />
         <ResearcherInfo icon={<MdPermIdentity />} text={CIN} />
         <ResearcherInfo icon={<FaUniversity />} text={institution} />
        
            <ResearcherInfo icon={<MdOutlineGrade />} text={grade} />
         <ResearcherInfo icon={<MdEmail />} text={email} />






        
         <div className={`status ${status}`}>{status}</div> 
        </div>
        {/* footer center*/}
        <footer>
          <div className='actions'>
            <Link
              to='/add-researcher'
              onClick={() => setEditResearcher(_id)}
              className='btn edit-btn'
            >
              Edit
            </Link>
            
          </div>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Researcher