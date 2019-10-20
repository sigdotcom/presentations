# Training 7 - React with Backend
This tutorial will discuss the following topics:
+ HTTP
+ React State
+ Fetching backend data using the `fetch` api

by creating the frontend of a todo list application with a KoaJS REST api (see
training 6 for more information). Future tutorials will expand upon the todo
list application by adding database and switching to GraphQL.

This tutorial is recommended to be run as a code along (have the students bring
their laptop and code with you). The code in this folder is the final product
after the first day.

## Procedure
+ [create-react-app](https://create-react-app.dev/)
    - `yarn global install create-react-app`
    - `yarn create react-app my-app`
+ Prototype todo list application without using backend (example
  `todo-app-frontend-static`)
    - Static list of todos
    - Augment the static list of todos with different helper functions
+ Implement the backend for the todolist application using helper functions
  (example `todo-app-frontend-backend`)
    - Enable CORS on backend
    - explain content-type
