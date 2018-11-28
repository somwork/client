import request from './request'

export default {
  /**
   * Get Currencies and if id is undefined you get all employers
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(id ? `Currencies/${id}` : 'Currencies')
    return await res.json()
  }
}
