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
import './Task.css'

export default class View extends Component {
  state = {
    task: {
      id:'',
      start:'',
      deadline:'',
      urgency:'',
      description:'',
      title:'',
      averageEstimate: 0,
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
    error:''
  }

  urgency = {
    1.2: 'No rush',
    1.4: 'Urgent',
    1.5: 'ASAP'
  }

  /**
   * Loads all tasks into state when componet mount
   */
  componentDidMount(){
    this.loadTasks(this.props.match.params.id);

    if (auth.type() === "employer") {
      this.loadEstimates(this.props.match.params.id);
    } else {
      this.loadCurrentEstimate(this.props.match.params.id)
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
    const tempestimate = {...this.state.newEstimate }
    tempestimate[event.target.name] = event.target.value
    this.setState({
        newEstimate: tempestimate
    })
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
      await this.loadTasks(this.props.match.params.id)
    } catch(err) {
      this.setState({ error: err.message })
    }
  }

  /**
   * Accept worker
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
            <Chat taskId={this.state.task.id} />
          </section>
          <section>
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
   * Render task details
   * @return {JSX}
   */
  renderTaskDetails () {
    return (
      <div>
        <h3>{this.state.task.title}</h3>
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
  renderTaskDescription(task){
    return(
      <div className="details" key={task.id}>
        <h6>Details:</h6>
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
        <h4 className='secondary'>{this.state.task.averageEstimate > 0 ? '$'+this.state.task.averageEstimate.toFixed(2) : 'Awaiting'}</h4>
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
      </div>
    )
  }

  renderWorkerEstimates() {
    return (
      <div className='estimate'>
        <h4>Estimate</h4>
        <h4 className='secondary'>{this.state.task.averageEstimate > 0 ? '$'+this.state.task.averageEstimate.toFixed(2) : 'Awaiting'}</h4>
        {this.state.estimate.totalHours > 0 && (
          <h6 className='secondary'>{this.state.estimate.accepted ? 'Your estimate is accepted' : 'Your estimate was sendt'}</h6>
        )}
        {this.state.estimate.totalHours === 0 && (
          <Popup trigger={<button>Make estimate</button>}>
            <div className='pop-up'>
              <form onSubmit={this.submitHandler}>
                <label>
                  Hourly pay:
                  <input name='hourlyWage' type='number' onChange={this.changeHandler}  placeholder="Hourly wage..." required/>
                </label>
                <label>
                  Total hours:
                  <input name='totalHours' type='number' onChange={this.changeHandler}  placeholder="Man Hours..." required/>
                </label>
                <label>
                  Task Complexity:
                  <select name='complexity'>
                    <option value='1.0'>Easy</option>
                    <option value='1.5'>Medium</option>
                    <option value='2.0'>Hard</option>
                  </select>
                </label>
                <input type="submit" value="Send"/>
              </form>
            </div>
          </Popup>
        )}
      </div>
    )
  }
}
