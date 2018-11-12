import request from './request'

export default {
  /**
   * Get list of all workers
   * @return {Promise}
   */
  async get() {
    const res = await request.get('workers')
    return await res.json()
  },
  /**
   * Create worker
   * @return {Promise}
   */
   async create(username,password) {
    const res = await request.post('workers', {
      Username:username,
      Password:password,
    });
    return await res.json()
  },
  /**
   * Delete worker OBS - DOESN'T WORK YET
   * @return {Promise}
   */
  //  async delete() {
  //   const res = await request.delete('workers/2',{
  //     "id": 2
  //   });
  //   return await res.json()
  // },
}
