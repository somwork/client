import React, { Component } from "react";
import Layout from '../../components/Layout';
import task from '../../api/task';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Task.css'
import employer from '../../api/employer';
import auth from "../../api/auth";

export default class List extends Component {

  state = {
    tasks: [],
    value: 'all'
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
    if (this.state.value === "all") {
      this.setState({
        tasks: await task.get()
      })
    } else if (this.state.value === "yours") {
      this.setState({
        tasks: await employer.getEmployerTasks(auth.id())
      })
    }

  }

  /**
   * render a task
   * @param {Object} task
   * @return {JSX}  a task as a list item
   */
  renderListItem(task) {
    return (
      <Link to={'detail/' + task.id}>
        <li key={task.id}>
          <div>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
          </div>
          <div>
            <p>
              <b>Deadline:</b><br />
              {moment(task.deadline).format('DD. MMM YYYY')}
              <br />
              <br />
              <b>Urgency:</b><br />
              {task.urgency}
            </p>
            <button>See task</button>
          </div>
        </li>
      </Link>
    )
  }

  /**
   * QualityAssurance list of menu items
   * @type {Array}
   */
  options = [
    ["all", "All"],
    ["yours", "Yours"]
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
          <select className="custom-select" value={this.state.value} onChange={this.handleSelectChange}>
            {this["options"].map(this.renderOption)}
          </select>
          <ul>
            {this.state.tasks.map(this.renderListItem.bind(this))}
          </ul>
        </section>
      </Layout>
    )
  }
}
