
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, Error, Login } from '../src/pages';
import { AddLab, AllLabs, Profile, SharedLayout } from './pages/dashboard'


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        } >
          <Route index element={<AllLabs />}></Route>
          <Route path="add-lab" element={<AddLab/>} ></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
