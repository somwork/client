import request from './request'

export default {

  async get(id) {
    const res = await request.get("tasks/" + id)
    return await res.jason
  }

}
