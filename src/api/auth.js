import request from './request'
import config from '../config'
import worker from './worker'
import employer from './employer'
import qualityassurance from './qualityAssurance'

const api = { worker, employer, qualityassurance }

/**
 * Save tokens
 * @param  {Object} tokens
 */
function save({ accessToken, refreshToken }) {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

/**
 * Get saved tokens
 * @return {Object}
 */
function getTokens() {
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  }
}

/**
 * Clear all saved tokens
 */
function cleanup() {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('user')
}

/**
 * Decode base64
 * @param  {String} str
 * @return {String}
 */
function b64DecodeUnicode(str) {
  return decodeURIComponent(
    window.atob(str).split('').map(
      c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    ).join('')
  );
}

/**
 * function cache authenticated user
 */
async function cacheUser() {
  const id = auth.id()
  const type = auth.type()

  try {
    const user = await api[type].get(id)
    localStorage.setItem('user', JSON.stringify(user))
  } catch (err) {
    console.log(err)
  }
}

/**
 * Access token update interval
 * @type {interval}
 */
let accessTokenUpdate = setAccessTokenUpdateInterval()

/**
 * Set access token refresh interval
 */
function setAccessTokenUpdateInterval() {
  if (accessTokenUpdate) {
    accessTokenUpdate = clearInterval(accessTokenUpdate)
  }

  const { accessToken, refreshToken } = getTokens()

  if (!accessToken || !refreshToken) {
    return
  }

  accessTokenUpdate = setInterval(
    () => auth.refresh(),
    config.accessTokenUpdate
  )
}

const auth = {
  /**
   * Authorize with username and passworkd and get a access token and
   * refresh token back
   * @param  {String}  username
   * @param  {String}  password
   * @return {Promise}
   */
  async login(username, password) {
    const res = await request.post('token', { username, password })

    if (!res.ok) {
      throw new Error('invalid credentials')
    }

    save(await res.json())
    setAccessTokenUpdateInterval()
    requestIdleCallback(cacheUser)
  },

  /**
   * Refresh access token with the corresponding refresh token
   * @return {Promise}
   */
  async refresh() {
    const res = await request.put('token', getTokens(), {
      ignoreAuth: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (res.status > 300) {
      this.logout()
      window.location.href = '/login'
      return
    }

    save(await res.json())
    requestIdleCallback(cacheUser)
  },

  /**
   * Clear saved access token and refresh token and invalidate them server side
   * @return {Promise}
   */
  async logout() {
    clearInterval(accessTokenUpdate)
    cleanup()
    // TODO make a call to the server, this should invalidate the current active
    // accessToken and refreshToken
  },

  /**
   * Check wether a user is authenticated
   * @return {Boolean}
   */
  ok() {
    const { accessToken, refreshToken } = getTokens()
    return accessToken && refreshToken
  },

  /**
   * Get id of authenticated user
   * @return {Number}
   */
  id() {
    const { accessToken } = getTokens()
    const id = JSON.parse(b64DecodeUnicode(accessToken.split('.')[1]))["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"]
    return Number(id)
  },

  /**
   * Get type of the authenticated user
   * @return {String}
   */
  type() {
    const { accessToken } = getTokens()
    const type = JSON.parse(b64DecodeUnicode(accessToken.split('.')[1]))["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"]
      .replace("TaskHouseApi.Model.", "")
      .toLowerCase()

    return type
  },

  /**
   * Get authenticated user
   * @return {Object}
   */
  async user() {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'))
    }

    await cacheUser()
    return this.user()
  },
}

export default auth
