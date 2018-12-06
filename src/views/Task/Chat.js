import React, { Component } from "react";
import Auth from '../../api/auth';
import Alert from '../../components/Alert';
import moment from 'moment';
import Task from "../../api/task";
import withRealtime from '../../hoc/withRealtime'

export default withRealtime(class Chat extends Component {
  state = {
    messageInput: {
      text: '',
      sendAt: '',
      userId: '',
      firstName: '',
      lastName: '',
      taskId: ''
    },
    messages: [],
    error: ''
  }

  componentDidMount() {
    this.loadMessages(this.props.taskId);
    this.props.broker.on(`message/${this.props.taskId}`, this.listenForMessages)
  }

  componentWillUnmount() {
    this.props.broker.off(`message/${this.props.taskId}`, this.listenForMessages)
  }

  /**
   * Listen for messages realtime
   * @param  {Object} msg
   */
  listenForMessages = msg => {
    this.setState({ messages: this.state.messages.concat([msg]) })
  }

  /**
   * loads all messages from the database into the state
   * @param {int} taskId
   */
  loadMessages = async taskId => {
    console.log(taskId)
    if (!taskId) {
      return
    }

    const messages = await Task.getMessages(taskId);

    this.setState({ messages: messages })
  }

  /**
   * event listener for input
   * adds changes to this.state
   * @param  {Object} event
   */
  changeHandler = event => {
    const tempMessage = { ...this.state.messageInput }
    tempMessage[event.target.name] = event.target.value
    this.setState({
      messageInput: tempMessage
    })
  }

  /**
   * event listener for Submit
   * posts a request to the server
   * @param {Object} event
   */
  SubmitHandler = async event => {
    event.preventDefault();

    try {
      const user = await Auth.user();
      const message = await Task.createMessage({
        text: String(this.state.messageInput.text),
        sendAt: moment().toDate(),
        userId: Number(Auth.id()),
        firstName: String(user.firstName),
        lastName: String(user.lastName),
        taskId: Number(this.props.taskId),
      });

      //adds the new message to the chat
      const tempMessage = [ ...this.state.messages ]
      this.props.broker.send(`message/${this.props.taskId}`, message)
      tempMessage.push(message)
      this.setState({
        messages: tempMessage,
        messageInput: { ...this.state.messageInput, text: '' },
      })
    } catch (err) {
      this.setState({ error: err.message })
    }
  }

  /**
   * Creates the list of messages from database, if there are message objects is state.
   * otherwise create an comment saying no messages.
   * @return {JSX} View
   */
  renderMessages() {
    if (this.state.messages.length === 0) {
      return (
        <div className="chatBoxScroll">
          <li className="chatBox"></li>
        </div>
      )
    }

    return (
      <div className="chatBoxScroll">
        {this.state.messages.map(message => (
          <li key={message.id} className="chatBox">
            <label key={message.id}>
              <b>{message.firstName} {message.lastName}</b>
              <span className="dateTime"> {moment(message.sendtAt).format('HH:MM DD. MMM YYYY')}</span>
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
  render() {
    return (
      <div>
        <ul>
          {this.renderMessages()}
        </ul>
        <form onSubmit={this.SubmitHandler} className="chat">
          <textarea id='messageInput' name='text' onChange={this.changeHandler} value={this.state.messageInput.text} placeholder="Enter your message..." />
          <input type="submit" value="send" className="sendbutton" />
        </form>
        {this.state.error && (
          <Alert>{this.state.error}</Alert>
        )}
      </div>
    )
  }
})
