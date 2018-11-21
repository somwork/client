import React,{Component} from "react";
import Layout from '../../components/Layout';
import Task from '../../api/task';
import { Link } from 'react-router-dom';

export default class List extends Component{

  constructor(props){
    super(props);

    this.state = {tasks:[]}

    this.loadTasks();

  };

  /**
   * loads all tasks from the db into the state
   */
  loadTasks = async ()=>{
    const res =await Task.get();
    this.setState({tasks:res})
  }

  /**
   * render a task
   * @param {Object} task
   * @return {JSX}  a task as a list item
   */
  fieldRender(task){
    return(
      <Link to={'detail/'+task.id}>
        <li key ={task.id}>
          <label>
            <p><b>Task Id:</b> {task.id}</p>
            <p>{task.start} → {task.deadline}</p>
            <p>{task.urgency}</p>
            <p>{task.description}</p>
          </label>
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
        <section>
          <h1>Task overview</h1>
          <ul>
            {this.state.tasks.map(this.fieldRender.bind(this))}
          </ul>
        </section>
      </Layout>
    )
  }
}
