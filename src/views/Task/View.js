import React,{Component} from "react";
import Layout from '../../components/Layout';
import Task from '../../api/task';
import Offer from '../../api/offer';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import'./TaskView.css'

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
      }],
      mesaggeInput:[{
        sendtAt:'',
        text:''
      }],
      message:[["11:11:11","asdASDAS"],["11:11:11","asdASDAS"],["11:11:11","asdASDAS"]],

      error: null
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
   * loads all messages from the db into the state
   */
  loadChat = async ()=>{
    const res =await Task.getChat(); //TODO
    this.setState({message:res})
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
        accepted: '',
        price: this.state.offer.price,
        currency: '', //TODO
        workerId: '',//TODO
        taskId: this.state.Task.id,
      });

      if (res.error) {
        return this.setState({ error: res.error })
      }

    } catch(err) {
      this.setState({ error: err.message })
    }
  }

  mesaggeSubmithandler = async event =>{
    event.preventDefault();

    if(!this.state){
      this.setState({ error: "Invalid input" })
      return
    }

    try {
      const res = await Task.createMessage({//TODO
        sendtAt: this.mesaggeInput.sendtAt,
        text: this.mesaggeInput.text
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
            {task.id} !2345!
            </div>
          </div>
          <div>
            <b>published</b>
            <div>
            {task.start} 11:11:12
            </div>
          </div>
          <div>
            <b>Deadline</b>
            <div>
            {task.deadline} 99:99:99
            </div>
          </div>
          <div>
            <b>Urgency</b>
            <div >
            {task.urgency}! FIRE!
            </div>
          </div>
          </div>
          <div>
          <hr></hr>
          <p><h6>Task Description:</h6></p>
          <p>{task.description}</p> <p>TEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST DATATEST </p>
          </div>
      </label>
    )
  }

  fieldRenderChat(message){
    return(
      <li class="chatBox">
        <label>
          <p>sendt at: {message.sendtAt}</p>
          <p> TEMP CHAT TEXT BLA BLA BLA{message.text}</p>
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
          <h1>Title Task</h1>
          <h3>Taks Details</h3>
          <hr></hr>
          {this.fieldRenderTaskDescription(this.state.Task)}

          <Popup trigger={<button> Make offer</button>}>
            <div>
              <label>
                <input name='price:' type='number' onChange={this.changeHandler}  placeholder=" Estimated Hours" required/>
                <input type="submit" value="Submit" submitHandler="offerSubmitHandler"/>
              </label>
            </div>
          </Popup>
          <hr></hr>

          <ul>
          {this.state.message.map(this.fieldRenderChat.bind(this))}
          </ul>
          <div class="chat">
          <input name='text' type='text' onChange={this.changeHandler}  placeholder="enter your massage..."/>
          <input type="submit" value="send" submitHandler="mesaggeSubmithandler" class="sendbutton"/>
          </div>
          <Link to='/task/List'>
            <button>Back</button>
          </Link>
        </section>
      </Layout>
    )
  }
}
