## Setting up
In the .env file there are 3 fields that will need to be replaced:

- ACCESS_TOKEN_SECRET: It is recommended to run `require('crypto').randomBytes(64).toString('hex')` in a node terminal and pasting the output 
- REFRESH_TOKEN_SECRET: same as ACCESS_TOKEN_SECRET, generate a different string
- MONGODB_URI: Replace with own.

The Privacy Policy page will also need to be modified, as the main organisation, as well as which third-parties will have access to the data will vary.
The fields that will need to be replaced are in all caps.