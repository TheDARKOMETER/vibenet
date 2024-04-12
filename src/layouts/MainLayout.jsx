import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function MainLayout() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!currentUser) {
      navigate('/landing')
    }
  }, [])

  return (
    <>
      <div>MainLayout</div>
      <Outlet />
    </>
  )
}
