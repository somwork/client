import request from './request'
import { struct } from 'superstruct'

const Budget = struct({
  id: 'number?',
  from: 'number',
  to: 'number',
  currency: 'string',
})

export default {
  /**
   * Get budget and if id is undefined you get all budget
   * @param {Number} id
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(id ? `budgets/${id}` : 'budgets')
    return await res.json()
  },

  /**
   * Create budget
   * @param {Object} budget
   * @return {Promise}
   */
  async create(budget) {
    //Validate data for the body
    Budget(budget);
    const res = await request.post('budgets', budget);
    return await res.json()
  },

  /**
   * Update budget
   * @param {Object} budget
   * @return {Promise}
   */
  async update(budget) {
    //Validate data for the body
    Budget(budget);
    const res = await request.put(`budgets/${budget.id}`, budget);
    return await res.json()
  },

  /**
   * Delete budget
   * @param {Number} id
   * @return {Promise}
   */
  async delete(id) {
    const res = await request.delete(`budgets/${id}`);
    return await res.json()
  }
}
