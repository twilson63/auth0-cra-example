const express = require('express')
const app = express()

const cors = require('cors')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')
const jwtAuthz = require('express-jwt-authz')

const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://jrscode1.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://api.foobar.com',
  issuer: 'https://jrscode1.auth0.com/',
  algorithms: ['RS256']
})

app.use(cors({ credentials: true }))

app.get('/', (req, res) => {
  res.send({ message: 'public route' })
})

app.get('/private', jwtCheck, (req, res) => {
  res.send({ message: 'A nicer message ' })
})

app.get('/admin', jwtCheck, jwtAuthz(['admin']), (req, res) => {
  res.send({ message: 'Admin only' })
})

app.listen(5000)
