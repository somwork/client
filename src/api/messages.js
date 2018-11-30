import request from './request'
import { struct } from 'superstruct'

const Message = struct({
  text: 'string',
  sendAt: 'date',
  userId: 'number',
  firstName:'string',
  lastName: 'String',
  taskId: 'number',
})

export default {
  /**
   * Get message and if id is undefined you get all messages
   * @param {Number} id
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(id ? `messages/${id}` : 'messages')
    return await res.json()
  },

  /**
   * Create message
   * @param {Object} message
   * @return {Promise}
   */
  async create(message) {
    //Validate data for the body
    Message(message);
    const res = await request.post('messages/', message);
    return await res.json()
  },

  /**
   * Update message
   * @param {Object} message
   * @return {Promise}
   */
  async update(message) {
    //Validate data for the body
    Message(message);
    const res = await request.put(`messages/${message.id}`, message);
    return res.ok
  },

  /**
   * Delete message
   * @param {Number} id
   * @return {Promise}
   */
  async delete(id) {
    const res = await request.delete(`messages/${id}`);
    return res.ok
  }
}
