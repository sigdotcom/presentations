# Training 6 - Introduction to Backend
This tutorial will discuss the following topics:
+ HTTP
+ KoaJS
    - Context
    - Body Parser
    - Routing
+ Building your first route

by creating a todo list application using just KoaJS and REST calls. Future
tutorials will expand upon the todo list application by adding a frontend,
database, and switching to GraphQL.

This tutorial is recommended to be run as a code along (have the students bring
their laptop and code with you). The code in this folder is the final product
after the first day.

## Procedure
+ `yarn init`
+ Basic project setup
    - Install basic koajs dependencies
        ```
        yarn add koa
        yarn add -D @types/koa typescript eslint prettier eslint-config-prettier
        ```
    - Initialization commands:
        ```
        >>> yarn tsc --init && yarn eslint --init 
        >>> vim .prettierrc.js
        # .prettierrc.js
        module.exports = {
            singleQuote: true
        };

        >>> vim .eslintrc.js
        #.eslintrc.js
        extends: [
            ...,
            prettier
        ]
        ```
    - Explain `tsconfig.json`, `.eslintrc.js`, `.prettierrc.js`
+ Write basic 'Hello, World!' application, explaining:
    - basics of HTTP
    - HTTP response code
    - what the application is doing
+ Extend basic 'Hello, World!' application to include response timer showing off
  middleware
+ Write npm-scripts to build and run:
    + Start with `yarn start` using just `tsc && node build/index.js`
    + Move src files to `src/`, update tsconfig.json, and upgrade to `yarn
      start` using nodemon
        ```
        #nodemon.js
        {
          "watch": ["src"],
          "ext": "ts",
          "ignore": ["src/**/*.spec.ts"],
          "exec": "ts-node ./src/index.ts"
        }
        ```
+ Make the `GET`, `POST`, `UPDATE`, and `DELETE` routes for todos and 'Hello,
  World' on '/' with koa-router and koa-bodyparser
    ```
    yarn add @koa/router koa-bodyparser
    yarn add -d @types/koa__router @types/koa-bodyparser
    ```
+ Show them a flow of the todo list application.
