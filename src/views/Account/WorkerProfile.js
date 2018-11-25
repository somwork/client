import React, { Component } from 'react'
import Layout from '../../components/Layout'
import Alert from '../../components/Alert'
import { withRouter } from 'react-router-dom'
import worker from '../../api/worker';
import auth from '../../api/auth';
import { Link } from 'react-router-dom';
import Skills from "../../components/Skill/Skills";

export default withRouter(class WorkerProfile extends Component {
  constructor(props) {
    super(props);

    this.state.id = (this.props.match.params.id);
  };

  state = {
    firstName: "",
    lastName: '',
    email: '',
    username: '',
    id: 0,
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
    const userData = await worker.get(this.state.id)
    this.setState({
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      username: userData.username,
    })
  }

  render() {
    let editProfileButton
    if (auth.id() === Number(this.state.id)) {
      editProfileButton =
        <Link to='/account'>
          <button>Edit profile</button>
        </Link>
    }

    return (
      <Layout>
        <section>
          {this.state.error && (
            <Alert>{this.state.error} </Alert>
          )}

          <h2>{this.state.firstName + " " + this.state.lastName} </h2>
          <h4>{this.state.username}</h4>
          <h4>{this.state.email}</h4>
          {editProfileButton}

          <Skills
            workerId={this.state.id}
          />

        </section>
      </Layout>
    )
  }
})
