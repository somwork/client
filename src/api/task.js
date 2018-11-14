import request from './request'

export default {
  /**
   * Get list of all tasks
   * @return {Promise}
   */
  async get() {
    const res = await request.get('tasks')
    return await res.json()
  },

  /**
   * Gets specifik task based on task id
   * @param {Number} id
   */
  async get(id) {
    const res = await request.get(`tasks/${id}`)
    return await res.json()
  },

  /**
   * Create new Task from Json body
   * @param {Object} body
   */
  async create(body) {
    const res = await request.post('tasks', body)
    return await res.json()
  },

  /**
   * Update existing Task, based on Json body
   * @param {Object} body
   */
  async update(body) {
    const res = await request.update('tasks', body.json)
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
