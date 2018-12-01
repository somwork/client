import React, { Component } from "react";
import worker from '../../api/worker';
import SmallSkill from "./SmallSkill";
import auth from '../../api/auth';
import AddSkill from "./AddSkill";

export default class Skills extends Component {
  state = {
    skills: [],
    showAddSkill: false
  }

  /**
  * Component setup
  */
  async componentDidMount() {
    await this.getSkills()
  }

  /**
   * Get current authenticated user
   * @return {Promise}
   */
  getSkills = async () => {
    console.log("getSkills " + this.props.workerId)
    await this.setState({ skills: await worker.getWorkerSkills(this.props.workerId) })
    console.log("getSkillsEND")
  }

  handleAddSkill = () => {
    console.log("handleAddSkill")
    this.setState({ showAddSkill: !this.state.showAddSkill })
  }

  render() {
    console.log("render")
    let addSkill
    if (auth.id() === Number(this.props.workerId)) {
      addSkill =
        <div>
          <input type="submit" value="Add Skill" onClick={this.handleAddSkill} />
          {this.state.showAddSkill ? <AddSkill /> : null}
        </div>
    }
    return (
      <div>
        <h4>Skills</h4>
        {addSkill}
        {this.state.skills.map(s => (
          <SmallSkill
            key={s.id}
            skill={s}
          />
        ))}
      </div>
    )
  }
}
