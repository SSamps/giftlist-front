When testing locally you must define a docker network using "docker network create {networkName}". Note {networkName} is currently set to "test_network" in the package.json scripts.

It is advisable to ensure the npm version is the same in your local dev environment as inside the containers, which are currently set to use 7.12.0.
