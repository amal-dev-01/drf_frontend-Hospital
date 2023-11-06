import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Loginpage from './pages/Loginpage';
import { AuthProvider } from './context/AuthContext';
import UpdateProfile from './pages/UpdateProfile';
import Register from './pages/Register';
import AdminHomePage from './pages/AdminHomePage';
import BlockUser from './pages/BlockUser';
import PrivateRouter from './utils/PrivateRouter';
// import PrivateRouter from './utils/PrivateRouter'; // Use PrivateRoute, not PrivateRouter

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <Routes>
          {/* <PrivateRouter path="/" element={<Homepage />} /> */}
          <Route path="/home" element={<PrivateRouter><Homepage /></PrivateRouter>} />
          <Route path="/" element={<Loginpage />} />
          <Route path="/editprofile" element={<UpdateProfile />} />
          <Route path='/register' element={<Register/>}/>
          <Route path='/admin' element={<AdminHomePage/>}/>
          <Route path='/block/:id' element={<BlockUser/>}/>

        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
