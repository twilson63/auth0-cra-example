import auth0 from 'auth0-js'
import history from './history'

export default function() {
  const auth = new auth0.WebAuth({
    domain: 'jrscode1.auth0.com',
    clientID: 'Q9DTs6u03ClfHxo77yGhJSWCe5hOZS3w',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://api.foobar.com',
    responseType: 'token id_token',
    scope: 'openid'
  })

  return {
    login,
    logout,
    isAuthenticated,
    handleAuthentication
  }

  function handleAuthentication() {
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        setSession(authResult)
        history.replace('/protected')
      } else if (err) {
        history.replace('/')
        console.log(err)
      }
    })
  }

  function setSession(authResult) {
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    )
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    // navigate to the home route
    history.replace('/protected')
  }

  function isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'))
    return new Date().getTime() < expiresAt
  }

  function login() {
    auth.authorize()
  }

  function logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem('access_token')
    localStorage.removeItem('id_token')
    localStorage.removeItem('expires_at')
    // navigate to the home route
    history.replace('/')
  }
}
