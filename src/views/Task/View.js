import React,{Component} from "react";
import Layout from '../../components/Layout';
import Task from '../../api/task';
import Offer from '../../api/offer';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";

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
        currency:'',
        workerId:'',
        taskId:''
      }]
    }
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
  submitHandler= async event =>{
    event.preventDefault();

    if(!this.state.offer.price>0){
      this.setState({ error: "Invalid input" })
      return
    }

    try {
      const res = await Offer.create({
        accepted: '',
        price: this.state.offer.price,
        currency: '', //TODO
        workerId: '',//TOD
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
            {this.fieldRender(this.state.Task)}
          </ul>
            <Popup trigger={<button> Make offer</button>}>
              <div>
                <label>
                  <input
                    name='price:'
                    type='number'
                    onChange={this.changeHandler}
                    required
                  />
                  <input type="submit" value="Submit"/>
                </label>
              </div>
            </Popup>
          <button>Chat</button>
          <Link to='/task/List'>
            <button>Back</button>
          </Link>
        </section>
      </Layout>
    )
  }
}
