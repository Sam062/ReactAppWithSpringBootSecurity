import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Store } from '../../App';
import { signin } from '../Services/LoginService';

function Signin() {
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const [email, setEmail] = useState('');

  const [loginError, setLoginError] = useState(false);

  const navigate = useNavigate();
  const { setJwtResponse } = React.useContext(Store);


  const handleSubmit = (e) => {
    e.preventDefault();
    signin({ username, password, email }).then(response => {
      console.log('login success', response);
      if (response.status === 200 && response.data.token) {
        setJwtResponse(response.data)
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/dashboard');
      } else {
        setLoginError(true);
      }
    }).catch(err => {
      setLoginError(true);
      console.log('error catched while signin', err);
    })
  }

  return (
    <div className='App'
    // style={{ marginTop: '15%', marginLeft: '35%' }}
    >
      <br />
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' value={username} onChange={e => { setLoginError(false); setUsername(e.target.value) }}
          required placeholder='Username' /> <br />

        <input type='email' value={email} onChange={e => { setLoginError(false); setEmail(e.target.value) }}
          required placeholder='Email' /> <br />

        <input type='password' value={password} onChange={e => { setLoginError(false); setpassword(e.target.value) }}
          required placeholder='Password' /><br />

        <div >
          <button style={{ background: 'cadetblue', color: 'whitesmoke' }}>Login</button>
          <button style={{ background: 'tomato', marginLeft: '4.5rem', color: 'whitesmoke' }} onClick={(e) => {
            e.preventDefault();
            setEmail('');
            setpassword('');
            setUsername('');
          }} disabled={username.trim().length === 0 && password.trim().length === 0 && email.trim().length === 0}>Reset</button>
        </div>
      </form>
      {
        loginError === true && <div>
          <h4>Login failed</h4>
        </div>
      }

      <button onClick={() => navigate('/signup')}>Signup</button>
    </div>
  )
}

export default Signin