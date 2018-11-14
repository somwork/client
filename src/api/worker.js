import request from './request'

export default {
  /**
   * Get list of all workers
   * @return {Promise}
   */
  async get() {
    const res = await request.get('workers')
    return await res.json()
  },

  /**
   * Get worker
   * @param {Number} id
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(`workers/${id}`)
    return await res.json()
  },

  /**
   * Create worker
   * @param {Object} worker
   * @return {Promise}
   */
  async create(worker) {
     const res = await request.post('workers', worker);
     return await res.json()
  },

  /**
   * Update worker
   * @param {Object} worker
   * @return {Promise}
   */
  async update(worker) {
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
}
