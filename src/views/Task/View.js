import React, { Component } from "react";
import Layout from '../../components/Layout';
import Task from '../../api/task';
import currencies from '../../api/currencies';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import'./TaskView.css'
import moment from 'moment';
import Alert from '../../components/Alert';

export default class View extends Component {

  constructor(props) {
    super(props);

    this.state={
      task:{
        id:'',
        start:'',
        deadline:'',
        urgency:'',
        description:'',
        title:''
      },
      estimate:{
        price:'',
        totalHours:'',
        currency:'',
        complexity:'',
      },
      error:''
    }
  }

  /**
   * Loads all tasks into state when componet mount
   */
  componentDidMount(){
    this.loadtasks(this.props.match.params.id);
  }

  /**
   *loads the selected task from the database into the state
   * @param {int} id
   */

  loadTasks = async id => {
    const res = await Task.get(id);
    if(res=== null){
      return null;
    }
    this.setState({task:res})
  }

  /**
   * event listener for input
   * adds changes to this.state
   * @param  {Object} event
   */
  changeHandler = event => {
    const tempestimate = {...this.state.estimate }
    tempestimate[event.target.name] = event.target.value
    this.setState({
        estimate:tempestimate
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
      await Task.createEstimate(this.state.task.id, {
        price: Number(this.state.estimate.price),
        totalHours: Number(this.state.estimate.totalHours),
        currency: 'DKK',
        complexity: Number(this.state.estimate.complexity),
      });
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
          <hr/>
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
  render() {
    return (
      <Layout>
        <section>
          <h1>{this.state.task.title}</h1>
          <h3>task Details</h3>
          {this.state.error && (
            <Alert>{this.state.error}</Alert>
          )}
          <hr/>
          {this.fieldRendertaskDescription(this.state.task)}
          <Popup trigger={<button> Make estimate</button>}>
            <div className='popUpInner'>
              <label>
                <form onSubmit={this.submitHandler}>
                  <p><b>hourly pay:</b></p>
                  <input name='price' type='number' onChange={this.changeHandler}  placeholder="Hourly pay..." required/>
                  <p><b>total hours:</b></p>
                  <input name='totalHours' type='number' onChange={this.changeHandler}  placeholder="Man Hours..." required/>
                  <p> <b>Task Complexity:</b></p>
                  <input name='complexity' type='number' onChange={this.changeHandler}  placeholder="Complexity..." required/>
                  <input type="submit" value="Submit"/>
                </form>
              </label>
            </div>
          </Popup>
          <hr/>
          <Link to='/task/List'>
            <button>Back</button>
          </Link>
        </section>
      </Layout>
    )
  }
}
