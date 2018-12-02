import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import auth from '../../api/auth';

class Sidebar extends Component {
  /**
   * State for the sidebar
   * @type {Object}
   */
  state = {
    user: {
      firstName: ""
    }
  }

  /**
   * Workers list of menu items
   * @type {Array}
   */
  worker = [
    ["Dashboard", "/", "fas fa-tachometer-alt"],
    ["My Tasks", "/task/list", "fas fa-tasks"],
    ["Account", "/account", "fas fa-user"],
    ["Logout", "/logout", "fas fa-lock"]
  ]

  /**
   * Employers list of menu items
   * @type {Array}
   */
  employer = [
    ["Dashboard", "/", "fas fa-tachometer-alt"],
    ["Tasks", "/task/list", "fas fa-tasks"],
    ["Create Task", "/task/create", "fas fa-plus-square"],
    ["Account", "/account", "fas fa-user"],
    ["Logout", "/logout", "fas fa-lock"]
  ]

  /**
   * QualityAssurance list of menu items
   * @type {Array}
   */
  qualityassurance = [
    ["Dashboard", "/", "fas fa-tachometer-alt"],
    ["All Tasks", "/task/list", "fas fa-tasks"],
    ["Logout", "/logout", "fas fa-lock"]
  ]

  /**
   * Check if path is equal to current window path
   * @param  {String}  path
   * @return {String}
   */
  isActive(path) {
    if (window.location.pathname !== path) {
      return '';
    }

    return 'active';
  }

  /**
   * Component setup
   */
  componentDidMount() {
    this.getUser()
  }

  /**
   * Get current authenticated user
   * @return {Promise}
   */
  getUser = async () => {
    this.setState({ user: await auth.user() })
  }

  /**
   * Render sidebar
   * @return {JSX}
   */
  render() {
    return (
      <nav className="sidebar">
        <div className="sidebarTitle">
          <h2>Taskhouse.io</h2>
        </div>
        <div className="sidebarAvatar">
          <div className="circle"></div>
        </div>
        <div className="sidebarUsername">
          <p>{this.state.user.firstName}</p>
        </div>
        <div className="sidebarMenu">
          {this[auth.type()].map(this.renderMenuItem)}
        </div>
      </nav>
    );
  }

  /**
   * Render menu item
   * @param  {Array}
   * @return {JSX}
   */
  renderMenuItem = ([title, path, className]) => (
    <div key={title} className={["menuItem", this.isActive(path)].join(' ')}>
      <Link to={path}><li><i className={className}></i>{title}</li></Link>
    </div>
  )
}

export default Sidebar;
