import {useState } from 'react';
import {Logo,FormRow,Alert} from '../components';
import  Wrapper from '../assets/wrappers/RegisterPage';
import  {useAppContext} from '../context/appContext';
const initialState ={
    name:"",
    email:"",
    password:"",
    isMember:true,
    

}
const  Login = () =>{
    const [values,setValues] = useState(initialState);
    const {isLoading, showAlert,displayAlert} = useAppContext()
    //global state and useNavigate
    const handleChange =(e) => { setValues({...values,[e.target.name]: e.target.value})}
    const onSubmit = (e)=>{
        e.preventDefault()
        const {name,email,password,isMember} = values 
        if (!email || !password || (!isMember && !name)){
           displayAlert()
           return 
        }
        console.log(values)

        
    }
    return (<Wrapper className='full-page'>
         <form className='form' onSubmit={onSubmit}>
             <Logo/>
             <h3>Login</h3>
             { showAlert && <Alert/> }
             <FormRow type="text" name="name" value={values.name} handleChange={handleChange}  />
             <FormRow type="email" name="email" value={values.email} handleChange={handleChange}  />
             <FormRow type="password" name="password" value={values.password} handleChange={handleChange}  />
             <button type="submit" className='btn btn-block'>submit</button>



             

         </form>
         </Wrapper>  );
}

export default Login;