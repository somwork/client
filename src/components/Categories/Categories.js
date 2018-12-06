import React, { Component } from "react";
import task from '../../api/task';
import auth from '../../api/auth';
import categories from '../../api/category'

export default class Categories extends Component {
  state = {
    categories: [],
    allCategories: [],
    currentCategory: 1,
    showAddCategory: false,
    error: null
  }

  /**
  * Component setup
  */
  async componentDidMount() {
    await this.getCategories()
    this.loadAllCategories();
  }

  /**
   * Get categories
   * @return {Promise}
   */
  getCategories = async () => {
    await this.setState({ categories: await task.getCategories(this.props.taskId) })
  }

  /**
   * Load all categories
   */
  loadAllCategories = async () => {
    if (auth.type() === "employer") {
      this.setState({
        allCategories: await categories.get()
      })
    }
  }

  /**
   * Handle add categories event
   */
  handleAddCategoies = () => {
    this.setState({ showAddCategory: !this.state.showAddCategory })
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
  * Add a categories
  */
  submitAddCategori = async () => {
    const categories = [...this.state.categories]
    if (this.isIdInCategories(this.state.currentCategory)) {
      return
    }
    await task.addCategory(this.props.taskId, this.state.currentCategory)
    this.setState({ showAddCategory: false });
    const title = this.state.allCategories[this.state.currentCategory - 1].title
    categories.push({ title, id: categories.length + 1 })
    this.setState({ categories: categories })
  }

  /**
   * Checks if category is in categories
   * @param {number} id
   * @return {boolean}
   */
  isIdInCategories(id) {
    let result = false
    this.state.categories.forEach(element => {
      if (element.id === id) {
        result = true
      }
    });
    return result
  }

  /**
  * Renders categories inputs
  * @param {number} id
  * @param {string} title
  * @return {JSX} an input surrounded with a label
  */
  renderCategories({ id, title }) {
    return (
      <option key={id} value={id}>{title}</option>
    )
  }

  /**
   * Render add section
   * @return {JSX}
   */
  renderAddSection() {
    if (auth.id() === this.props.employerId) {
      return (
        <div>
          <input type="submit" value="Add Category" onClick={this.handleAddCategoies} />
          {this.state.showAddCategory ?
            < div >
              <h4>Add category</h4>
              <form onSubmit={this.submitAddCategori}>
                <label>
                  Select category:
            <select value={this.state.currentCategory} onChange={this.handleChange} name="currentCategory">
                    {this.state.allCategories.map(this.renderCategories.bind(this))}
                  </select>
                </label>
              </form>
              <input type="submit" value="Add category" onClick={this.submitAddCategori} />
            </div> :
            null
          }
        </div>
      );
    }
    return null
  }

  /**
   * Creates the categories list
   * @return {JSX} View
   */
  render() {
    return (
      <div>
        <h4>Categories</h4>
        {this.renderAddSection()}
        <ul>
          {this.state.categories.map(category => (
            <li key={category.id}>
              <h5>{category.title}</h5>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
