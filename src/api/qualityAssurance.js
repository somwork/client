import request from './request'
import { struct } from 'superstruct'

const QualityAssurance = struct({
  id: 'number?',
  username: 'string',
  password: 'string?',
  email: 'string',
  firstName: 'string',
  lastName: 'string',
})

export default {
  /**
   * Get qualityassurance and if id is undefined you get all qualityassurances
   * @param {Number} id
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(id ? `qualityassurances/${id}` : 'qualityassurances')
    return await res.json()
  },

  /**
   * Create qualityassurance
   * @param {Object} qualityassurance
   * @return {Promise}
   */
  async create(qualityassurance) {
    //Validate data for the body
    QualityAssurance(qualityassurance);
    const path = 'qualityassurances?password=' + qualityassurance.password
    const res = await request.post(path, qualityassurance);
    return await res.json()
  },

  /**
   * Update qualityassurance
   * @param {Object} qualityassurance
   * @return {Promise}
   */
  async update(qualityassurance) {
    //Validate data for the body
    QualityAssurance(qualityassurance);
    const res = await request.put(`qualityassurances/${qualityassurance.id}`, qualityassurance);
    return res.ok
  },

  /**
   * Delete qualityassurance
   * @param {Number} id
   * @return {Promise}
   */
  async delete(id) {
    const res = await request.delete(`qualityassurances/${id}`);
    return res.ok
  }
}
