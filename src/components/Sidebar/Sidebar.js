import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';

class Sidebar extends Component {

  /**
  * Array for the menu items
  * @param  {Array}
  */
  items = [
    ["My projects", "/", "fas fa-tasks"],
    ["Create Project", "/task/create", "fas fa-plus-square"]
  ]

  isActive(path){
    if (window.location.pathname !== path) {
      return '';
    }

    return 'active';
  }

  renderItem = ([title, path, className]) => {
      return (
        <div key={title} className={["menuItem", this.isActive(path)].join(' ')}>
          <Link to={path}><li><i className={className}></i>{title}</li></Link>
        </div>
      );
  }

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
          <p>Frederik Kvartborg</p>
        </div>
        <div className="sidebarMenu">
          {this.items.map(this.renderItem)}
        </div>
      </nav>
    );
  }
}


export default Sidebar;
