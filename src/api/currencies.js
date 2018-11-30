import request from './request'

export default {
  /**
   * Get a Currencie and if id is undefined you get all Currencies
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(id ? `currencies/${id}` : 'currencies')
    return await res.json()
  }
}
