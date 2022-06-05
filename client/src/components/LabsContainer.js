import React from 'react'
import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Lab from './Lab'
import Wrapper from '../assets/wrappers/LabsContainer'
const LabsContainer = () => {
    const { getLabs, labs, isLoading, totalLabs } = useAppContext()
    
    useEffect(() => {
        getLabs()
    }, [])
    
    if (isLoading) {
        return <Loading center />
    }
    return (
        <Wrapper>
            <h5>
                {totalLabs}{labs.length} { labs.length > 1 ? 'Laboratories' : 'Laboratory'} found
            </h5>
            <div className='labs'>
                {labs.map((lab) => {
                    return <Lab key={lab._id} {...lab} />
                })}
            </div>
        </Wrapper>
    )
}

export default LabsContainer