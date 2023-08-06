# quiz-project

This is a basic setup for the quiz app

When cloned run `npm install` and `cd client && npm install`
On root folder `code server/.env` to create  file `.env` and  paste the below code
DB_USER=teamc
DB_HOST=quiz-lab.c0sldoxkysx5.eu-west-2.rds.amazonaws.com
DB_DATABASE=postgres
DB_PASSWORD=(our secret password)
DB_PORT=5432

Run `npm run start-server` to run the backend

Run `npm run start-client` to run the frontend

Run `npm run start-tailwind` to run Tailwind

Run `npm run start` to run client and server simultaneously
OR
Run `npm run start-all` to run client, server and Tailwind simultaneously

🤖 Further optional configuration:

1. You might like to install the Prettier Tailwind plugin:  
   npm install -D prettier prettier-plugin-tailwindcss

2. If you get a linting error for the @tailwind lines, add the following linting ignore:
   Open the settings, search for “unknown”, the first result should be the one you’re looking for: CSS > Lint: Unknown At Rules:

- change to ignore

To encrypt an API key run `npm run encrypt APIKEY`
