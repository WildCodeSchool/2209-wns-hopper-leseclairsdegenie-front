# React TS Starter!

This boilerplate contains:

- React with TypeScript
- Apollo Client to connect an existing GraphQL API
- A simple Signup component to create a user

Everything is dockerized, just install Docker on you host machine then run:

```
for linux and mac :
docker compose up --build

for win :
docker compose -f docker-compose.win.yml up --build
```

To work locally, you should install the NPM dependencies by running:

```
npm i
```

Please note that everytime you install a new NPM package, you should rerun you docker compose command.
