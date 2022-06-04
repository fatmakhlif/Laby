import { React } from 'react'
import FormRow from './FormRow'
import Wrapper from '../assets/wrappers/SearchContainer'
function SearchContainer(props) {

  return (
    <Wrapper>
      <div className="form">
        <FormRow type="text" name="Search" value={props.value} handleChange={props.handleChange} />
      </div>
    </Wrapper>
  )
}

export default SearchContainer