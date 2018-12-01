import request from './request'
import { struct } from 'superstruct'

const Skill = struct({
  id: 'number?',
  title: 'string'
})

export default {
  /**
   * Create skill
   * @param {Object} skill
   * @return {Promise}
   */
  async create(skill) {
    //Validate data for the body
    Skill(skill);
    const path = 'skills?password=' + skill.password;
    const res = await request.post(path, skill);
    return await res.json()
  },

  /**
   * Delete worker
   * @param {Number} id
   * @return {Promise}
   */
  async delete(id) {
    const res = await request.delete(`workers/${id}`);
    return res.ok
  }
}
