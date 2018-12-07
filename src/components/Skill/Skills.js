import React, { Component } from "react";
import worker from '../../api/worker';
import SmallSkill from "./SmallSkill";
import auth from '../../api/auth';
import AddSkill from "./AddSkill";
import skill from "../../api/skill";

export default class Skills extends Component {
  state = {
    skills: [],
    showAddSkill: false,
    error: null
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
    await this.setState({ skills: await worker.getSkills(this.props.workerId) })
  }

  /**
   * Handle add skill event
   */
  handleAddSkill = () => {
    this.setState({ showAddSkill: !this.state.showAddSkill })
  }

  /**
  * Add a skill
  */
  addSkill = async (title, categoryId) => {
    const skills = [...this.state.skills]
    await skill.create({ title, categoryId })

    skills.push({ title, id: skills.length + 1 })

    this.setState({ skills })
  }

  /**
   * Creates the Skills list
   * @return {JSX} View
   */
  render() {
    let addSkill
    if (auth.id() === Number(this.props.workerId)) {
      addSkill =
        <div>
          <input type="submit" value="Add Skill" onClick={this.handleAddSkill} />
          {this.state.showAddSkill ?
            <AddSkill onAddSkill={this.addSkill} /> :
            null
          }
        </div>
    }
    return (
      <div>
        <h4>Skills</h4>
        {this.state.skills.map(s => (
          <SmallSkill
            key={s.id}
            skill={s}
          />
        ))}
        {addSkill}
      </div>
    )
  }
}
