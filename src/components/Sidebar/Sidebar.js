import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

class Sidebar extends Component {

  isActive(path){
    if (window.location.pathname !== path) {
      return ''
    }

    return 'active'
  }

  render() {
    return (
      <nav className="sidenav">
        <div className="sidebarTitle">
          <h2>Taskhouse.io</h2>
        </div>
        <div className="sidebarAvatar">
          <div className="circle"></div>
        </div>
        <div className="sidebarUsername">
          <p>Frederik Kvartborg</p>
        </div>
        <div className="sidebarMenu">
          <div className={["menuItem", this.isActive('/')].join(' ')}>
            <Link to='/'><li><i className="fas fa-tasks"></i>My projects</li></Link>
          </div>
          <div className={["menuItem", this.isActive('/second')].join(' ')}>
            <Link to='/second'><li><i className="fas fa-plus-square"></i>Create project</li></Link>
          </div>
        </div>
      </nav>
    );
  }
}


export default Sidebar;
