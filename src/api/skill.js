import request from './request'
import { struct } from 'superstruct'

const Skill = struct({
  id: 'number?',
  title: 'string',
  categoryId: "number"
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
    const res = await request.post("skills", skill);
    return await res.json()
  },

  /**
   * Delete skill
   * @param {Number} id
   * @return {Promise}
   */
  async delete(id) {
    const res = await request.delete(`skills/${id}`);
    return res.ok
  }
}
