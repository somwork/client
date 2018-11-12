import request from './request'
export default {
  /**
   * Get list of all tasks
   * @return {Promise}
   */
  async get() {
    const res = await request.get('tasks');
    return await res.json();
  }
}
