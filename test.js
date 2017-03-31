import test from 'ava'
import Datadog from './'

const { DATADOG_API_KEY = 'api_key', DATADOG_APP_KEY = 'app_key' } = process.env

test('missing apiKey', t => {
  const err = t.throws(() => new Datadog(null, DATADOG_APP_KEY))
  t.is(err.message, 'apiKey required')
})

test('missing appKey', t => {
  const err = t.throws(() => new Datadog(DATADOG_API_KEY, null))
  t.is(err.message, 'appKey required')
})

test('sets settings', t => {
  const d = new Datadog(DATADOG_API_KEY, DATADOG_APP_KEY)
  t.is(d.apiKey, 'api_key')
  t.is(d.appKey, 'app_key')
})

test('.getEmbeds() valid', async t => {
  const d = new Datadog(DATADOG_API_KEY, DATADOG_APP_KEY)
  d.call = () => { return Promise.resolve({ embedded_graphs: [] }) }
  const embeds = await d.getEmbeds()
  t.deepEqual(embeds, [])
})

test('.getEmbedById() missing embedId', async t => {
  const d = new Datadog(DATADOG_API_KEY, DATADOG_APP_KEY)
  const err = t.throws(() => d.getEmbedById())
  t.is(err.message, 'embedId required')
})

test('.getEmbedById() valid', async t => {
  const d = new Datadog(DATADOG_API_KEY, DATADOG_APP_KEY)
  d.call = () => { return Promise.resolve({}) }
  const embed = await d.getEmbedById('ID')
  t.deepEqual(embed, {})
})

test('.createEmbed() missing graph', async t => {
  const d = new Datadog(DATADOG_API_KEY, DATADOG_APP_KEY)
  const err = t.throws(() => d.createEmbed())
  t.is(err.message, 'graph required')
})

test('.createEmbed() valid', async t => {
  const d = new Datadog(DATADOG_API_KEY, DATADOG_APP_KEY)
  d.call = () => { return Promise.resolve({}) }
  const embed = await d.createEmbed({})
  t.deepEqual(embed, {})
})

test('.enableEmbedById() missing embedId', async t => {
  const d = new Datadog(DATADOG_API_KEY, DATADOG_APP_KEY)
  const err = t.throws(() => d.enableEmbedById())
  t.is(err.message, 'embedId required')
})

test('.enableEmbedById() valid', async t => {
  const d = new Datadog(DATADOG_API_KEY, DATADOG_APP_KEY)
  d.call = () => { return Promise.resolve({}) }
  const embed = await d.enableEmbedById('ID')
  t.deepEqual(embed, {})
})

test('.revokeEmbedById() missing embedId', async t => {
  const d = new Datadog(DATADOG_API_KEY, DATADOG_APP_KEY)
  const err = t.throws(() => d.revokeEmbedById())
  t.is(err.message, 'embedId required')
})

test('.revokeEmbedById() valid', async t => {
  const d = new Datadog(DATADOG_API_KEY, DATADOG_APP_KEY)
  d.call = () => { return Promise.resolve({}) }
  const embed = await d.revokeEmbedById('ID')
  t.deepEqual(embed, {})
})
