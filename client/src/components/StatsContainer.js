import { useAppContext } from '../context/appContext'
import StatItem from './StatItem'
// import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa' GiArchiveResearch
 import { GiArchiveResearch } from 'react-icons/gi' 


import Wrapper from '../assets/wrappers/StatsContainer'

const StatsContainer = () => {
  const { stats } = useAppContext()

  const defaultStats = [
    {
      title: 'MasterStudents',
      count: stats.MasterStudent || 0,
      icon: <GiArchiveResearch />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'PhDStudents',
      count: stats.PhDStudent || 0,
      icon: <GiArchiveResearch />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Doctors',
      count: stats.Doctor || 0,
      icon: <GiArchiveResearch />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
        title: 'UniversityTeachers',
        count: stats.UniversityTeacher || 0,
        icon: <GiArchiveResearch />,
        color: '#d66a6a',
        bcg: '#ffeeee',
      },
  ]

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />
      })}
    </Wrapper>
  )
}

export default StatsContainer
