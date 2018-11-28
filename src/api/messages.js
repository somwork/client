import request from './request'
  ///DELETE THIS FILE BEFORE MEREGE!!!!

export default {
  /**
   * Get a Currencie and if id is undefined you get all Currencies
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(id ? `currencies/${id}` : 'currencies')
    return null;
  },
  async create(message){
    console.log(message)
    return null;
  }
  ///DELETE THIS FILE BEFORE MEREGE!!!!
}
