# Requirements

## Node & node packages

Node and the following dependencies should be installed with npm install -g [dependency] if you do not have them already.

-   npm
-   nodemon
-   typescript

## Docker

> Docker desktop is highly recommended.

While the app can be run locally without docker it has been designed to run inside docker containers using the provided npm scripts in package.json. This ensures a more consistent dev environment that more closely matches the production environment.

When running docker containers locally in order for the front and back end containers to connect to each other they need to be part of the same docker network. The "npm run dev" script is expecting a docker network called "gift-list" to exist. You can create this using the following command:

> docker network create gift-list

## Commands

> npm install

To install project dependencies

> npm run dev
> The command will do the following:

-   Build a new docker image of the project and start up a container with the name listapp-frontend-dev. The react app will be running internally using the react dev server and is accessable from localhost:3000. The dev container uses volumes so project changes should be reflected in the app immediately.
-   Delete any existing images and containers of the same name
-   Set up a watch on sass files using node-sass to compile sass changes to css on save.
-   Set up a watch on the dev docker file and package.json for changes using nodemon. The container will be rebuilt if changes are detected on save.

# Optional Global Dependencies

## Madge

You can use madge to identify circular dependencies with the following command:

> madge ./ --circular --extensions ts

You can also use madge to generate a dependency graph using the following command:

> madge ./ --extensions ts -i dependencyGraph.png
