import request from './request'
import { struct } from 'superstruct'

const Category = struct({
  id: 'number?',
  title: 'string',
  description: 'string'
})

export default {
  /**
   * Get category and if id is undefined you get all categories
   * @param {Number} id
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(id ? `categories/${id}` : 'categories')
    return await res.json()
  },

  /**
   * Create category
   * @param {Object} category
   * @return {Promise}
   */
  async create(category) {
    //Validate data for the body
    Category(category);
    const res = await request.post("categories", category);
    return await res.json()
  },

  /**
   * Delete category
   * @param {Number} id
   * @return {Promise}
   */
  async delete(id) {
    const res = await request.delete(`categories/${id}`);
    return res.ok
  }
}
