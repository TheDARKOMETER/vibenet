import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import HttpService from '../services/http-service'
import './mainlayout.css'
export default function MainLayout() {
  const { currentUser, setCurrentUser } = useAuth()
  const http = new HttpService()

  return (
    <>
      <div>MainLayout</div>
      <Outlet />
    </>
  )
}
