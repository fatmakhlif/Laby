import { FormRow,FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
const AddResearcher = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    category,
    grade,
    email,
    fullName,
    CIN,
    dateOfBirth,
    telephone,
    institution,
    gradeOptions,
    categoryOptions,
    handleChange,
    clearValues,
    isLoading,
    createResearcher,
    status,
    statusOptions,
    editResearcher,
    categoryy


  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!category || !fullName || !institution ||!email || !CIN || !telephone ||!grade ) {
      displayAlert()
      return
   }
    if(isEditing){
       editResearcher()
      return 
    }
    createResearcher()
  }

  const handleResearcherInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
    
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit Researcher' : 'add Researcher '} </h3>
        {showAlert && <Alert />}

        
        <div className='form-center'>
          {/* fullName */}
          <FormRow
            type='text'
            name='fullName'
            value={fullName}
            handleChange={handleResearcherInput}
          />
          <FormRow
            type='text'
            name='CIN'
            value={CIN}
            handleChange={handleResearcherInput}
          />
          <FormRow
            type='text'
            name='dateOfBirth'
            value={dateOfBirth}
            handleChange={handleResearcherInput}
          />
          {/* email */}
          <FormRow
            type='text'
            name='email'
            value={email}
            handleChange={handleResearcherInput}
          />
          <FormRow
            type='text'
            name='telephone'
            value={telephone}
            handleChange={handleResearcherInput}
          />

          {/* institution */}
          <FormRow
            type='text'
            labelText='institution'
            name='institution'
            value={institution}
            handleChange={handleResearcherInput}
          />
          {/* Category */}
          <FormRowSelect
      labelText='category'
      name='category'
      value={category}
      handleChange={handleResearcherInput}
      list={categoryOptions}
    />
     {<FormRowSelect
      labelText='grade'
      name='grade'
      value={grade}
      handleChange={handleResearcherInput}
      list={gradeOptions}
    />}
    <FormRowSelect
      name='status'
      value={status}
      handleChange={handleResearcherInput}
      list={statusOptions}
    />

          {/*  */}

          <div className='btn-container'>
            <button
              className='btn btn-block submit-btn'
              type='submit'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
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

export default AddResearcher 