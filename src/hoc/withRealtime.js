import React from 'react'
import Client from '@upsub/client'
import config from '../config'

const client = new Client(config.upsub.host, {
  appID: config.upsub.id,
  public: config.upsub.public
})

export default Component => props => (
  <Component broker={client} {...props} />
)
