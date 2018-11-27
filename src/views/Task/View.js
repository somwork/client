import React,{Component} from "react";
import Layout from '../../components/Layout';
import Task from '../../api/task';
import Offer from '../../api/offer';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import'./TaskView.css'
import Chat from "./Chat";
import auth from '../../api/auth';

export default class View extends Component{

  constructor(props){
    super(props);

    this.state = {
      Task:[{
        id: '',
        start:'',
        deadline:'',
        urgency:'',
        description:''
      }],
      offer:[{
        accepted: '',
        price:'',
        totalHours:"",
        currency:'',
        complexity:"",
        workerId:'',
        taskId:''
      }]
    }
    this.loadTasks(this.props.match.params.id);
  }

    /**
   *loads the selected task from the db into the state
   * @param {int} id
   */
  loadTasks = async id=>{
    const res = await Task.get(id);

    this.setState({tasks:res})
  }

  /**
   * event listener for input
   * adds changes to this.state
   * @param  {Object} event
   */
  changeHandler = event => {
    this.setState({
      [event.target.name] : event.target.value
    })
  }

  /**
   * event listener for Submit
   * validates all inputfields before sending a post request to the server
   * @param {Object} event
   */
  offerSubmitHandler= async event =>{
    event.preventDefault();

    if(!this.state.offer.price>0){
      this.setState({ error: "Invalid input" })
      return
    }

    try {
      const res = await Offer.create({
        accepted: 'false',
        price: this.state.offer.price,
        currency: '', //TODO
        workerId: auth.id(),
        taskId: this.state.Task.id,
      });

      if (res.error) {
        return this.setState({ error: res.error })
      }

    } catch(err) {
      this.setState({ error: err.message })
    }
  }

  /**
   * render a task
   * @param {Object} task
   * @return {JSX} a task as a list item
   */
  fieldRenderTaskDescription(task){
    return(
      <label key ={task.id}>
        <div class="flex-container">
          <div>
            <b>Task Id</b>
            <div>
            {task.id}
            </div>
          </div>
          <div>
            <b>published</b>
            <div>
            {task.start}
            </div>
          </div>
          <div>
            <b>Deadline</b>
            <div>
            {task.deadline}
            </div>
          </div>
          <div>
            <b>Urgency</b>
            <div >
            {task.urgency}
            </div>
          </div>
          </div>
          <div>
          <hr></hr>
          <p><h6>Task Description:</h6></p>
          <p>{task.description}</p>
          </div>
      </label>
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
          <h1>Title Task</h1>
          <h3>Task Details</h3>
          <hr></hr>
          {this.fieldRenderTaskDescription(this.state.Task)}

          <Popup trigger={<button> Make offer</button>}>
            <div class="popUpInner">
              <label>
                <input name='price' type='number' onChange={this.changeHandler}  placeholder="Horly pay" required/>
                <input name='totalHours' type='number' onChange={this.changeHandler}  placeholder=" Estimated Hours" required/>
                <input name='complexity' type='number' onChange={this.changeHandler}  placeholder=" //Task complexity" required/>
                <input type="submit" value="Submit" submitHandler="offerSubmitHandler"/>
              </label>
            </div>
          </Popup>
          <hr></hr>
         <Chat taskId={this.state.Task.id}/>
          <Link to='/task/List'>
            <button>Back</button>
          </Link>
        </section>
      </Layout>
    )
  }
}
