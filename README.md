## Setting up
In the .env file there are 3 fields that will need to be replaced:

- ACCESS_TOKEN_SECRET: It is recommended to run `require('crypto').randomBytes(64).toString('hex')` in a node terminal and pasting the output 
- REFRESH_TOKEN_SECRET: same as ACCESS_TOKEN_SECRET, generate a different string
- MONGODB_URI: Replace with own.

The Privacy Policy page will also need to be modified, as the main organisation, as well as which third-parties will have access to the data will vary.
The fields that will need to be replaced are in all caps.

## Running the server
open `livesubtitleweb\livesubtitles_fullstack-MERN\LiveSubtitleServer` in a terminal and run `npm install`, then `npm start`

## Running the client
open `livesubtitleweb\livesubtitles_fullstack-MERN\livesubtitleweb` in a terminal and run `npm install`, then `npm start`

## Testing either client or server
from highest relevant directory `\livesubtitleweb` or `\LiveSubtitleServer` in terminal (not node or VSCode debug instance), run `npm test`

## For Docker
Please note docker may not work as of the update to the token system
From `livesubtitleweb\livesubtitles_fullstack-MERN`:
### docker compose up
This will compose 3 containers, client, server, and mongodb instance
### docker ps
This will show all currently existing docker images loaded to containers
### docker compose down
This will close all currently running containers
There are common issues with this method due to apparmor profiles
If so please use: 
```
sudo aa-remove-unkown
```
DO THIS ONLY IF YOU GET PERMISSION ERRORS
### docker rm $(docker ps -a -q)
This will close and prune all docker images, clean up for when you're done
