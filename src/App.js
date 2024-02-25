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
import AddContent from './components/core/Dashboard/AddContent';
import Setting from './components/core/Dashboard/Settings';
import MyContent from './components/core/Dashboard/AddContent/MyContent';
import Overview from './components/core/Dashboard/AddContent/Overview';
import Videos from './pages/Videos';
import VideoDetails from './pages/VideoDetails';
import BuyedContent from './components/core/Dashboard/BuyedContent/BuyedContent';

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
          <Route path='/dashboard/add-content' element={<AddContent />} />
          <Route path='/dashboard/settings' element={<Setting />} />
          <Route path='/dashboard/my-content' element={<MyContent />} />
          <Route path='/dashboard/overview' element={<Overview />} />
          <Route path='/dashboard/buyed-content' element={<BuyedContent />} />          
        </Route>
        <Route path='/videos' element={<Videos />} />
        <Route path='/video/:videoId' element={<VideoDetails />}/>


        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
