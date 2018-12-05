import request from './request'
import { struct } from 'superstruct'

/**
 * Defines input-types required for validation
 */
const Task = struct({
  id: 'number?',
  title: 'string',
  start: 'date',
  deadline: 'date',
  description: 'string',
  urgency: 'string',
})

export default {
  /**
   * Gets specifik task based on task id, or get full task list
   * @param {Number} id
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(id ? `tasks/${id}` : 'tasks')
    return await res.json()
  },

  /**
   * Create new Task from Json body
   * @param {Object} task
   * @return {Promise}
   */
  async create(task) {
    Task(task)
    const res = await request.post('tasks', task)
    return await res.json()
  },

  /**
   * Update existing Task, based on Json body
   * @param {Object} task
   * @return {Promise}
   */
  async update(id, task) {
    Task(task);
    const res = await request.put(`tasks/${id}`, task)
    return res.ok
  },

  /**
   * Delete exisintg task through id
   * @param {Number} id
   * @return {Promise}
   */
  async delete(id) {
    const res = await request.delete(`tasks/${id}`)
    return res.ok
  },

  /**
 * add estimate through task id
 * @param {Number} id
 * @param {Object} Estimate
 * @return {Promise}
 */
  async createEstimate(id, estimate) {
    const res = await request.post(`tasks/${id}/estimate`, estimate)
    return await res.json()
  },

  /**
   * Create message
   * @param {Object} message
   * @return {Promise}
   */
  async createMessage(taskId, message) {
    const res = await request.post(`tasks/${taskId}/messages`, message);
    return await res.json()
  },

  /**
   * Get list of messages
   * @param {Number} id
   * @param {Object} message
   * @return {Promise}
   */
  async getMessage(taskId, message) {
    const res = await request.get(taskId ? `messages/${taskId}` : message);
    return await res.json();
  }

}





