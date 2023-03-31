import React, { useEffect, useState } from 'react'
import { getUser } from '../Services/LoginService';
import { results } from '../Services/UserService';

function Result() {
  const user = getUser();
  const [showResultContent, setShowResultContent] = useState(false);
  const [error, setError] = useState('');

  const [rows, setRows] = useState([]);



  useEffect(() => {
    if (user && user.roles.some(role => role => role === 'ADMIN' || role === 'USER' || role === 'REVIEWER')) {
      setError('')
      results().then(resp => {
        console.log('results response', resp);
        setShowResultContent(true);
        setRows(resp.data);
      }).catch(err => {
        setShowResultContent(false);
        setError(err.message)
        console.log('error catched while results', err);
      })
    } else {
      setError('FORBIDDEN');
    }
  }, [])
  return (
    <>
      {
        showResultContent === true ? <>
          <h1>Result component</h1>
          <table border='1' style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>S.No.</th>
                <th>Name</th>
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
                    <td>{row}</td>
                    {
                      user && user.roles.includes('ADMIN') && <td>
                        {
                          <>
                            <span style={{ color: 'green' }}>EDIT</span> |
                            <span style={{ color: 'tomato' }}> DELETE</span>
                          </>
                        }
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
              error && <h2>{error}</h2>
            }
          </>
      }
    </>
  )
}

export default Result