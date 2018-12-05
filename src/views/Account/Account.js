import React, { Component } from 'react'
import Layout from '../../components/Layout'
import Alert from '../../components/Alert'
import { withRouter } from 'react-router-dom'
import auth from '../../api/auth';
import { Link } from 'react-router-dom';
import Skills from "../../components/Skill/Skills";
import user from "../../api/user";

export default withRouter(class Account extends Component {
  state = {
    id: (this.props.match.params.id),
    error: null
  }

  /**
  * Component setup
  */
  async componentDidMount() {
    await this.getUser()
  }

  /**
   * Get current authenticated user
   * @return {Promise}
   */
  getUser = async () => {
    if (this.state.id !== undefined) {
      await this.setState(await user.get(this.state.id))
    } else {
      await this.setState(await user.get(auth.id()))
    }
  }

  /**
   * REnder worker specific
   */
  workerSpecificRender() {
    if (this.state !== null && this.state.discriminator === 'Worker') {
      return (
        <Skills
          workerId={this.state.id}
        />
      );
    }
    return null
  }

  /**
   * Render edit profile button
   */
  editProfileButtonRender() {
    if (auth.id() === Number(this.state.id)) {
      return (
        <Link to='/change-account'>
          <button>Edit profile</button>
        </Link>
      );
    }
    return null;
  }

  /**
   * Creates the account view
   * @return {JSX} View
   */
  render() {
    return (
      <Layout>
        <section>
          {this.state.error && (
            <Alert>{this.state.error} </Alert>
          )}

          <h2>{this.state.firstName + " " + this.state.lastName} </h2>
          <h4>{this.state.username}</h4>
          <h4>{this.state.email}</h4>
          {this.editProfileButtonRender()}
          {this.workerSpecificRender()}

        </section>
      </Layout>
    )
  }
})
