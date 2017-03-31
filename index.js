'use strict'

const debug = require('debug')('node-datadog')
const request = require('superagent')
const assert = require('assert')

class Datadog {
  constructor (apiKey, appKey) {
    debug('Datadog(%s, %s)', apiKey, appKey)
    assert(apiKey, 'apiKey required')
    assert(appKey, 'appKey required')

    this.baseUri = 'https://app.datadoghq.com/api/v1'
    this.apiKey = apiKey
    this.appKey = appKey
  }

  getEmbeds () {
    return this.call('get', '/graph/embed')
    .then(res => res.embedded_graphs)
  }

  getEmbedById (embedId) {
    assert(embedId, 'embedId required')
    return this.call('get', `/graph/embed/${embedId}`)
  }

  createEmbed (graph, options) {
    assert(graph, 'graph required')
    return this.call('post', '/graph/embed', options)
  }

  enableEmbedById (embedId) {
    assert(embedId, 'embedId required')
    return this.call('get', `/graph/embed/${embedId}/enable`)
  }

  revokeEmbedById (embedId) {
    assert(embedId, 'embedId required')
    return this.call('get', `/graph/embed/${embedId}/revoke`)
  }

  call (method, path, options) {
    return new Promise((resolve, reject) => {
      request[method](this.baseUri + path)
      .query({ api_key: this.apiKey, application_key: this.appKey })
      .send(options)
      .end((err, res) => {
        if (err || !res.ok) {
          reject(err)
        } else {
          resolve(res.body)
        }
      })
    })
  }
}

module.exports = Datadog
