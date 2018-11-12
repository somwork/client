import React from 'react'
import './Layout.css'
import Sidebar from '../Sidebar'

export default ({ children }) => (
  <div className='layout'>
    {children}
    <Sidebar/>
  </div>
)
