import React, { Component } from 'react'
import Layout from '../../components/Layout'
import task from '../../api/task'
import budget from '../../api/budget'
import DatePicker from '../../components/DatePicker'
import moment from 'moment'
import Alert from '../../components/Alert'
import { withRouter } from 'react-router-dom'
import camelcase from 'camelcase'
import auth from '../../api/auth'
import './Task.css'

export default withRouter(class Update extends Component {
  state = {
    start: null,
    deadline: null,
    title: "",
    description: "",
    urgencystring: "",
    error: null,
    budgets: [],
    currency: "USD",
    currentBudget: 0,
    completed: "",
  }

  fields = [
    //["label", "Type", Validation method ,isTextArea]
    ["Title", "text", v => v.length > 0, false],
    ["Description", "text", v => v.length > 0, true],
  ]

  /**
   * Updated tasks
   */
  updateHandler = async event => {
    event.preventDefault()
    //invalid input handling
    if (!this.validator()) {
      this.setState({ error: "Invalid input" })
      return
    }

    // sets input
    try {
      const taskData = {
        id: Number(this.props.match.params.id),
        title: this.state.title,
        description: this.state.description,
        urgencystring: this.state.urgencystring,
        start: this.state.start.toDate(), //toDate() to convert moment()-date to standard JS-date, due to Superstruckt and server limitations
        deadline: this.state.deadline.toDate(), //toDate() to convert moment()-date to standard JS-date, due to Superstruckt and server limitations
        budgetId: Number(this.state.currentBudget)
      }
      await task.update(this.props.match.params.id, taskData)
      this.props.history.push('/task/list') // redirect to Task/list
    } catch (e) {
      this.setState({ error: e.message })
    }
  }

  /**
  * Validates input based on validation method defined in Fields[]
  * @return {boolean}
  */
  validator = () => {
    for (const [label, _, validator] of this.fields) { // eslint-disable-line
      if (!validator(this.state[camelcase(label)])) {
        return false
      }
    }
    return true
  }

    /**
   * Renders Complete Task Button, if user is of type Employer
   */
  renderTaskCompletion = () => {
    console.log(auth.type())
   if(auth.type() === 'employer')
   {
     return(
      <button onClick={this.completeTaskOnClick}>Complete Task</button>
     )

   }
   return;
  }

  /**
  * Renders input fields based on definitions in fields[]
  * @param {String} label
  * @param {Mixed} type
  * @param {Method} validator
  * @param {boolean} isTextArea
  * @return {JSX} an input surrounded with a label
  */
  fieldRender([label, type, validator, isTextArea]) {
    const name = camelcase(label);
    if (isTextArea === true) {
      return (
        <label key={name}>
          {label}
          <textarea
            name={name}
            value={this.state[name]}
            onChange={this.handleChange}
            className={validator(this.state[name]) ? "valid" : ""}
            required
          />
        </label>
      )
    }

    return (
      <label key={name}>
        {label}
        <input
          name={name}
          type={type}
          value={this.state[name]}
          onChange={this.handleChange}
          className={validator(this.state[name]) ? "valid" : ""}
          required
        />
      </label>
    )
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

  /**
   * This function is called when the component is mounted to the DOM.
   * when the component is mounted we get the budgets and tasks from the database
   */
  componentDidMount = () => {
    this.getTask()
    this.getBudgets()
  }

  /**
   * Get existing budgets from database and add them to state
   */
  async getBudgets(){
    this.setState({
      budgets: await budget.get()
    })
  }

  /**
   * Gets Task arguments and Setstate
   */
  getTask = async () => {

    const loadedTask = await task.get(this.props.match.params.id);
    this.setState({
      title: loadedTask.title,
      description: loadedTask.description,
      urgencystring: loadedTask.urgencyString,
      start: moment(loadedTask.start),
      deadline: moment(loadedTask.deadline),
      currentBudget: loadedTask.budgetId
    })
  }

  /**
   * Sets Task to completed
   */
completeTaskOnClick =  () => {
  task.completeTask(this.props.match.params.id)
}

  /**
   * Sets the selected  date
   * @param {Date} date
   */
  updateStartDate = (date) => {
    this.setState({
      start: date,
      deadline: date,
    })

  }

  /**
   * Sets selected date of deadline
   * @param {Date} date
   */
  updateDeadline = (date) => {
    this.setState({ deadline: date })
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

  /**
   * Renders budgets inputs based on definitions in budgetTypes[]
   * @param {String} value
   * @param {String} Title
   * @return {JSX} an input surrounded with a label
   */
  renderBudgets({id, from, to}) {
    return (
        <option key={id} value={id}>{from}$ to {to}$</option>
    )
  }

  render() {
    return (
      <Layout>
        <section>
          <h2>Task</h2>
          {this.state.error && (
            <Alert>{this.state.error} </Alert>
          )}
          <form>
            {this.fields.map(this.fieldRender.bind(this))}
            <label>
              Starting Date
              <DatePicker onChange={this.updateStart} minDate={moment()} selected={this.state.start} />
            </label>
            <label>
              Deadline
              <DatePicker onChange={this.updateDeadline} minDate={this.state.start} selected={this.state.deadline} />
            </label>
            <div>
              <label>
                Urgency
              </label>
              <br/>
              <label>
                <input
                  type="radio"
                  name="urgencystring"
                  value="norush"
                  onChange={this.handleChange}
                  checked={this.state.urgencystring === 'norush'}
                  required
                />
                No Rush
              </label>
              <span/>
              <label>
                <input
                  type="radio"
                  name="urgencystring"
                  value="urgent"
                  onChange={this.handleChange}
                  checked={this.state.urgencystring === 'urgent'}
                  required
                />
                Urgent
              </label>
              <span/>
              <label>
                <input
                  type="radio"
                  name="urgencystring"
                  value="asap"
                  onChange={this.handleChange}
                  checked={this.state.urgencystring === 'asap'}
                  required
                />
                ASAP
              </label>
            </div>
            <label>
              Select your budget:
              <select value={this.state.currentBudget} onChange={this.handleChange} name="currentBudget">
                {this.state.budgets.map(this.renderBudgets.bind(this))}
              </select>
            </label>
            {this.completeTaskRender()}
            <input type="submit" value="Update" onClick={this.updateHandler} />
          </form>
        </section>
      </Layout>
    )
  }
})
