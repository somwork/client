import React, { Component } from "react";
import moment from 'moment';
import Layout from '../../components/Layout';
import Task from '../../api/task';
import auth from '../../api/auth';
import worker from '../../api/worker';
import estimate from '../../api/estimate';
import Popup from "reactjs-popup";
import Alert from '../../components/Alert';
import Chat from './Chat';
import withRealtime from '../../hoc/withRealtime'
import './Task.css'
import CategoriesDetails from '../../components/Categories/Categories'

export default withRealtime(class View extends Component {
  state = {
    task: {
      id: 0,
      start: '',
      deadline: '',
      urgency: '',
      description: '',
      title: '',
      employerId: null,
      averageEstimate: 0,
      completed: false
    },
    estimates: [],
    estimate: {
      totalHours: 0
    },
    newEstimate: {
      hourlyWage: 0,
      totalHours: 0,
      currency: 'DKK',
      complexity: 1.0,
    },
    error: ''
  }


    urgency = {
      1.2: 'No rush',
      1.4: 'Urgent',
      1.5: 'ASAP'
    }

  /**
   * Loads all tasks into state when componet mount
   */
  componentDidMount() {
    this.initTasks()
    this.props.broker.on(`task/${this.props.match.params.id}/updated`, this.initTasks)
  }

  componentWillUnmount() {
    this.props.broker.off(`task/${this.props.match.params.id}/updated`, this.initTasks)
  }


  /**
   * Get estimates to task
   */
  initTasks = () => {
    this.loadTasks(this.props.match.params.id);
    if (auth.type() === "employer") {
      this.loadEstimates(this.props.match.params.id);
    } else {
      this.loadCurrentEstimate(this.props.match.params.id);
    }
  }

  /**
   * loads the selected task from the database into the state
   * @param {int} id
   */
  loadTasks = async id => {
    this.setState({
      task: await Task.get(id)
    })
  }

  /**
   * load all estimates
   * @param  {Number}  id
   */
  loadEstimates = async id => {
    const estimates = await Task.getEstimates(id)
    const workers = await worker.get()

    this.setState({
      estimates: estimates.map(estimate => {
        estimate.worker = workers.find(worker => worker.id === estimate.workerId)
        return estimate
      })
    })
  }

  /**
   * Load a workers estimate if it exists
   * @param  {Number}  id
   * @return {Promise}
   */
  loadCurrentEstimate = async id => {
    const estimates = await estimate.get()

    const est = estimates.find(
      estimate => estimate.workerId === auth.id() && estimate.taskId === Number(id)
    )

    if (!est) {
      return
    }

    this.setState({
      estimate: est
    })
  }

  /**
   * event listener for input
   * adds changes to this.state
   * @param  {Object} event
   */
  changeHandler = event => {
    const tempestimate = { ...this.state.newEstimate }
    tempestimate[event.target.name] = event.target.value
    this.setState({
      newEstimate: tempestimate
    })
  }

  /**
   * Sets Task to completed
   */
  completeTaskOnClick =  () => {
    Task.completeTask(this.props.match.params.id)
    this.setState({task: {...this.state.task, completed: true}})
  }

  /**
   * event listener for Submit
   * validates all inputfields before sending a post request to the server
   * @param {Object} event
   */
  submitHandler = async event => {
    event.preventDefault();
    try {
      const estimate = {
        hourlyWage: Number(this.state.newEstimate.hourlyWage),
        totalHours: Number(this.state.newEstimate.totalHours),
        urgency: Number(this.state.task.urgency),
        complexity: Number(this.state.newEstimate.complexity),
        workerId: auth.id()
      }

      await Task.createEstimate(this.state.task.id, estimate);

      this.setState({ estimate: estimate })
      await this.loadCurrentEstimate()
      this.props.broker.send(`task/${this.props.match.params.id}/updated`, '')
      await this.loadTasks(this.props.match.params.id)
    } catch (err) {
      this.setState({ error: err.message })
    }
  }


   /* Accept worker
   * @param  {Number}  id
   * @return {Promise}
   */
  acceptWorker = async id => {
    await estimate.accept(id)
    const estimates = this.state.estimates.map(estimate => {
      if (estimate.id === id) {
        estimate.accepted = true
      }

      return estimate
    })

    this.setState({ estimates })
    this.props.broker.send(`task/${this.props.match.params.id}/updated`, '')
  }

  /**
   * Redirects to Update Screen of Task
   */
  updateTaskOnClick = () => {
    this.props.history.push(`/task/update/${this.props.match.params.id}`)
  }

  /**
   * Creates the task overview view
   * @return {JSX} View
   */
  render() {
    return (
      <Layout>
        <section className='task'>
          <section>
            {this.renderTaskDetails()}
            <Chat taskId={this.props.match.params.id} />
          </section>
          <section>
            <CategoriesDetails
              taskId={this.props.match.params.id}
              employerId={this.state.task.employerId}
            />
            {(
              auth.type() === 'worker'
                ? this.renderWorkerEstimates()
                : this.renderEmployerEstimates()
            )}
          </section>
        </section>
      </Layout>
    )
  }

  /**
   * Renders completion icon
   */
  renderCompletionIcon = () => {
    return (
    <p className="completion">Task Completed<i className="fas fa-check"></i> </p>
    )
  }

  /**
   * Renders Complete Task Button, if user is of type Employer
   */
  renderEmployerSpecificButtons = () => {
    //If the user is an employer, and the task has not been completed, render buttons
   if(this.state.task.completed === false)
   {
     return(
      <div>
      <button onClick={this.updateTaskOnClick}>Update Task</button>
      <button onClick={this.completeTaskOnClick}>Complete Task</button>
      </div>
     )
   }
   //Render message declaring task completed
   return(
     <p>This task has been marked as completed</p>
   )
  }

  /**
   * Render task details
   * @return {JSX}
   */
  renderTaskDetails() {
    return (
      <div>
        <h3>{this.state.task.title}</h3>
        {this.state.task.completed === true && (
            this.renderCompletionIcon()
          )}
        {this.state.error && (
          <Alert>{this.state.error}</Alert>
        )}
        {this.renderTaskDescription(this.state.task)}
      </div>
    )
  }

  /**
   * render a task
   * @param {Object} task
   * @return {JSX} a task as a list item
   */
  renderTaskDescription(task) {
    return (
      <div className="details" key={task.id}>
        <div className='pane'>
          <div>
            <b>Published</b><br />
            {moment(task.start).format('DD. MMM YYYY')}
          </div>
          <div>
            <b>Deadline</b><br />
            {moment(task.deadline).format('DD. MMM YYYY')}
          </div>
          <div>
            <b>Urgency</b><br />
            {this.urgency[task.urgency]}
          </div>
        </div>

        <h6>Description:</h6>
        <p>{task.description}</p>
      </div>
    )
  }

  /**
   * Render employer estimate
   * @return {[type]} [description]
   */
  renderEmployerEstimates() {
    const accepted = this.state.estimates.find(e => e.accepted === true)
    return (
      <div className='estimate'>
        <h4>Estimate</h4>
        <h4 className='secondary'>{this.state.task.averageEstimate > 0 ? '$' + this.state.task.averageEstimate.toFixed(2) : 'Awaiting'}</h4>
        {this.state.estimates.length === 0 && (
          <h6>No estimates yet!</h6>
        )}
        <ul>
          {accepted && (
            <li>
              <h5>{accepted.worker.firstName} {accepted.worker.lastName}</h5>
            </li>
          )}
          {!accepted && this.state.estimates.map(estimate => (
            <li key={estimate.id}>
              <h5>{estimate.worker.firstName} {estimate.worker.lastName}</h5>
              <button onClick={() => this.acceptWorker(estimate.id)}>Hire</button>
            </li>
          ))}
        </ul>
        {auth.type() === 'employer' && ( this.renderEmployerSpecificButtons())}
      </div>
    )
  }

  renderWorkerEstimatePopup() {

    if(this.state.task.completed === true)
    {
      return(
        <p>This task has been marked as completed</p>
      )
    }
    else if(this.state.estimate.totalHours === 0)
    {
    return (
      <Popup trigger={<button>Make estimate</button>}>
            <div className='pop-up'>
              <form onSubmit={this.submitHandler}>
                <label>
                  <b>Choose hourly wage:</b>
                  <input name='hourlyWage' type='number' onChange={this.changeHandler} min="1" max="999" placeholder="Hourly wage" required />
                </label>
                <label>
                  <b>Estimated hours:</b>
                  <input name='totalHours' type='number' onChange={this.changeHandler} placeholder="Estimated hours" required />
                </label>
                <label>
                  <b>Task Complexity:</b>
                  <select name='complexity'>
                    <option value='1.0'>Easy</option>
                    <option value='1.5'>Medium</option>
                    <option value='2.0'>Hard</option>
                  </select>
                </label>
                <input type="submit" value="Send" />
              </form>
            </div>
          </Popup>
    )
    }
  }

  renderWorkerEstimates() {
    return (
      <div className='estimate'>
        <h4>Estimate</h4>
        <h4 className='secondary'>{this.state.task.averageEstimate > 0 ? '$' + this.state.task.averageEstimate.toFixed(2) : 'Awaiting'}</h4>
        {this.state.estimate.totalHours > 0 && (
          <h6 className='secondary'>{this.state.estimate.accepted ? 'Your estimate is accepted' : 'Your estimate was sendt'}</h6>
        )}
        {this.renderWorkerEstimatePopup()}
      </div>
    )
  }
})
