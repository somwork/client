import React,{Component} from "react";
import Layout from '../../components/Layout';
import Task from '../../api/task';
import { Link } from 'react-router-dom';

export default class View extends Component{

  constructor(props){
    super(props);

    this.state = {tasks:[]}

    this.loadTasks(this.props.match.params.id);
  };

  /**
   *loads all tasks from the db into the state
   * @param {int} id
   */
  loadTasks = async id=>{
    const res = await Task.get(id);

    this.setState({tasks:res})
  }

  /**
   * render a task
   * @param {Object} task
   * @return {JSX} a task as a list item
   */
 fieldRender(task){
    return(
      <li key ={task.id}>
        <label>
          <p><b>Task Id:</b> {task.id}</p>
          <p>{task.start} → {task.deadline}</p>
          <p>{task.urgency}</p>
          <p>{task.description}</p>
        </label>
      </li>
    )
  }

  /**
   * Creates the Task overview view
   * @return {JSX} View
   */
  render(){
    return (
      <Layout>
          <section>
            <h1>Task view</h1>
            <ul>
              {this.fieldRender(this.state.tasks)}
            </ul>
            <button>Make Offer</button>
            <button>Chat</button>
            <Link to='/task/List'>
              <button>Back</button>
            </Link>
          </section>
      </Layout>
    )
  }
}
