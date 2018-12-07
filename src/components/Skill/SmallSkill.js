import React, { Component } from "react";

export default class SmallSkill extends Component {
  render() {
    return (
      <div className="half">
        <p>{this.props.skill.title}</p>
        <hr align="left" width="50%"/>
      </div>
    );
  }
}
