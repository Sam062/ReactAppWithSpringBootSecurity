import React, { useContext } from 'react';
import { Store } from '../../App';

function Home() {
    const { jwtResponse } = useContext(Store);

    // console.log('JWT RESPONSE IN Home page ', jwtResponse);
    return (
        <div>
            <h1>Dashboard</h1>
        </div>
    )
}

export default Home