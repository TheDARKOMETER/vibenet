import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import HttpService from '../services/http-service'
export default function MainLayout() {
  const { currentUser } = useAuth()
  const navigate = useNavigate()
  http.readCookie().then(res => {
    console.log(res)
  }).catch((err) => {
    console.error(err)
  })

  return (
    <>
      <div>MainLayout</div>
      <Outlet />
    </>
  )
}
