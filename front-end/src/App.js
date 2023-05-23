// import logo from './logo.svg';
import './App.css';
import Main from "./component/Main";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
// import NavBar from './component/Main/NavBar';
import Home from './component/Main/Home';
import Login from './component/Main/Login';
import Signup from './component/Main/Signup';
import Admin from './component/Admin';
import AdminDashbord from './component/Admin/AdminDashbord';
import AdminProfile from './component/Admin/AdminProfile';
import User from './component/User';
import ImageModelTrainer from './component/User/ImageModelTrainer';

function App() {
  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Navigate to="/main/" />} />
          <Route path='main' element={<Main />}>
            <Route path='home' element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='signup' element={<Signup />} />
          </Route>
          <Route path='admin' element={<Admin />} >
            <Route path='adminDashbord' element={<AdminDashbord />} />
            <Route path='adminDashbord' element={<AdminProfile />} />
          </Route>
          <Route path='user' element={<User />} >
            <Route path='imageModelTrainer' element={<ImageModelTrainer />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
