import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../Services/LoginService';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setpassword] = useState('');
    const [email, setEmail] = useState('');
    const [roles, setRoles] = useState('');

    const [status, setStatus] = useState(false);


    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, username, password, roles: [roles] });
        signup({ email, username, password, roles: [roles] }).then(response => {
            console.log('sign up success', response);
            setStatus(true);
        }).catch(err => {
            console.log('error catched while signup', err);
        })
    }

    return (
        <div className='App'
        // style={{ marginTop: '15%', marginLeft: '35%' }}
        >
            <br />
            <h2>Sign up</h2>
            <form onSubmit={handleSubmit}>
                <input type='text' value={username} onChange={e => { setStatus(false); setUsername(e.target.value) }}
                    required placeholder='Username' /> <br />

                <input type='email' value={email} onChange={e => { setStatus(false); setEmail(e.target.value) }}
                    required placeholder='Email' /> <br />

                <input type='password' value={password} onChange={e => { setStatus(false); setpassword(e.target.value) }}
                    required placeholder='Password' /><br />
                <select required defaultValue={'USER'}
                    onChange={(e) => { setStatus(false); setRoles(e.target.value) }}>
                    <option value={'ADMIN'}>ADMIN</option>
                    <option value={'USER'}>USER</option>
                    <option value={'REVIEWER'}>REVIEWER</option>
                </select>

                <div >
                    <button style={{ background: 'cadetblue', color: 'whitesmoke' }}>Sign up</button>
                    <button style={{ background: 'tomato', marginLeft: '3.5rem', color: 'whitesmoke' }} onClick={(e) => {
                        e.preventDefault();
                        setEmail('');
                        setpassword('');
                        setUsername('');
                    }} disabled={username.trim().length === 0 && password.trim().length === 0 && email.trim().length === 0}>Reset</button>
                </div>
            </form>
            {
                status === true && <div>
                    <h5>Account created successfully</h5>
                </div>
            }

            <button onClick={() => navigate('/')}>back to sign in</button>
        </div>
    )
}

export default Signup