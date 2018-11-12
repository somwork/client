import React from 'react'
import Layout from '../../components/Layout'
import task from '../../api/task'
import worker from '../../api/worker'

export default ({ children }) => (
  <Layout>
    <h2>Create Task</h2>
    <label>
      Title
      <input type="text" />
    </label>
    <label>
      Starting Date
      <input type="date" />
    </label>
    <label>
      Deadline
      <input type="date" />
    </label>
    <label>
      Description
      <textarea></textarea>
    </label>
    <label>
      Urgency
      <input type="text" />
    </label>
    <input type="submit" value="Create Task" onClick={worker.create()} />
  </Layout>
)
