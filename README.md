## Setting up
In the .env file there are 3 fields that will need to be replaced:

- ACCESS_TOKEN_SECRET: anything you want, i recommend running `require('crypto').randomBytes(64).toString('hex')` in a node terminal and pasting the output 
- REFRESH_TOKEN_SECRET: same as ACCESS_TOKEN_SECRET, generate a different string
- DATABASE_URI: Replace with own.

On front-end, accessToken is stored in a context in UserControl.js, refreshToken is stored in a cookie

## For Us
auto-token-refresh not implemented yet
