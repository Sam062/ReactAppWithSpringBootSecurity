import { createContext, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signin from '../src/Components/Login/Signin';
import './App.css';
import Assessments from './Components/Dashboard/Assessments';
import Home from './Components/Dashboard/Home';
import Result from './Components/Dashboard/Result';
import TestSet from './Components/Dashboard/TestSet';
import Users from './Components/Dashboard/Users';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Signup from './Components/Login/Signup';
import { getUser } from './Components/Services/LoginService';

export const Store = createContext();

function App() {
  const [jwtResponse, setJwtResponse] = useState(null);

  window.onbeforeunload = (event) => {
    event.preventDefault();
    return;
  }

  const user = getUser();

  return (
    <div className='App'>
      <Store.Provider value={{ jwtResponse, setJwtResponse }}>
        <BrowserRouter>
          {
            user && user.token && <Header jwtResponse={jwtResponse} setJwtResponse={setJwtResponse} />
          }
          <Routes>
            <Route exact path="/" element={<Signin />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/dashboard" element={<Home />} />
            <Route exact path="/users" element={<Users />} />
            <Route exact path="/assessments" element={<Assessments />} />
            <Route exact path="/ts" element={<TestSet />} />
            <Route exact path="/rs" element={<Result />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </Store.Provider>
    </div>
  );
}

export default App;
