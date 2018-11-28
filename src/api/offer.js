import request from './request'
import { struct } from 'superstruct'

/**
 * Defines input-types required for validation
 */
const Offer = struct({
  accepted: 'boolean',
  price: 'number',
  currency: 'string',
  totalHours:'number',
  complexity:'number',
  workerId: 'number',
  taskId: 'number',
})

export default {
  /**
   * Gets offer based on offer id or retunr all offers
   * @param {Number} id
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(id ? `offers/${id}` : 'offers')
    return await res.json()
  },

  /**
   * Create new Offer from Json body
   * @param {Object} Offer
   * @return {Promise}
   */
  async create(offer) {
    Offer(offer)
    const res = await request.post('offers', offer)
    return await res.json()
  },

  /**
   * Update existing offer, based on Json body
   * @param {Object} offer
   * @return {Promise}
   */
  async update(offer) {
    Offer(offer);
    const res = await request.update('offers', offer)
    return await res.json()
  },

  /**
   * Delete exisintg offer through id
   * @param {Number} id
   * @return {Promise}
   */
  async delete(id) {
    const res = await request.delete(`offers/${id}`)
    return await res.json()
  }
}
