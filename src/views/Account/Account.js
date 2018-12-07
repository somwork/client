import React, { Component } from 'react'
import Layout from '../../components/Layout'
import { withRouter } from 'react-router-dom'
import auth from '../../api/auth';
import { Link } from 'react-router-dom';
import Skills from "../../components/Skill/Skills";
import user from "../../api/user";

export default withRouter(class Account extends Component {
  state = {
    firstName: null,
    lastName: null,
    username: null,
    email: null,
    error: null,
    country: null,
    primaryLine: null,
    zipCode: null
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
    const id = this.props.match.params.id
    try {
      if (id !== undefined) {
        await this.setState(await user.get(id))
        await this.setState(await user.getLocation(id))
      } else {
        await this.setState(await user.get(auth.id()))
        await this.setState(await user.getLocation(auth.id()))
      }
    } catch (e) {
      this.setState({ error: "Account not found" })
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

  renderNotFound() {
    return (
      <Layout>
        <section>
          <h2>{this.state.error}</h2>
        </section>
      </Layout>
    );
  }

  /**
   * Creates the account view
   * @return {JSX} View
   */
  render() {
    if (!!this.state.error) {
      return this.renderNotFound()
    }

    return (
      <Layout>
        <section>
          <h1>Your account</h1>
          <div className="account-information">
            <div className="half">
              <span><b>Firstname:</b> {this.state.firstName}</span>
              <span><b>Lastname:</b> {this.state.lastName}</span>
              <span><b>Username:</b> {this.state.username}</span>
              <span><b>Email:</b> {this.state.email}</span>
            </div>
            <div className="half">
              <span><b>Country:</b> {this.state.country}</span>
              <span><b>City:</b> {this.state.city}</span>
              <span><b>Primary Adress:</b> {this.state.primaryLine}</span>
              <span><b>Zip Code:</b> {this.state.zipCode}</span>
            </div>
          </div>
          {this.editProfileButtonRender()}
          {this.workerSpecificRender()}

        </section>
      </Layout>
    )
  }
})
