export default {
  // api host
  host: 'https://localhost:5001/api/',

  // describes how often the access token should be refreshed (value is in milliseconds)
  accessTokenUpdate: 1000 * 60 * 5,

  // UpSub configuration
  upsub: {
    host: 'ws://localhost:4400',
    id: 'taskhouse.io',
    public: 'very-public-key'
  }
}
