import request from './request'

export default {
  /**
   * Get list of all offers to a task
   * @param {Number} offerId
   * @return {Promise}
   */
  async get(taskId) {
    const res = await request.get(`offers/${taskId}`)
    if(res!==undefined||res!==null){
      return await res.json()
    }
    return null;
  },

  /**
   * Gets specifik offer from an offer id
   * @param {Number} offerId
   * @return {Promise}
   */
  async getSpecific(offerId) {
    const res = await request.getSpecific(`offers/${offerId}`)
    if(res!==undefined||res!==null){
      return await res.json()
    }
    return null;
  },

  /**
   * Create new offer from Json body
   * @param {Object} body
   */
  async create(body) {
    const res = await request.post('offer', body)
    return await res.json()
  },

  /**
   * Update existing offer, based on Json body
   * @param {Object} body
   */
  async update(body) {
    const res = await request.update('offers', body.json)
    return await res.json()
  },

  /**
   * Delete exisintg offer through id
   * @param {Number} id
   */
  async delete(id) {
    const res = await request.delete(`offers/${id}`)
    return await res.json()
  }
}
