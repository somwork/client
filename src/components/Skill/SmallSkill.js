import React, { Component } from "react";

export default class SmallSkill extends Component {
  render() {
    return (
      <div>
        <p>{this.props.skill.title}</p>
        <hr />
      </div>
    );
  }
}
