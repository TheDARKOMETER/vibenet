import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import HttpService from '../services/http-service'
import './mainlayout.css'
import Navbarmain from '../components/navbarmain/navbarmain'
import { CreatePost } from '../components'

export default function MainLayout() {
  const { currentUser, setCurrentUser } = useAuth()
  const http = new HttpService()
  return (
    <>
      <Navbarmain />
      <Outlet />
    </>
  )
}
