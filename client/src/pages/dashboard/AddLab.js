import React from 'react'
import { FormRow, Alert, FormRowSelect } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const AddLab = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    labName,
    acronym,
    phone,
    email,
    specialty,
    domain,
    researchAreas,
    labTypeOptions,
    labType,
    handleChange,
    clearValues,
  } = useAppContext()
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!labName || !acronym || !phone || !email || !specialty || !domain || !researchAreas) {
      displayAlert()
      return
    }
    console.log('create lab');
  }
  const handleLabInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit lab' : 'add lab'} </h3>
        {showAlert && <Alert />}


        <div className='form-center'>
          <FormRow
            labelText="laboratory name"
            type='text'
            name='labName'
            value={labName}
            handleChange={handleLabInput}
          />
          <FormRow
            type='text'
            name='acronym'
            value={acronym}
            handleChange={handleLabInput}
          />
          <FormRow
            type='text'
            name='phone'
            value={phone}
            handleChange={handleLabInput}
          />
          <FormRow
            type='text'
            name='email'
            value={email}
            handleChange={handleLabInput}
          />
          <FormRow
            type='text'
            name='specialty'
            value={specialty}
            handleChange={handleLabInput}
          />
          <FormRow
            type='text'
            name='domain'
            value={domain}
            handleChange={handleLabInput}
          />
          <FormRow
            type='text'
            name='research areas'
            value={researchAreas}
            handleChange={handleLabInput}
          />
          <div className='form-row'>
            <FormRowSelect
              labelText='type'
              name='labType'
              value={labType}
              handleChange={handleLabInput}
              list={labTypeOptions}
            />
          </div>
          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}
            >
              submit
            </button>
          </div>
          <div className='btn-container'>
            {/* submit button */}
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddLab