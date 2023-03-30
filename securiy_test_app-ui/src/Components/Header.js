import React from 'react';
import { useNavigate } from 'react-router-dom';

const columns = [
    {
        "header": "Users",
        "url": "/users",
        "roles": ["ADMIN", "USER"]
    },
    {
        "header": "Assessments",
        "url": "/assessments",
        "roles": ["ADMIN", "USER", "REVIEWER"]
    },
    {
        "header": "Test Set",
        "url": "/ts",
        "roles": ["ADMIN", "USER", "REVIEWER"]
    },
    {
        "header": "Results",
        "url": "/rs",
        "roles": ["ADMIN", "USER", "REVIEWER"]
    },

]

function Header({ jwtResponse, setJwtResponse }) {
    const roles = jwtResponse && jwtResponse.roles;

    const navigate = useNavigate();

    return (
        <div style={jwtResponse && { background: 'cadetblue', height: '30px' }}>
            {
                jwtResponse &&
                columns.map((col, index) => {
                    return <button onClick={() => navigate(col.url)} key={index + Math.random()}
                        style={{ marginLeft: '10px', marginTop: '3px' }}>
                        {col.header}
                    </button>
                })
            }
            <button onClick={() => { setJwtResponse(null); navigate('/') }}
                style={{ float: 'right', marginRight: '10px', marginTop: '3px' }}>
                {jwtResponse.name} logout
            </button>

        </div>
    )
}

export default Header