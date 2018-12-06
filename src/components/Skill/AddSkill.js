import React, { Component } from 'react'
import Alert from '../../components/Alert'
import camelcase from 'camelcase'
import { withRouter } from 'react-router-dom'
import category from '../../api/category'

export default withRouter(class Create extends Component {
  state = {
    title: '',
    categories: [],
    currentCategory: 1,
  }

  /**
  * This function is called when the component is mounted to the DOM.
  * when the component is mounted we get the budgets
  */
  componentDidMount() {
    this.getCategories();
  }

  /**
   * Get existing budgets from database and add them to state
   */
  async getCategories() {
    this.setState({
      categories: await category.get()
    })
  }

  fields = [
    //["label", "Type", Validation method, isTextArea]
    ["Title", "text", v => v.length > 0, false]
  ]

  /**
   * Validates input based on validation method defined in Fields[]
   * @return {boolean}
   */
  validator = () => {
    for (const [label, _, validator] of this.fields) { // eslint-disable-line
      if (!validator(this.state[camelcase(label)])) {
        return false
      }
    }
    return true
  }

  /**
   * Renders input fields based on definitions in fields[]
   * @param {String} label
   * @param {Mixed} type
   * @param {Method} validator
   * @param {boolean} isTextArea
   * @return {JSX} an input surrounded with a label
   */
  fieldRender([label, type, validator, isTextArea]) {
    const name = camelcase(label);
    if (isTextArea === true) {
      return (
        <label key={name}>
          {label}
          <textarea
            name={name}
            value={this.state[name]}
            onChange={this.handleChange}
            className={validator(this.state[name]) ? "valid" : ""}
            required
          />
        </label>
      )
    }

    return (
      <label key={name}>
        {label}
        <input
          name={name}
          type={type}
          value={this.state[name]}
          onChange={this.handleChange}
          className={validator(this.state[name]) ? "valid" : ""}
          required
        />
      </label>
    )
  }

  /**
   * Sets state data when changes are made in text-inputs
   * @param {Event} event
   */
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  /**
   * Handels the add skill submit
   */
  submitHandler = () => {
    this.props.onAddSkill(this.state.title, Number(this.state.currentCategory))
    this.setState({ title: "" });
  }

  /**
  * Renders categories inputs
  * @param {number} id
  * @param {number} from
  * @param {number} to
  * @return {JSX} an input surrounded with a label
  */
  renderCategories({ id, title }) {
    return (
      <option key={id} value={id}>{title}</option>
    )
  }

  /**
   * Creates the add skill
   * @return {JSX} View
   */
  render() {
    return (
      <div>
        <h2>Create Skill</h2>
        {this.state.error && (
          <Alert>{this.state.error} </Alert>
        )}
        <form onSubmit={this.submitHandler}>
          {this.fields.map(this.fieldRender.bind(this))}
          <label>
            Select category:
            <select value={this.state.currentCategory} onChange={this.handleChange} name="currentCategory">
              {this.state.categories.map(this.renderCategories.bind(this))}
            </select>
          </label>
        </form>
        <input type="submit" value="Create Task" onClick={this.submitHandler} />
      </div>
    )
  }
})
