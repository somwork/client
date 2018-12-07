const ENV = process.env

export default {
  // api host
  host: ENV.REACT_APP_TASKHOUSE_HOST || 'https://localhost:5001/api/',

  // describes how often the access token should be refreshed (value is in milliseconds)
  accessTokenUpdate: 1000 * 60 * 5,

  // UpSub configuration
  upsub: {
    host: ENV.REACT_APP_UPSUB_HOST || 'ws://localhost:4400',
    id: 'taskhouse.io',
    public: ENV.REACT_APP_UPSUB_PUBLIC_KEY || 'very-public-key'
  }
}
