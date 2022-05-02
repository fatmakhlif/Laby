
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, Landing, Error, Login,AddUser } from '../src/pages';



function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/add-user' element={<AddUser />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
