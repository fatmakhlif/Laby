
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedRoute, Error, Login } from '../src/pages';
import { AddUser, AllUsers, Profile, Stats, SharedLayout } from './pages/dashboard'


function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <SharedLayout />
          </ProtectedRoute>
        } >
          <Route index element={<Stats />}></Route>
          <Route path="add-user" element={<AddUser />}></Route>
          <Route path="all-users" element={<AllUsers />}></Route>
          <Route path="profile" element={<Profile />}></Route>
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
