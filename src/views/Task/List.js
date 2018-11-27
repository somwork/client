import React,{Component} from "react";
import Layout from '../../components/Layout';
import task from '../../api/task';
import { Link } from 'react-router-dom';
import moment from 'moment';
import './Task.css'

export default class List extends Component{

  state = {
    tasks: []
  }

  /**
   * Run when component mounts
   */
  componentDidMount () {
    this.loadTasks();
  }

  /**
   * loads all tasks from the db into the state
   */
  loadTasks = async () => {
    this.setState({
      tasks: await task.get()
    })
  }

  /**
   * render a task
   * @param {Object} task
   * @return {JSX}  a task as a list item
   */
  renderListItem(task){
    return(
      <Link to={'detail/'+task.id}>
        <li key={task.id}>
          <div>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
          </div>
          <div>
            <p>
              <b>Deadline:</b><br />
              {moment(task.deadline).format('DD. MMM YYYY')}
              <br/>
              <br/>
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
   * Creates the Task overview view
   * @return {JSX} View
   */
  render(){
    return (
      <Layout>
        <section className='task-list'>
          <h1>Tasks</h1>
          <ul>
            {this.state.tasks.map(this.renderListItem.bind(this))}
          </ul>
        </section>
      </Layout>
    )
  }
}
