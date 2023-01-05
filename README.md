In the .env file there are 3 fields that will need to be replaced:

- ACCESS_TOKEN_SECRET: anything you want, i recommend running `require('crypto').randomBytes(64).toString('hex')` in a node terminal and pasting the output 
- REFRESH_TOKEN_SECRET: same as ACCESS_TOKEN_SECRET, generate a different string
- DATABASE_URI: template mongodb URI provided, replace with own.

On front-end, accessToken is stored in a state in app.js, refreshToken is stored in a cookie
######
auto-token-refresh not implemented yet