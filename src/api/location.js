import request from './request'

export default {
  /**
   * Get location and if id is undefined you get all locations
   * @param {Number} id
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(id ? `locations/${id}` : 'locations')
    return await res.json()
  },

  /**
   * Create location
   * @param {Object} location
   * @return {Promise}
   */
  async create(location) {
    const res = await request.post('locations', location);
    return await res.json()
  },

  /**
   * Update location
   * @param {Object} location
   * @return {Promise}
   */
  async update(location) {
    const res = await request.put(`locations/${location.id}`, location);
    return res.ok
  },

  /**
   * Delete location
   * @param {Number} id
   * @return {Promise}
   */
  async delete(id) {
    const res = await request.delete(`locations/${id}`);
    return res.ok
  }
}
