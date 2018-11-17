import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import Sidebar from '../Sidebar'
import auth from '../../api/auth'
import './Layout.css'

export default class Layout extends Component {
  whitelist = [
    '/login',
    '/sign-up',
  ]

  render () {
    if (!auth.ok() && !this.whitelist.includes(window.location.pathname)) {
      return <Redirect to="/login" />
    }

    return (
      <div className='layout'>
        <div className={!this.props.hideSideBar && 'view'}>
          {this.props.children}
        </div>
        {!this.props.hideSideBar && (
          <Sidebar/>
        )}
      </div>
    )
  }
}
