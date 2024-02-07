import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import Login from './pages/Login';
import Navbar from './components/common/Navbar';

function App() {
  return (
    <div className='bg-[#000814] w-full h-screen'>
      <div className='absolute top-0 z-50'>
        <Navbar />
      </div>
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
      </Routes>
    </div>
  );
}

export default App;
