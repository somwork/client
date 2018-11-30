import React,{Component} from "react";
import Task from '../../api/task';
import Message from '../../api/messages';
import'./TaskView.css'
import Auth from '../../api/auth';
import Alert from '../../components/Alert';
import moment from 'moment';
import Worker from '../../api/worker'
import Employer from '../../api/employer'

export default class Chat extends Component{

  constructor(props){
    super(props);

    this.state = {
      mesaggeInput:[{
        text: 'string',
        sendAt: 'date',
        userId: 'number',
        firstName:'string',
        lastName: 'String',
        taskId: 'number'
      }],
      messages:[],
      error:''
    }
  }

  componentDidMount () {
    this.loadMessages(this.props.taskId);
  }

  /**
   * loads all messages from the database into the state
   * @param {int} taskId
   */
  loadMessages = async taksId=>{
    const res =await Message.get(taksId);
    this.setState({messages:res})
  }

  /**
   * event listener for input
   * adds changes to this.state
   * @param  {Object} event
   */
  changeHandler = event => {
    const tempMessage = JSON.parse(JSON.stringify(this.state.mesaggeInput))
    tempMessage[event.target.name] = event.target.value
    this.setState({
       mesaggeInput:tempMessage
    })
  }
  /**
   * Checks if the active user is an worker or employer
   * @return {Object} user
   */
  getUser(){ //TODO
    if(Auth.type===Worker){
      return Worker.get(Auth.id);
    }
    if(Auth.type===Employer){
      return Employer.get(Auth.id);
    }
    this.setState({
      error:"active user has no user tpye"
    })
  }

  /**
   * event listener for Submit
   * posts a request to the server
   * @param {Object} event
   */
  SubmitHandler = async event =>{
    console.log("submit clicked")
    event.preventDefault();

    try {
      const res = await Message.create({
        text: String(this.state.mesaggeInput.text),
        sendAt: Date(this.state.mesaggeInput.sendAt),
        userId: Number(Auth.id),
        firstName: String(Auth.user.firstName),
        lastName: String(Auth.user.lastName),
        taskId: String(this.props.taskId),
      });
      console.log(res);
      if (res.error) {
        return this.setState({ error: res.error })
      }

    } catch(err) {
      this.setState({ error: err.message })
    }

  }
  /**
   * creates the list og messages, if there are message objects is state, otherwise create an item saying no messages
   * @return {JSX} View
   */
  renderMessages(){
    if(this.state.messages===null || this.state.messages.length===0){
      return(
      <li className="chatBox">
          <p>No messages :(</p>
      </li>
      )
    }

    return(
      <div>
        {this.state.messages.map(message=>(
          <li key ={message.id} className="chatBox">
            <label key ={message.id}>
              <p> <b>{message.firstName} {message.lastName}</b></p>
              <p>sendt at: {moment(message.sendtAt).format('DD. MMM YYYY')}</p>
              <p>{message.text}</p>
            </label>
          </li>
        ))}
      </div>
    )
  }

  /**
   * Creates the messages list
   * @return {JSX} View
   */
  render(){
    return(
      <div>
          <ul>
            {this.renderMessages()}
          </ul>
          <form onSubmit={this.SubmitHandler} className="chat">
            <input id='messageInaput' name='text' type='text' onChange={this.changeHandler}  placeholder="enter your massage..."/>
            <input type="submit" value="send" className="sendbutton"/>
          </form>
            {this.state.error && (
            <Alert>{this.state.error}</Alert>
          )}

      </div>
    )
  }
}
