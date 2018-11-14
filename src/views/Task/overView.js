import React,{Component} from "react";
import Layout from '../../components/Layout';
import serverApi from '../../api/task';

export default class overView extends Component{

  constructor(props){
    super(props);

    this.state = {}

  //add tasks to Tasks list
   this.tasks.push.apply(this.tasks,serverApi.get());
  };

  tasks = [
  // 'Id','Start', 'Deadline','Description','Urgency'
  ['element.Id','element.start','element.deadline','element.Description','element.Urgency'],
  ['element.Id','element.start','element.deadline','element.Description','element.Urgency'],
  ['element.Id','element.start','element.deadline','element.Description','element.Urgency'],
  ['element.Id','element.start','element.deadline','element.Description','element.Urgency'],
  ['element.Id','element.start','element.deadline','element.Description','element.Urgency']
  ]

  // Adds a specific tasks to state
  changeHandler = event => {
    const taskId = event.target.Id;
    this.setState(serverApi.getSpecific(taskId));
  }

  /**
   * render a task
   * @param {int} id
   * @param {DateTime} start
   * @param {DateTime} deadline
   * @param {String} Description
   * @param {String} Urgency
   * @return {HTML} <label><input/><label/>
   */
  fieldRender([Id,Start,Deadline,Description,Urgency]){
    return(
      <li>
      <label key = {Id}>
      <p>Task Id: {Id}</p>
      <p>{Start} -> {Deadline}</p>
      <p>{Urgency}</p>
      <p>{Description}</p>
      </label>
      </li>
    )
  }

    /**
   * Creates the Task overview view
   * @return {HTML} View
   */
  render(){
    return (
      <Layout>
        <h1>Task overview</h1>
        <form onSubmit={this.submitHandler}>
        <ul>
        {this.Tasks.map(this.fieldRender.bind(this))}
        </ul>
        </form>
      </Layout>
    )
  }
}

