import React, {Component} from 'react'
import Layout from '../../components/Layout'
import task from '../../api/task'

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
      <input type="date" min={this.getCurrentDateString()}/>
        </label>
        <label>
          Deadline
      <input type="date"  />
        </label>
        <label>
          Description
      <textarea></textarea>
        </label>
        <label>
          Urgency
      <input type="text" />
        </label>
        <input type="submit" value="Create Task"  onClick={this.createTaskOnClick}/>
      </Layout>
    )
  }
}
