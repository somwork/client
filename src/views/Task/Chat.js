import React, { Component } from "react";
import Auth from '../../api/auth';
import Alert from '../../components/Alert';
import moment from 'moment';
import Task from "../../api/task";
import withRealtime from '../../hoc/withRealtime'

export default withRealtime(class Chat extends Component {
  state = {
    message: '',
    messages: [],
    error: ''
  }

  submit = null

  /**
   * Setup listeners
   */
  componentDidMount() {
    this.loadMessages(this.props.taskId);
    this.props.broker.on(`message/${this.props.taskId}`, this.listenForMessages)
  }

  /**
   * Clean up and remove event listeners
   */
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
    this.setState({
      message: event.target.value
    })
  }

  /**
   * event listener for Submit
   * posts a request to the server
   * @param {Object} event
   */
  SubmitHandler = async event => {
    event.preventDefault();

    if (this.state.message.trim().length === 0) {
      return
    }

    try {
      const user = await Auth.user();
      const message = await Task.createMessage({
        text: String(this.state.message),
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
        message: '',
      }, () => {
        document.querySelector('.view').scrollTop = document.querySelector('.view').scrollHeight;
      })
    } catch (err) {
      this.setState({ error: err.message })
    }
  }

  /**
   * Handle enter key
   * @param  {Event} event
   */
  handleEnter = event => {
    if (event.keyCode !== 13) {
      return
    }

    if (event.shiftKey) {
      return
    }

    this.submit.click()
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
          <li className="chatBox">
            <center>
              <h3 className='secondary'>Say hello <span role='img' aria-label='jsx-a11y/accessible-emoji'>👋</span></h3>
            </center>
          </li>
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
              <pre>{message.text}</pre>
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
          {this.state.error && (
            <Alert>{this.state.error}</Alert>
          )}
          <div>
            <textarea
              id='messageInput'
              name='text'
              onChange={this.changeHandler}
              value={this.state.message}
              placeholder="Enter your message..."
              onKeyUp={this.handleEnter}
            />
            <input ref={s => this.submit = s} type="submit" value="send" className="sendbutton" />
          </div>
        </form>
      </div>
    )
  }
})
