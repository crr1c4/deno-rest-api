# Deno REST-API

This is the first REST-API I built with authentication, this file is useful for anyone that use this REST-API :D. I built it without videos, only documentation of the dependencies.

This RES-API supports authentication and authorization.

## Dependencies

This REST-API runs with [__Deno__](https://deno.land/). A modern runtime for JavaScript and TypeScript.

### Modules 

1. [__Oak__](https://deno.land/x/oak@v9.0.1), a middleware framework for Deno's std http server, native HTTP server and Deno Deploy. It also includes a middleware router.
2. [__mongo__](https://deno.land/x/mongo@v0.27.0), is a MongoDB database driver developed for deno.
3. [__djwt__](https://deno.land/x/djwt@v2.4), create and verify JSON Web Tokens with deno.
4. [__Dotenv__](https://deno.land/x/dotenv@v3.0.0), dotenv handling for deno.

## Usage

### Development

To run a development version of the REST-API, run the following script on your console:

`deno run -A --watch .\index.ts`

Consider to run mongoDB client:

`mongod`

### Routes

#### Users

- Get a specific user data, *__need JWT__*:

    `GET /:userID`

- Register a new user, *__need user and password__*:

    `POST /signup`

- Login of registered user, *__need user and password__* and return a *__JWT__*:

    `POST /signin`

- Delete a user, *__need JWT__*:

    `DELETE /:userID`

#### Notes

All notes routes *__need JWT__*.

- Get all notes of user:

    `GET /:username/notes`

- Create a new note:

  `POST /:username/notes`

- Edit a note:

  `PUT /:username/notes/:id`

- Delete a note

  `DELETE /:username/notes/:id`

### Headers

Headers used in this REST-API:

  - Content-Type
  - X-Access-Token