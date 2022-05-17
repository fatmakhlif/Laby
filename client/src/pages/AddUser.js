import { useState } from 'react';
import { Logo, FormRow, Alert } from '../components';
import Wrapper from '../assets/wrappers/RegisterPage';
import { useAppContext } from '../context/appContext';
const initialState = {
    name: "",
    email: "",
    password: "",
    isMember: false,
}
const AddUser = () => {
    const [values, setValues] = useState(initialState);
    const { isLoading, showAlert, displayAlert, addUser } = useAppContext()
    //global state and useNavigate
    const handleChange = (e) => { setValues({ ...values, [e.target.name]: e.target.value }) }
    const onSubmit = (e) => {
        e.preventDefault()
        const { name, email, password, isMember } = values
        if (!email || !password || (!isMember && !name)) {
            displayAlert()
            return
        }
        const currentUser = { name, email, password }
        if (isMember) {
            console.log('allready a member');
        } else {
            addUser(currentUser)
        }
        console.log(values)
    }
    return (<Wrapper className='full-page'>
        <form className='form' onSubmit={onSubmit}>
            <Logo />
            <h3>Add User</h3>
            {showAlert && <Alert />}
            <FormRow type="text" name="name" value={values.name} handleChange={handleChange} />
            <FormRow type="email" name="email" value={values.email} handleChange={handleChange} />
            <FormRow type="password" name="password" value={values.password} handleChange={handleChange} />
            <button type="submit" className='btn btn-block' diasabled={isLoading.toString()}>submit</button>
        </form>
    </Wrapper>);
}
export default AddUser;