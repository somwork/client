import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';

export default () => (
  <Layout>
    <h1>Main View</h1>
    <Link to='/second'>Second view</Link>
  </Layout>

)
