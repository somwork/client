import React,{Component} from "react";
import Layout from '../../components/Layout';
import Task from '../../api/task';
import { Link } from 'react-router-dom';

export default class View extends Component{

  constructor(props){
    super(props);

    this.state = {tasks:[]}

   this.loadTasks();
  };

  /**
   *loads all tasks from the db into the state
  */
  loadTasks = async list=>{
    const res = await Task.get(this.props.match.params.id);
    console.log(res);

    this.setState({tasks:res})
    }

  /**
   * render a task
   * @param {int} id
   * @param {DateTime} start
   * @param {DateTime} deadline
   * @param {String} description
   * @param {String} urgency
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
        <h1>Task overview</h1>
        <ul>
          {this.fieldRender(this.state.tasks)}
        </ul>
        <input type="submit" value="Make Offer"/>
        <input type="submit" value="Chat"/>
        <Link to='../List'>
          <input type="submit" value="Back"/>
        </Link>
      </Layout>
    )
  }
}

