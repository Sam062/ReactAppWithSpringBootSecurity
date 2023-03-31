import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { getUser } from '../Services/LoginService';
import { getUserBoard } from '../Services/UserService';

function Users() {
  const user = getUser();
  const [showUserContent, setShowUserContent] = useState(false);
  const [error, setError] = useState('');

  const [rows, setRows] = useState([]);

  const navigate = useNavigate();



  useEffect(() => {
    if (user && user.roles.some(role => role === 'ADMIN' || role === 'USER')) {
      setError('')
      getUserBoard().then(resp => {
        console.log('getUserBoard response', resp);
        setShowUserContent(true);
        setRows(resp.data);
      }).catch(err => {
        setShowUserContent(false);
        setError(err.message)
        console.log('error catched while getUserBoard', err);
      })
    } else {
      setError('FORBIDDEN');
    }
  }, [])
  return (
    <>
      {
        showUserContent === true ? <>
          <h1>Test Set component</h1>
          <table border='1' style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>User ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Roles</th>
                {
                  user && user.roles.includes('ADMIN') && <th>Operations</th>
                }
              </tr>
            </thead>
            <tbody>

              {
                rows && rows.length > 0 ? rows.map((row, index) => {
                  return <tr key={index + Math.random()}>
                    <td>{index + 1}</td>
                    <td>{row.userId}</td>
                    <td>{row.name}</td>
                    <td>{row.email}</td>
                    <td>{row.roles.map(role => role.name)}</td>
                    {
                      user && user.roles.includes('ADMIN') && <td>
                        <span style={{ color: 'green' }}>EDIT</span> |
                        <span style={{ color: 'tomato' }}> DELETE</span>
                      </td>
                    }
                  </tr>
                }) :
                  <tr>
                    <td>No Rows Found</td>
                  </tr>
              }
            </tbody>
          </table>
        </>
          :
          <>
            {
              error && <h2>{error} <button onClick={() => navigate("/")}>Back to Login</button></h2>
            }
          </>
      }
    </>
  )
}

export default Users