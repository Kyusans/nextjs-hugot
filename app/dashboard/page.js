import React from 'react'
import Dashboard from './Dashboard'
import NavigationBar from '../NavigationBar'

function page() {
  return (
    <>
      <header>
        <NavigationBar />
      </header>
      <Dashboard />
    </>
  )
}

export default page