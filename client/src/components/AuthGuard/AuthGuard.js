import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const AuthGuard = ({ children, isAuthenticated }) => {
  const location = useLocation()

  if (!isAuthenticated) {
    // Redirect to login page and preserve the current location in state
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If authenticated, render the children (protected component)
  return children
}

export default AuthGuard