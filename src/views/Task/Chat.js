import React,{Component} from "react";
import Layout from '../../components/Layout';
import Task from '../../api/task';
import Offer from '../../api/offer';
import { Link } from 'react-router-dom';
import Popup from "reactjs-popup";
import'./TaskView.css'

export default class Chat extends Component{

  constructor(props){
    super(props);

    this.state = {
      mesaggeInput:[{
        sendtAt:'',
        text:''
      }],
      chatContext:[
        ["11:11:11","asdASDAS"],
        ["11:11:11","asdASDAS"],
        ["11:11:11","asdASDAS"]
      ],
      taskId: this.props.taskId
    }
      
    this.loadChat(this.state.taskId);
  }

  /**
   * loads all messages from the db into the state
   */
  loadChat = async ID=>{
    const res =await Task.getChat(); //TODO
    this.setState({chatContext:res})
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

  render(){
    return(
      <Layout>
        <section>
          <ul>
            {this.state.message.map(this.fieldRenderChat.bind(this))}
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
