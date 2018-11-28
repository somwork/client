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
        User: 'Object',
        taskId: 'number',
        task: 'Object',
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

  mesaggeSubmithandler = async event =>{
    event.preventDefault();

    try {
      const res = await Message.create({
        text: String(this.state.mesaggeInput.text),
        sendAt: Date(this.state.mesaggeInput.sendAt),
        userId: Number(Auth.id),
        User: Object(this.getUser()),
        taskId: Number(this.props.taskId),
        task: Object(Task.get(this.props.taksId)),
      });

      if (res.error) {
        return this.setState({ error: res.error })
      }

    } catch(err) {
      this.setState({ error: err.message })
    }
  }

  renderMessages(){
    if(this.state.messages.length===0){
      return(
      <li class="chatBox">
          <p>No messages :(</p>
      </li>
      )
    }

    return(
      <div>
        {this.state.messages.map(message=>(
          <li class="chatBox">
            <label>
              <p> Id: {message.taskId}</p>
              <p>sendt at: {moment(message.sendtAt).format('DD. MMM YYYY')}</p>
              <p>{message.text}</p>
            </label>
          </li>
        ))}
      </div>
    )
  }

  render(){
    return(
      <div>
          <ul>
            {this.renderMessages()}
          </ul>
          <div class="chat">
            <input id='messageInput' name='text' type='text' onChange={this.changeHandler}  placeholder="enter your massage..."/>
            <input type="submit" value="send" submitHandler="mesaggeSubmithandler" class="sendbutton"/>
            {this.state.error && (
            <Alert>{this.state.error}</Alert>
          )}
          </div>
      </div>
    )
  }
}
