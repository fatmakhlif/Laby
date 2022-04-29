
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard, Landing, Error, Login } from '../src/pages';



function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/login' element={<Login />} />
        <Route path='/landing' element={<Landing />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
