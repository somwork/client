import request from './request'
import { struct } from 'superstruct'

const Worker = struct({
  id: 'number?',
  username: 'string',
  password: 'string',
  email: 'string',
  firstName: 'string',
  lastName: 'string',
})

export default {
  /**
   * Get worker and if id is undefined you get all workers
   * @param {Number} id
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(id ? `workers/${id}` : 'workers')
    return await res.json()
  },

  /**
   * Create worker
   * @param {Object} worker
   * @return {Promise}
   */
  async create(worker) {
    //Validate data for the body
    Worker(worker);
    const res = await request.post('workers', worker);
    return await res.json()
  },

  /**
   * Update worker
   * @param {Object} worker
   * @return {Promise}
   */
  async update(worker) {
    //Validate data for the body
    Worker(worker);
    const res = await request.put(`workers/${worker.id}`, worker);
    return res.ok
  },

  /**
   * Delete worker
   * @param {Number} id
   * @return {Promise}
   */
  async delete(id) {
    const res = await request.delete(`workers/${id}`);
    return res.ok
  }
}
