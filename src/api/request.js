import url from 'url'
import config from '../config'

/**
 * Default fetch options
 * @type {Object}
 */
const defaultOptions = {
  headers: {
    'Content-Type': 'application/json'
  },
}

/**
 * Authorized returns true and an access token if someone is authorized
 * @return {Array}
 */
function authorized() {
  const token = localStorage.getItem('accessToken')
  return [!!token, token]
}

/**
 * Create a new fetch request
 * @param  {String} method
 * @param  {String} path
 * @param  {Mixed}  body
 * @param  {Object} [options=defaultOptions]
 * @return {Promise}
 */
function createRequest (method, path, body, options = defaultOptions) {
  const [isAuthorized, accessToken] = authorized()

  if (isAuthorized && !options.ignoreAuth) {
    options.headers.Authorization = `Bearer ${accessToken}`
  }

  return fetch(url.resolve(config.host, path), {
    method,
    body: body ? JSON.stringify(body) : undefined,
    ...options,
  })
}

export default {
  /**
   * Create a GET request
   * @param  {String} path
   * @param  {Mixed}  body
   * @param  {Object} options
   * @return {Promise}
   */
  get (path, body, options) {
    return createRequest('GET', path, body, options)
  },

  /**
   * Create a POST request
   * @param  {String} path
   * @param  {Mixed}  body
   * @param  {Object} options
   * @return {Promise}
   */
  post (path, body, options) {
    return createRequest('POST', path, body, options)
  },

  /**
   * Create a PUT request
   * @param  {String} path
   * @param  {Mixed}  body
   * @param  {Object} options
   * @return {Promise}
   */
  put (path, body, options) {
    return createRequest('PUT', path, body, options)
  },

  /**
   * Create a DELETE request
   * @param  {String} path
   * @param  {Mixed}  body
   * @param  {Object} options
   * @return {Promise}
   */
  delete (path, body, options) {
    return createRequest('DELETE', path, body, options)
  }
}
