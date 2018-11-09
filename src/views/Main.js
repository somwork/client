import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout'

export default () => (
  <Layout>
    <section>
      <h1>Main View</h1>
      <Link to='/second'>Second view</Link>

      <Link to='/Signup/SignUp'>Sing up</Link>
    </section>
  </Layout>
)
