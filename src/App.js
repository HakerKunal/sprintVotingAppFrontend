import './App.css';
import Dashboard from './pages/Dashboard/DashBoard';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import SignIn from './pages/signin/SignIn';
import Signup from './pages/signup/Signup';
import Vote from './pages/VotePage/Vote';
import Result from './pages/Result/Result';
import Admin from './pages/Admin Page/Admin';

function App() {
  return (
    <div className="App">
       <Routes>
        <Route path="/" element={ <Navigate to="/signin"/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<Signup />}/>
        <Route path="vote" element={<Vote />}/>
        <Route path="result" element={<Result />}/>
        <Route path="admin" element={<Admin />} />
          
      </Routes>
    </div>
  );
}

export default App;
