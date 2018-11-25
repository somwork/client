import React, { Component } from "react";
import Layout from '../../components/Layout'

class SmallSkill extends Component {
  render() {
    return (
      <div>
        <p>SmallSkill</p>
        <p>{this.props.skill.title}</p>
        <hr />
      </div>
    );
  }
}

export default SmallSkill;
