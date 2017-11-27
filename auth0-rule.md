# Auth0 Rule to check as admin

```js
function (user, context, callback) {
  // TODO: implement your rule
  if (user && user.app_metadata && user.app_metadata.admin) {
    context.accessToken.scope = ['admin'];
  }
  callback(null, user, context);
}
```
