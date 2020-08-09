# Lets Collab

**Collaborate with other developers from all over the world**

Before you start you need to have [Redis](https://redis.io/) and [PostgresSQL](https://www.postgresql.org/) 11 installed.

Create a database named collab_dev, the owner should be called "collab" with a password of "collab", or change the username and password in `server/src/db/config/config.json`

Run `npm i` in both the root folder and the server folder to install the dependencies.

In `server/src/server.ts` uncomment the line that generates the database tables, make sure to comment it after because it destroyes all of the data inside the database.

Run `npm run seed` to generate dummy data, users have an email of `test`(number from 0-50)`@test.com` and a password of `test1234`.

`npm run dev` starts both the server and the client and auto generates types for the GraphQL schema and the front-end queries/mutations/subscriptions.

If you need any more help or just want to chat feel free to join our [Discord server](https://discord.gg/sy3rFhx)
