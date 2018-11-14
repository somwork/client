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
   * @param {Object} username and password
   * @return {Promise}
   */
   async create(username,password) {
    const res = await request.post('workers', {
      Username:username,
      Password:password,
    });
    return await res.json()
  },

  /**
   * Update worker
   * @param {Object} body
   * @return {Promise}
   */
   async update(body) {
    const res = await request.put(`workers/${body.id}`, body);
    return await res.ok
  },

  /**
   * Delete worker
   * @param {Number} id
   * @return {Promise}
   */
   async delete(id) {
    const res = await request.delete(`workers/${id}`);
    return await res.ok
  },
}
