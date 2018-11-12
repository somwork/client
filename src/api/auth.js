import request from './request'
import config from '../config'

/**
 * Save tokens
 * @param  {Object} tokens
 */
function save ({ accessToken, refreshToken }) {
  localStorage.setItem('accessToken', accessToken)
  localStorage.setItem('refreshToken', refreshToken)
}

/**
 * Get saved tokens
 * @return {Object}
 */
function getTokens () {
  return {
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken')
  }
}

/**
 * Clear all saved tokens
 */
function clearTokens () {
  localStorage.removeItem('accessToken')
  localStorage.removeItem('refreshToken')
}

/**
 * Access token update interval
 * @type {interval}
 */
let accessTokenUpdate = setAccessTokenUpdateInterval()

/**
 * Set access token refresh interval
 */
function setAccessTokenUpdateInterval () {
  if (accessTokenUpdate) {
    clearInterval(accessTokenUpdate)
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
  async login (username, password) {
    const res = await request.post('token', { username, password })

    if (!res.ok) {
      throw new Error('invalid credentials')
    }

    save(await res.json())
    setAccessTokenUpdateInterval()
  },

  /**
   * Refresh access token with the corresponding refresh token
   * @return {Promise}
   */
  async refresh () {
    const res = await request.put('token', getTokens(), {
      ignoreAuth: true,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!res.ok) {
      throw new Error('token could not be refreshed')
    }

    save(await res.json())
  },

  /**
   * Clear saved access token and refresh token and invalidate them server side
   * @return {Promise}
   */
  async logout () {
    clearInterval(accessTokenUpdate)
    clearTokens()
    // TODO make a call to the server, this should invalidate the current active
    // accessToken and refreshToken
  }
}

export default auth
