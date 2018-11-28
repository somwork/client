import React,{Component} from "react";
import Layout from '../../components/Layout';
import Task from '../../api/task';
import Offer from '../../api/offer';
import currencies from '../../api/currencies';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import'./TaskView.css'
import Chat from "./Chat";
import Auth from '../../api/auth';
import moment from 'moment';
import Alert from '../../components/Alert';

export default class View extends Component{

  constructor(props){
    super(props);

    this.state={
      task:{
        id:'',
        start:'',
        deadline:'',
        urgency:'',
        description:'',
        employerId:'',
        title:''
      },
      offer:{
        accepted:'',
        price:'',
        totalHours:'',
        currency:'',
        complexity:'',
        workerId:'',
        taskId:''
      },
      error:''
    }
  }

  componentDidMount(){
    this.loadtasks(this.props.match.params.id);
  }

  /**
   *loads the selected task from the database into the state
   * @param {int} id
   */
  loadtasks = async id=>{

    const res = await Task.get(id);

    this.setState({task:res})
  }

  /**
   * event listener for input
   * adds changes to this.state
   * @param  {Object} event
   */
  changeHandler = event => {
      const tempOffer = JSON.parse(JSON.stringify(this.state.offer))
      tempOffer[event.target.name] = event.target.value
      this.setState({
         offer:tempOffer
      })
    }

  /**
   * event listener for Submit
   * validates all inputfields before sending a post request to the server
   * @param {Object} event
   */
  submitHandler= async event =>{
    event.preventDefault();
    try {
      const res = await Offer.create({
        accepted:false,
        price: Number(this.state.offer.price),
        totalHours:Number(this.state.offer.totalHours),
        currency: String(currencies.get()),
        complexity:Number(this.state.offer.complexity),
        workerId: Number(Auth.id),
        taskId:Number(this.props.match.params.id)
      })

    } catch(err) {
      this.setState({ error: err.message })
    }
  }

  /**
   * render a task
   * @param {Object} task
   * @return {JSX} a task as a list item
   */
  fieldRendertaskDescription(task){
    return(
      <label key ={task.id}>
        <div className="flex-container">
          <div>
            <b>published</b>
            <div>
              {moment(task.start).format('DD. MMM YYYY')}
            </div>
          </div>
          <div>
            <b>Deadline</b>
            <div>
            {moment(task.deadline).format('DD. MMM YYYY')}
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
            <h6>task Description:</h6>
            <p>{task.description}</p>
          </div>
      </label>
    )
  }

  /**
   * Creates the task overview view
   * @return {JSX} View
   */
  render(){
    return (
      <Layout>
        <section>
          <h1>{this.state.task.title}</h1>
          <h3>task Details</h3>
          {this.state.error && (
            <Alert>{this.state.error}</Alert>
          )}
          <hr></hr>
          {this.fieldRendertaskDescription(this.state.task)}
          <Popup trigger={<button> Make offer</button>}>
            <div className="popUpInner">
              <label>
                <form onSubmit={this.submitHandler}>
                  <p>hourly pay:</p>
                  <input name='price' type='number' onChange={this.changeHandler}  placeholder="hourly pay" required/>
                  <p>total hours:</p>
                  <input name='totalHours' type='number' onChange={this.changeHandler}  placeholder=" Estimated Hours" required/>
                  <p>Complexity:</p>
                  <input name='complexity' type='number' onChange={this.changeHandler}  placeholder=" task complexity" required/>
                  <input type="submit" value="Submit"/>
                </form>
              </label>
            </div>
          </Popup>
          <hr></hr>
          <Chat taskId={this.state.task.id}></Chat>
          <Link to='/task/List'>
            <button>Back</button>
          </Link>
        </section>
      </Layout>
    )
  }
}
