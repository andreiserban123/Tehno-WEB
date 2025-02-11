import './Dashboard.css'
import React, { useContext } from 'react'

import AppContext from '../../state/AppContext'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const globalState = useContext(AppContext)

  return (
    <div className='dashboard'>
      <h1>Dashboard for {globalState.user.data.type}</h1>
      {
        globalState.user.data.type === 'admin' && (
          <div>
            TODO
          </div>
        )
      }
      {
        globalState.user.data.type === 'regular' && (
          <div>
            <Link to='/projects'>Projects</Link>
          </div>
        )
      }
    </div>
  )
}

export default Dashboard