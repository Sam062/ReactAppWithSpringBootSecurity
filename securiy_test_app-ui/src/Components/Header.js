import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, signout } from './Services/LoginService';

const columns = [
    {
        "header": "Dashboard",
        "url": "/dashboard",
        "roles": ["ADMIN", "USER", "REVIEWER"]
    },
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
        "roles": ["ADMIN"]
    },
    {
        "header": "Results",
        "url": "/rs",
        "roles": ["ADMIN", "USER", "REVIEWER"]
    },

]

function Header() {
    const user = getUser();
    const navigate = useNavigate();


    // console.log(user);
    return (
        <>
            {
                user && <div style={{ background: 'cadetblue', height: '50px' }}>
                    <span style={{ color: 'whitesmoke', padding: '1rem' }}>LogoHere</span>
                    {
                        columns.map((col, index) => {
                            return <span key={index + Math.random()}>
                                {
                                    col.roles.some(role => user.roles.some(r => r === role)) && <button onClick={() =>
                                        navigate(col.url)
                                    }
                                        style={{ marginLeft: '10px', marginTop: '9px', height: '2rem' }}>
                                        {col.header}
                                    </button>
                                }
                            </span>
                        })
                    }
                    <button onClick={() => {
                        signout();
                        navigate('/')
                    }}
                        style={{ float: 'right', marginRight: '10px', marginTop: '10px', height: '2rem' }}>
                        {user.name} logout
                    </button>

                </div>
            }
        </>
    )
}

export default Header