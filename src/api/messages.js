import request from './request'
import { struct } from 'superstruct'

      const Message = struct({
          mesaggeInput:{
            text: 'string',
            sendAt: 'date',
            userId: 'number',
            firstName:'string',
            lastName: 'string',
            taskId: 'number'
          }
        })

export default {
  /**
   * Get a Currencie and if id is undefined you get all Currencies
   * @return {Promise}
   */
  async get(id) {
    const res = await request.get(id ? `messages/${id}` : 'messages')//ERROR here
    return res;
  },
  async create(message){
    Message(message)
    const res = await request.post('messages', message)
    return await res.json()
  }
}
