import React from 'react'
import { FaLocationArrow, FaBriefcase, FaPhoneAlt } from 'react-icons/fa'
import { MdAlternateEmail} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Lab'
import LabInfo from './LabInfo'
const Lab = ({ _id, name, acronym, phone, email, specialty, domain, researchAreas, type,status,university }) => {
    const { setEditLab } = useAppContext()
    return (
        <Wrapper>
            <header>
                <div className='main-icon'>{name.charAt(0)}</div>
                <div className='info'>
                    <h5>{name}</h5>
                    <p>{acronym}</p>
                </div>
                <div className='content-center'>
                    <LabInfo icon={<FaPhoneAlt />} text={phone} />
                    <LabInfo icon={<MdAlternateEmail />} text={email} />
                    <LabInfo icon={<MdAlternateEmail />} text={university} />
                    <LabInfo icon={<FaBriefcase />} text={specialty} />
                    <LabInfo icon={<FaBriefcase />} text={domain} />
                    <LabInfo icon={<FaBriefcase />} text={researchAreas} />
                    <LabInfo icon={<FaBriefcase />} text={type} />
                    <LabInfo icon={<FaBriefcase />} text={status} />
                </div> 
            </header>
            <div className='content'>

                <footer>
                    <div className='actions'>
                        <Link
                            to='/add-lab'
                            onClick={() => setEditLab(_id)}
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

export default Lab