import React, { Component } from 'react'
import Layout from '../../components/Layout'
import task from '../../api/task'
import DatePicker from '../../components/DatePicker'
import moment from 'moment'

export default class Create extends Component {

  //auth.login("username", "password")

  state = {
    startDate: moment(),
    endDate: moment(),
    title: null, //assigned null to get proper validation from Superstruckt
    description: null, //assigned null to get proper validation from Superstruckt
    urgency: null //assigned null to get proper validation from Superstruckt
  }


  /**
   * Creates task based on data in inputfields
   */
  createTaskOnClick = () => {
    try {
      const taskData = {
        title: this.state.title,
        description: this.state.description,
        urgency: this.state.urgency,
        startDate: this.state.startDate.toDate(), //toDate() to convert moment()-date to standard JS, due to Superstruckt limitations
        endDate: this.state.endDate.toDate() //toDate() to convert moment()-date to standard JS, due to Superstruckt limitations
      }
      task.validateInput(taskData)
      task.create(taskData)
      //Redirect to employers task-overview
    }
    catch (e) {
      console.log(e)
      if (e.message === 'task_title_required' || e.message === 'task_title_invalid') { // Title is either undefined or invalid
        alert('Title must be filled out')
        return

      }
      //if (e.message === 'task_startDate_required' || e.message === 'task_startDate_invalid') { //
      //  alert('error with date')
      //  return

      // }
      if (e.message === 'task_description_required' || e.message === 'task_description_invalid') { // Description is either undefined or invalid
        alert('Description must be filled out')
        return

      }
      if (e.message === 'task_urgency_required' || e.message === 'task_urgency_invalid') { // Urgency is either undefined or invalid
        alert('Urgency must be filled out')
        return
      }
    }
  }

  /**
   * Sets the selected  date
   * @param {Date} date
   */
  updateStartDate = (date) => {
    this.setState({ startDate: date })
  }

  /**
   * Sets selected date of deadline
   * @param {Date} date
   */
  updateEndDate = (date) => {
    this.setState({ endDate: date })

  }

  /**
   * Sets state data when changes are made in text-inputs
   * @param {Event} event
   */
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })

  }

  render() {
    return (
      <Layout>
        <h2>Create Task</h2>
        <label>
          Title
          <input type="text" onChange={this.handleChange} name="title" />
        </label>
        <label>
          Starting Date
          <DatePicker onChange={this.updateStartDate} minDate={moment()} selected={this.state.startDate} />
        </label>
        <label>
          Deadline
          <DatePicker onChange={this.updateEndDate} minDate={this.state.startDate} selected={this.state.endDate} />
        </label>
        <label>
          Description
          <textarea onChange={this.handleChange} name="description"></textarea>
        </label>
        <label>
          Urgency
          <input type="text" onChange={this.handleChange} name="urgency" />
        </label>
        <input type="submit" value="Create Task" onClick={this.createTaskOnClick} />
      </Layout>
    )
  }
}
