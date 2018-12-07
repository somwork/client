import request from './request'
import { struct } from 'superstruct'

const Worker = struct({
  id: 'number?',
  username: 'string',
  password: 'string?',
  email: 'string',
  firstName: 'string',
  lastName: 'string',
})

const Location = struct({
  id: 'number?',
  country: 'string',
  city: 'string',
  zipCode: 'number',
  primaryLine: 'string',
  secondaryLine: 'string?',
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
  async create(worker, location) {
    //Validate data for the body
    Worker(worker);
    Location(location);
    const res = await request.post('workers', { user: worker, location, password: worker.password });
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
  },

  /**
   * Get all accepted tasks for a worker with id
   * @param {Number} id
   * @return {Promise}
   */
  async getAcceptedTasks(id) {
    const res = await request.get(`workers/${id}/tasks/accepted`)
    return await res.json()
  },

  /**
   * Get all accepted tasks for a worker with id
   * @param {Number} id
   * @return {Promise}
   */
  async getEstimatedTasks(id) {
    const res = await request.get(`workers/${id}/tasks/estimated`)
    return await res.json()
  },

  /**
   * Get all accepted tasks for a worker with id
   * @param {Number} id
   * @return {Promise}
   */
  async getAvailableTasks() {
    const res = await request.get(`workers/tasks`)
    return await res.json()
  },

  /**
   * Get all skills of worker with id
   * @param {Number} id
   * @return {Promise}
   */
  async getSkills(id) {
    const res = await request.get(`workers/${id}/skills`)
    return await res.json()
  }
}
