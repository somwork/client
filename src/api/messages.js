import request from './request'
import { struct } from 'superstruct'

const Message = struct({
  text: 'string',
  sendAt: 'date',
  userId: 'number',
  firstName:'string',
  lastName: 'string',
  taskId: 'number',
})

export default {
  /**
   * Get message and if id is undefined you get all messages
   * @param {Number} id
   * @return {Promise}
   */
  async get(taskId) {
    const res = await request.get(`messages/${taskId}`)
    return await res.json()
  },

  /**
   * Create message
   * @param {Object} message
   * @return {Promise}
   */
  async create(taskId,message) {
    //Validate data for the body
    Message(taskId,message);
    const res = await request.post(`tasks/${taskId}/message`, message);
    return await res.json()
  },

}
