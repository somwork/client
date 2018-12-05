import request from './request'

export default {
  /**
   * get specific or all estimates
   * @param  {Number}  id
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(id ? `estimates/${id}` : 'estimates')
    return res.json()
  },

  /**
   * Accept estimate
   * @param  {Number}  id
   * @return {Promise}
   */
  async accept(id) {
    const res = await request.put(`estimates/${id}/accept`)
    return res.ok
  }
}
