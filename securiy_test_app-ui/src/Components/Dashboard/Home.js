import React from 'react';
import { getUser } from '../Services/LoginService';

function Home() {
    const user = getUser();

    return (
        <div style={{textAlign: 'left'}}>
            <h1 style={{background: 'whitesmoke', width: '100%', padding: '1rem'}}>User Dashboard</h1>
            {
                user && user.token && <div style={{padding: '1rem'}}>
                    <p><strong>Name: </strong>{user.name}</p>
                    <p><strong>Email: </strong>{user.email}</p>
                    <p><strong>Roles: </strong>{user.roles}</p>
                    <p><strong>Token: </strong>{user.token}</p>
                </div>
            }
        </div>
    )
}

export default Home