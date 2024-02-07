import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';

function App() {
  return (
    <div className='bg-[#000814] w-full h-screen'>
      <Routes>
        <Route path='/' element={<Home /> } />
        <Route path='/signup' element={<Signup />} />
        <Route path='/verify-email' element={<VerifyEmail />} />
      </Routes>
    </div>
  );
}

export default App;
