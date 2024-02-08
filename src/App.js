import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Login from './pages/Login';
import Navbar from './components/common/Navbar';
import Error from './pages/Error';
import Dashboard from './pages/Dashboard';
import MyProfile from './components/core/Dashboard/MyProfile';

function App() {
  return (
    <div className='bg-[#000814] w-full h-screen'>
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route element={<Dashboard />}>
          <Route path='/dashboard/my-profile' element={<MyProfile />}/>
        </Route>


        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
