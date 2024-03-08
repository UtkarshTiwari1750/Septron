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
import WatchVideo from './pages/WatchVideo';
import gsap from 'gsap';
import { useEffect, useRef } from 'react';

function App() {
  const comp = useRef(null);
  
  useEffect(() => {
    let ctx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.from('#logo', {
        scale: "0",
        duration: 1.3,
        delay: 0.3,
        opacity: 100
      })
      .from('#contain', {
        opacity: '100',
      })
      .to('#logo', {
        scale: '10',
        duration: 1.3,
        opacity: 0,
        display: 'none'
      })
      .to("#contain", {
        opacity: 0,
        display: 'none'
      })
      
    }, comp)
    return () => ctx.revert()
  }, [])


  return (
    <div className='bg-[#000814] w-full h-screen' ref={comp}>

    <div id='contain' className='flex overflow-hidden justify-center absolute z-30  w-full h-full backdrop-blur-md rounded-lg px-2 py-2 shadow-lg ring-1 ring-black/5 bg-black/40 isolate'>
      <img 
        id='logo'
        src='https://firebasestorage.googleapis.com/v0/b/septron-909d2.appspot.com/o/Septron%2Flogo-white-transparent.png?alt=media&token=964bf6a7-a22e-4ebe-bf85-5344e419710a' 
        alt="" 
        className='z-40 w-52 object-contain  backdrop:blur-3xl'
      />
    </div>

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
        <Route path='/view-content/:contentId/:sectionId/:subSectionId' element={<WatchVideo />} />         


        <Route path='*' element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
