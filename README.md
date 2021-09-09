# Requirements

## Global Dependencies

The following dependencies must be installed with npm install -g [dependency]

node
npm
nodemon
docker

## Docker Configuration

When running locally in order for the front and back ends to connect to each other they need to connect to the same docker network. The "npm run dev" script is expecting a docker network called "gift-list" to exist. You can create this using the following command:

docker network create gift-list

## Commands

Run "npm install" to download the project dependencies if you wish to run the app locally and outside of a container

# Optional Global Dependencies

## Madge

You can use madge to identify circular dependencies with the following command:

> madge ./ --circular --extensions ts

You can also use madge to generate a dependency graph using the following command:

> madge ./ --extensions ts -i dependencyGraph.png

## Problems

#CSS
After adding new files scss often fails to import them in to main.scss correctly and requires a restart of WSL for it to do so.
It can also on occasion just stop compiling out of the blue, again requiring a WSL restart to fix.
