import request from './request'
import { struct } from 'superstruct'

const Employer = struct({
  id: 'number?',
  username: 'string',
  password: 'string?',
  email: 'string',
  firstName: 'string',
  lastName: 'string',
})

export default {
  /**
   * Get employer and if id is undefined you get all employers
   * @param {Number} id
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(id ? `employers/${id}` : 'employers')
    return await res.json()
  },

  /**
   * Create employer
   * @param {Object} employer
   * @return {Promise}
   */
  async create(employer) {
    //Validate data for the body
    Employer(employer);
    const path = 'employers?password=' + employer.password
    const res = await request.post(path, employer);
    return await res.json()
  },

  /**
   * Update employer
   * @param {Object} employer
   * @return {Promise}
   */
  async update(employer) {
    //Validate data for the body
    Employer(employer);
    const res = await request.put(`employers/${employer.id}`, employer);
    return res.ok
  },

  /**
   * Delete employer
   * @param {Number} id
   * @return {Promise}
   */
  async delete(id) {
    const res = await request.delete(`employers/${id}`);
    return res.ok
  },

  /**
   * Get all tasks of employer the id
   * @param {Number} id
   * @return {Promise}
   */
  async getEmployerTasks(id) {
    const res = await request.get(`employers/${id}/tasks`)
    return await res.json()
  }
}
