# node-datadog

A Node.js client for Datadog.

## Example

```js
const Datadog = require('node-datadog')
const datadog = new Datadog(DATADOG_API_KEY, DATADOG_APP_KEY)
const embeds = await datadog.getEmbeds()
```

## API

### Client(apiKey, appKey)

Create a client for Datadog with `apiKey` and `appKey`.

### Embeds

Embeds are embeddable graphs.

#### Client#getEmbeds()

Get a list of embeddable graphs.

#### Client#getEmbedById(embedId)

Get an embeddable graph by ID.

#### Client#createEmbed(graph, options)

Create a new embeddable graph.

#### Client#enableEmbedById(embedId)

Enable an embeddable graph by ID.

#### Client#revokeEmbedById(embedId)

Revoke an embeddable graph by ID.

## Developers

Run tests using `npm run test`.

Create new releases via:
 - bump `version` in `package.json`
 - `git-changelog -t <version>`
 - `git-release <version>`

CircleCI handles publishing the version if tests all pass.
