
import {BrowserRouter , Routes , Route } from 'react-router-dom';
import {ProtectedRoute,Landing,Error,Register} from './pages';
import  {AddResearcher,
  AllResearchers,
  Stats,
  Profile,
  SharedLayout
} from './pages/dashboard'



function App() {
  return (
     
      <BrowserRouter> 
        <Routes>

          <Route path='/'  element=
          {<ProtectedRoute>
             <SharedLayout />
           </ProtectedRoute>} >

          <Route index element={<Stats />} />
          <Route path='all-researchers' element={<AllResearchers />}></Route>
          <Route path='add-researcher' element={<AddResearcher />}></Route>
          <Route path='/profile' element={<Profile />}></Route>

          </Route>

          <Route path='/login' element={<Register/>}/>
          <Route path='/landing' element={<Landing/>}/>
          <Route path='*' element={<Error/>}/>

         
        
        </Routes>

      </BrowserRouter>
      
    
  );
}

export default App;
