import SignsNav from '@/components/static-signs/signs_nav'
import React from 'react'
import { Outlet } from 'react-router'

const StaticSigns = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cosmic-dark via-red-900/20 to-cosmic-dark">
        <SignsNav />
        <Outlet />
    </div>
  )
}

export default StaticSigns