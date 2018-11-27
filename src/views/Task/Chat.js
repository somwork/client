import React,{Component} from "react";
import Layout from '../../components/Layout';
import Task from '../../api/task';
import'./TaskView.css'

export default class Chat extends Component{

  constructor(props){
    super(props);

    this.state = {
      mesaggeInput:[{
        taskId:"",
        sendtAt:'',
        text:''
      }],
      messageList:[{taskId:"1",
      sendtAt:'22:33:11',
      text:'bla bla bla'}],
      taskId: this.props.taskId
    }

    this.loadChat(this.state.taskId);
  }

  /**
   * loads all messages from the db into the state
   */
  loadChat = async taksId=>{
    const res =await Task.getTaskMessages(taksId); //TODO
    this.setState({messageList:res})
    if(res===undefined){
      this.setState({messageList:"no Comments"})
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

  mesaggeSubmithandler = async event =>{
    event.preventDefault();

    if(!this.state){
      this.setState({ error: "Invalid input" })
      return
    }

    try {
      const res = await Task.createTaskMessage(this.state.taskId,{//TODO
        taskId: this.taskId,
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

  fieldRenderChat(message){
    return(
      <li class="chatBox">
        <label>
          <p> Id: {message.taskId}</p>
          <p>sendt at: {message.sendtAt}</p>
          <p>{message.text}</p>
        </label>
      </li>
    )
  }

  render(){
    return(
      <Layout>
        <section>
          <ul>
            {this.state.messageList.map(this.fieldRenderChat.bind(this))}
          </ul>
          <div class="chat">
            <input id='messageInput' name='text' type='text' onChange={this.changeHandler}  placeholder="enter your massage..."/>
            <input type="submit" value="send" submitHandler="mesaggeSubmithandler" class="sendbutton"/>
          </div>
      </section>
    </Layout>
    )
  }
}
