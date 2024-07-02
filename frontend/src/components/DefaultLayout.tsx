import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/AuthProvider'

export default function DefaultLayout() {
  const {token, user} = useStateContext();
  if(!token) {
    return <Navigate to={'login'} />
  }

  const logout = () => {
    // localStorage.removeItem('ACCESS_TOKEN');
  }

  return (
    <div id='default-layout'>
      <div>
          <div className='content'>
            <header>
              <div>header</div>
              <div>User Info {user?.name}</div>
              <a href="#" className='btn-logout' onClick={logout}>Logout</a>
            </header>
          </div>
          <main>
            <Outlet/>
          </main>
      </div>
    </div>
  )
}
