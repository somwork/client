import React, { Component } from "react";
import Layout from '../../components/Layout'
import worker from '../../api/worker';
import SmallSkill from "./SmallSkill";
import { Link } from 'react-router-dom';
import auth from '../../api/auth';

class Skills extends Component {
  state = {
    skills: []
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
    this.setState({ skills: await worker.getSkills(this.props.workerId) })
  }

  render() {
    let addSkill
    if (auth.id() === Number(this.props.workerId)) {
      addSkill =
        <Link to='/skills/create'>
          <button>Add skill</button>
        </Link>
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

export default Skills;
