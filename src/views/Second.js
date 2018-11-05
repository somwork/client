import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout'

export default () => (
  <Layout>
    <section>
      <h1>Second View</h1>
      <Link to='/'>Main view</Link>
    </section>
  </Layout>
)
