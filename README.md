# todo-app

Simple todo app, implementing a basic CRUD functionality.

Made with React and Node.js & Express, MySQL database.

Originates from a private GitHub classroom repo for a full stack course, hence the giant first commit.

Copied over and continuing in this repo so that the project is visible to everyone.

## Features / TODO

- [ ] Backend
  - [x] Create a todo
  - [x] Create a user
  - [x] Get todos
  - [x] Get users
  - [x] Update a todo
  - [ ] Update a user
  - [x] Delete a todo
  - [x] Delete a user
- [ ] Frontend
  - [x] Create a todo
  - [x] Create a user
  - [x] Get todos
  - [x] Get users
  - [ ] Update a todo
  - [ ] Update a user
  - [x] Delete a todo
  - [ ] Delete a user
- [ ] Authentication
  - [x] Authenticate for Create / Update / Delete
  - [x] Store uuid & token in cache (for 1hour)
- [ ] Tests
  - [x] Backend Unit tests
  - [x] Frontend Unit tests
  - [x] End-2-End tests
  - [x] Tests ran through Github Actions
    - Currently only backend tests are ran w/ Actions
  - [ ] More tests so coverage doesn't suck
- [ ] Deployed to somewhere (with GitHub Actions)
- [ ] Improve documentation (by a lot)

## Running the app locally

- Clone the repo and move to the root folder
- Run `docker compose up -d` to bring up the database
- Move to backend folder and run `npm install` to install dependencies
- Run `npm start` in the backend folder to bring up the backend
- Move to frontend folder and run `npm install` to install dependencies
- Run `npm start` in the frontend folder to bring up the frontend
- Open your browser and go to <http://localhost:5173/>
