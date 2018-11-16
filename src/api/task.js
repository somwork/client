import request from './request'
import { struct } from 'superstruct'

const Task = struct({
  startDate: 'date',
  endDate: 'date',
  title: 'string',
  description: 'string',
  urgency: 'string',
})

export default {
  /**
   * Gets specifik task based on task id, or get full task list
   * @param {Number} id
   */
  async get(id) {
    const res = await request.get(id ? `tasks/${id}` : 'tasks')
    return await res.json()
  },

  /**
   * Create new Task from Json body
   * @param {Object} task
   */
  async create(task) {
    Task(task);
    const res = await request.post('tasks', task)
    return await res.json()
  },

  /**
   * Update existing Task, based on Json body
   * @param {Object} task
   */
  async update(task) {
    Task(task);
    const res = await request.update('tasks', task)
    return await res.json()
  },

  /**
   * Delete exisintg task through id
   * @param {Number} id
   */
  async delete(id) {
    const res = await request.delete(`tasks/${id}`)
    return await res.json()
  }
}
