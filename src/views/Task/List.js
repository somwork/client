import React, { Component } from "react";
import Layout from '../../components/Layout';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Task.css'
import employer from '../../api/employer';
import worker from '../../api/worker';
import auth from "../../api/auth";

export default class List extends Component {
  state = {
    tasks: [],
    value: auth.type() === "worker" ? "available" : "all",
    error: null
  }

  /**
   * Run when component mounts
   */
  componentDidMount() {
    this.loadTasks();
  }

  /**
   * loads all tasks from the db into the state
   */
  loadTasks = async () => {
    try {
      if (this.state.value === "all" && auth.type() === "employer") {
        this.setState({
          tasks: await employer.getTasks(auth.id())
        })
      } else if (this.state.value === "available" && auth.type() === "worker") {
        this.setState({
          tasks: await worker.getAvailableTasks()
        })
      } else if (this.state.value === "accepted" && auth.type() === "worker") {
        this.setState({
          tasks: await worker.getAcceptedTasks(auth.id())
        })
      } else if (this.state.value === "progress" && auth.type() === "employer") {
        this.setState({
          tasks: await employer.getAcceptedTasks(auth.id())
        })
      } else if (this.state.value === "estimated" && auth.type() === "worker") {
        this.setState({
          tasks: await worker.getEstimatedTasks(auth.id())
        })
      }
    } catch (e) {
      this.setState({ error: "Task not found" })
    }
  }

  /**
   * render a task
   * @param {Object} task
   * @return {JSX}  a task as a list item
   */
  renderListItem(task) {
    return (
      <Link key={task.id} to={'detail/' + task.id}>
        <li>
          <div>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
          </div>
          <div>
            <p>
              <b>Deadline:</b><br />
              {moment(task.deadline).format('DD. MMM YYYY')}
              <br />
              <b>Urgency:</b><br/>
              {task.urgencyString}<br/>
              <b>Estimate:</b><br/>
              {task.averageEstimate > 0 ? "$" + task.averageEstimate.toFixed(2) : "Awaiting" }
            </p>
            <button>See task</button>
          </div>
        </li>
      </Link>
    )
  }

  /**
   * Workers select list
   * @type {Array}
   */
  worker = [
    ["available", "Available tasks"],
    ["accepted", "Accepted tasks"],
    ["estimated", "Estimated tasks"]
  ]

  /**
   * Employers select list
   * @type {Array}
   */
  employer = [
    ["all", "All"],
    ["progress", "In progress"]
  ]

  handleSelectChange = async event => {
    await this.setState({ value: event.target.value })
    await this.loadTasks()
  }

  /**
  * Render options item
  * @param  {Array}
  * @return {JSX}
  */
  renderOption = ([option, name]) => (
    <option key={option} value={option}>{name}</option>
  )

  /**
   * Creates the Task overview view
   * @return {JSX} View
   */
  render() {
    return (
      <Layout>
        <section className='task-list'>
          <h1>Tasks</h1>
          <select value={this.state.value} onChange={this.handleSelectChange}>
            {this[auth.type()].map(this.renderOption)}
          </select>
          {this.state.tasks.length === 0 && (
            <h4 className="secondary">No tasks available for this selection</h4>
          )}
          <ul>
            {this.state.tasks.map(this.renderListItem.bind(this))}
          </ul>
        </section>
      </Layout>
    )
  }
}
