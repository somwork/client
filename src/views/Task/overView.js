import React,{Component} from "react";
import Layout from '../../components/Layout';
import Task from '../../api/task';

export default class overView extends Component{

  constructor(props){
    super(props);

    this.state = {}

   // this.loadTasks();

  };

  tasks = [
  // 'Id','Start', 'Deadline','Description','Urgency'
  ['element.Id','element.start','element.deadline','element.Description','element.Urgency'],
  ['element.Id','element.start','element.deadline','element.Description','element.Urgency'],
  ['element.Id','element.start','element.deadline','element.Description','element.Urgency'],
  ['element.Id','element.start','element.deadline','element.Description','element.Urgency'],
  ['element.Id','element.start','element.deadline','element.Description','element.Urgency']
  ]

  loadTasks = async list=>{
    //add tasks to Tasks list
    const res =await Task.get();
    if(res!==undefined){
      this.tasks.push.apply(this.tasks,res);
    }
  }
  // Adds a specific tasks to state
  changeHandler = event => {
    const taskId = event.target.Id;
    const res =this.setState(tasks);
    console.log(res);
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
        {this.tasks.map(this.fieldRender.bind(this))}
        </ul>
        </form>
      </Layout>
    )
  }
}

