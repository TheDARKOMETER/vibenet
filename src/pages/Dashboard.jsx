import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import HttpService from '../services/http-service'

export default function Dashboard() {
  const { currentUser } = useAuth()
  console.log("Current User: ", currentUser)
  return (
    <div>Dashboard</div>
  )
}
