import request from './request'

export default {
  /**
   * Get worker and if id is undefined you get all workers
   * @param {Number} id
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(`users/${id}`)
    return await res.json()
  },
}
