import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default () => (
  <Layout>
    <section>
      <h1>Main View</h1>
      <p><Link to='/second'>Second view</Link></p>
      <p><Link to='/sign-up'>Sing up</Link></p>
    </section>
  </Layout>

)
