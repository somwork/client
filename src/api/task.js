import request from './request'
import { struct } from 'superstruct'

/**
 * Defines input-types required for validation
 */
const Task = struct({
  title: 'string',
  startDate: 'date',
  endDate: 'date',
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
    const res = await request.update('tasks', task)
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
  },

  /**
   * Validates data through superstruct,
   * and both handle and throws errors.
   * Validation moved outside of create-method due to
   * issues with exception-handling in asynchronous context
   * @param {Object} task
   */
  validateInput(task) {
    try {
      Task(task);

    }
    catch (e) {
      const { path, value } = e
      const key = path[0]

      if (value === undefined) {
        const error = new Error(`task_${key}_required`)
        error.attribute = key
        throw error
      }

      const error = new Error(`task_${key}_invalid`)
      error.attribute = key
      error.value = value
      throw error
    }

  }
}
