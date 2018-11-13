import request from './request'

export default {
  /**
   * Get list of all tasks
   * @return {Promise}
   */
  async get() {
    const res = await request.get('tasks');
    return await res.json();
  },
  async getSpecific(Id) {
    const res = await request.get('tasks/'+Id);
    return await res.json();
  },
  async post (body, options){
    const res = await request.post('https://localhost:5001/api/tasks/',body);
  }
}
