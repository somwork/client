import React, { Component } from 'react'
import Layout from '../../components/Layout'
import task from '../../api/task'
import DatePicker from '../../components/DatePicker'
import moment from 'moment'
import Alert from '../../components/Alert'
import camelcase from 'camelcase'

export default class Create extends Component {

  //auth.login("username", "password")

  state = {
    startDate: moment(),
    endDate: moment(),
    title: "",
    description: "",
    urgency: "",
    error: null
  }

  fields = [
    //["label", "Type", Validation method]
    ["Title", "text", v => v.length > 0],
    ["Description", "text", v => v.length > 0],
    ["Urgency", "test", v => v.length >0],


  ]


  /**
   * Creates task based on data in inputfields
   */
  createTaskOnClick = async () => {
    try {
      const taskData = {
        title: this.state.title,
        description: this.state.description,
        urgency: this.state.urgency,
        start: this.state.startDate.toDate(), //toDate() to convert moment()-date to standard JS, due to Superstruckt limitations
        deadline: this.state.endDate.toDate() //toDate() to convert moment()-date to standard JS, due to Superstruckt limitations
      }
      await task.create(taskData)
      //Redirect to employers task-overview
    } catch (e) {
      this.setState({ error: e.message })
    }
  }

  validator = () => {
    for(const[label, _, validator] of this.fields) {
      if(!validator(this.state[camelcase(label)])) {
        return false
      }
    }
    return true
  }


  fieldRender([label,type,validator]){
    const name = camelcase(label);
     return(
       <label key = {name}>
         {label}
         <input
           name={name}
           type={type}
           value={this.state[name]}
           onChange={this.handleChange}
           className={validator(this.state[name]) ? "valid": ""}
           required
         />
       </label>
     )
   }

  /**
   * Sets the selected  date
   * @param {Date} date
   */
  updateStartDate = (date) => {
    this.setState({ startDate: date })
    this.setState({ endDate: date })
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
        <section>
          <h2>Create Task</h2>
          {this.state.error && (
            <Alert>{this.state.error} </Alert>
          )}
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
        </section>
      </Layout>
    )
  }
}
