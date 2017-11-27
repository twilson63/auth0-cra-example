const express = require('express')
const app = express()

const cors = require('cors')
const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

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
  res.send({ message: 'private route ' })
})

app.listen(5000)
