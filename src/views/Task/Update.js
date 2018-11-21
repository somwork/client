import React, { Component } from 'react'
import Layout from '../../components/Layout'
import task from '../../api/task'
import DatePicker from '../../components/DatePicker'
import moment from 'moment'
import Alert from '../../components/Alert'

export default class Update extends Component {
  state = {
    startDate: moment(),
    endDate: moment(),
    title: "",
    description: "",
    urgency: "",
    error: null
  }
  constructor(props) {
    super(props);

  };

  getTask = async () => {
    const task = await task.get(this.props.match.params.id);
    this.setState({
      title: task.title,
      description: task.description,
      urgency: task.urgency,
      startDate: task.startDate,
      endDate: task.endDate,
    })
  }

  componentDidMount = () => {
    this.getTask()
  }

  fields = [
    //["label", "Type", Validation method]
    ["Title", "text", v => v.length > 0, false],
    ["Description", "text", v => v.length > 0, true],
    ["Urgency", "text", v => v.length > 0, false]
  ]



  updateHandler = async () => {

    try {
      const taskData = {
        title: this.state.title,
        description: this.state.description,
        urgency: this.state.urgency,
        start: this.state.startDate.toDate(), //toDate() to convert moment()-date to standard JS, due to Superstruckt limitations
        deadline: this.state.endDate.toDate() //toDate() to convert moment()-date to standard JS, due to Superstruckt limitations
      }
      await task.update(taskData)
      //Redirect to employers task-overview
    } catch (e) {
      this.setState({ error: e.message })
    }

  }

  render() {
    return (
      <Layout>
        <section>
          <h2>Task</h2>
          {this.state.error && (
            <Alert>{this.state.error} </Alert>
          )}
          <form onSubmit={this.submitHandler}>
            {this.fields.map(this.fieldRender.bind(this))}
            <label>
              Starting Date
            <DatePicker onChange={this.updateStartDate} minDate={moment()} selected={this.state.startDate} />
            </label>
            <label>
              Deadline
            <DatePicker onChange={this.updateEndDate} minDate={this.state.startDate} selected={this.state.endDate} />
            </label>
          </form>
          <input type="submit" value="Update" onClick={this.UpdateHandler} />
        </section>
      </Layout>
    )
  }

}
