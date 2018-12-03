import request from './request'
import { struct } from 'superstruct'

/**
 * Defines input-types required for validation
 */
const Task = struct({
  title: 'string',
  start: 'date',
  deadline: 'date',
  description: 'string',
  urgencystring: 'string',
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
  async update(task) {
    Task(task);
    const res = await request.put('tasks', task)
    return await res.json()
  },

  /**
   * Delete exisintg task through id
   * @param {Number} id
   * @return {Promise}
   */
  async delete(id) {
    const res = await request.delete(`tasks/${id}`)
    return await res.json()
  }
}
