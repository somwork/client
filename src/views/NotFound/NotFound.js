import React, { Component } from "react"
import Layout from '../../components/Layout'

export default class NotFound extends Component {
  /**
   * Render login view
   * @return {JSX}
   */
  render() {
    return (
      <Layout>
        <section>
          <h2>Not Found</h2>
          <img className="center-image" alt="" src={'/img/help.gif'} />
        </section>
      </Layout>
    )
  }
}
