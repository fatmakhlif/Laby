import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Researcher from './Researcher'
import Wrapper from '../assets/wrappers/ResearchersContainer'
import PageBtnContainer from './PageBtnContainer'

const ResearchersContainer = () => {
  const { getResearchers,
     researchers,
      isLoading,
       page,
        totalResearchers,
        search,
    searchStatus,
    searchType,
    sort,
    numOfPages,

       } = useAppContext()
  useEffect(() => {
    getResearchers()
  }, [page,search, searchStatus, searchType, sort])

  if (isLoading) {
    return <Loading center />
  }
  if (researchers.length === 0) {
    return (
      <Wrapper>
        <h2>No researchers to display...</h2>
      </Wrapper>
    )
  }
  return (
    <Wrapper>
      <h5>
        {totalResearchers} researcher{researchers.length > 1 && 's'} found
      </h5>
      <div className='researchers'>
        {researchers.map((researcher) => {
          return <Researcher key={researcher._id} {...researcher} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </Wrapper>
  )
}

export default ResearchersContainer