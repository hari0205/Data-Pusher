# Data Pusher

Data Pusher is an Express web application that receives data for an account and sends it to different platforms (destinations) using webhook URLs.

## Overview

This application provides a system to manage accounts, destinations, and handle incoming data. It uses a SQLite database for data storage and provides JSON REST APIs for various operations.

## Setup and Installation

1. Ensure you have the latest version of Node.js installed
2. Clone the repository
3. Install dependencies:
   ```
   yarn install
   ```
4. Set up the SQLite database (First time only)
   ```
   yarn dev:migrate
   ```
5. Start the server:
   ```
   yarn start:dev
   ```

## Development

- This project is built with Node.js, Typescript and Express
- Uses SQLite as the database

## Base Endpoints

- For accounts
  `localhost:3000/api/v1/accounts`

- For destinations
  `localhost:3000/api/v1/destinations/`

- For sending webhook, you might need to start `server2.ts` using `yarn start:dev2`

  POST `localhost:3000/api/v1/server/incoming_data`




Please refer the attached Insomnia yaml or Postman collection detailed endpoint usage.
> To import Insomnia collection, refer [this](https://docs.insomnia.rest/insomnia/import-export-data)

> To import postman collection, refer [this](https://learning.postman.com/docs/getting-started/importing-and-exporting/importing-and-exporting-overview/#exporting-postman-data)


