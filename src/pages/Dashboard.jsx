import React, { useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function Dashboard() {
  const { currentUser } = useAuth()

  return (
    <div>Dashboard</div>
  )
}
