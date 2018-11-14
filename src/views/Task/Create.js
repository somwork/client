import React, { Component } from 'react'
import Layout from '../../components/Layout'
import task from '../../api/task'
import DatePicker from '../../components/DatePicker'

export default class Create extends Component {

  createTaskOnClick = () => {
    // validateInput()
    this.getCurrentDateString()
  }

  validateInput() {

  }

  getCurrentDateString = () => {
    const date = new Date()

    const year = date.getFullYear().toString()
    const dash = "-"
    const month = (date.getMonth() + 1).toString()
    const day = date.getDate().toString()

    let dateString = year.concat(dash, month, dash, day)

    console.log(dateString)

    return dateString
  }

  render() {
    return (
      <Layout>
        <h2>Create Task</h2>
        <label>
          Title
      <input type="text" />
        </label>
        <label>
          Starting Date
      <DatePicker />
        </label>
        <label>
          Deadline
      <DatePicker />
        </label>
        <label>
          Description
      <textarea></textarea>
        </label>
        <label>
          Urgency
      <input type="text" />
        </label>
        <input type="submit" value="Create Task" onClick={this.createTaskOnClick} />
      </Layout>
    )
  }
}
