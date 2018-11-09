import React from 'react'
import Layout from '../../components/Layout'

export default ({ children }) => (

  <Layout>
    <label>
      Task Title
      <input type="text" />
    </label>
    <label>
      Starting Date of Task
      <input type="date" />
    </label>
    <label>
      Task Deadline
      <input type="date" />
    </label>
    <label>
      Task Description
      <input type="text" />
    </label>
    <label>
      Urgency
      <input type="text" />
    </label>
    <input type="submit" />


  </Layout>
)
