# Deno REST-API

This is the first REST-API I built with JWT authentication, this file is useful for anyone that use this REST-API :D. I built it without videos, only documentation of the dependencies, yey!

This REST-API supports *authentication* and *authorization*.

## Dependencies

This REST-API runs with [**Deno**](https://deno.land/). A modern runtime for JavaScript and TypeScript.

### Modules

See import ./import_map.json to check dependencies.

1. [**Oak**](https://deno.land/x/oak@v9.0.1), a middleware framework for Deno's std http server, native HTTP server and Deno Deploy. It also includes a middleware router.
2. [**mongo**](https://deno.land/x/mongo@v0.27.0), is a MongoDB database driver developed for deno.
3. [**djwt**](https://deno.land/x/djwt@v2.4), create and verify JSON Web Tokens with deno.
4. [**Dotenv**](https://deno.land/x/dotenv@v3.0.0), dotenv handling for deno.
5. [**BCrypt**](https://deno.land/x/bcrypt@v0.2.4), port from jBCrypt to TypeScript for use in Deno.
6. [**Cors**](https://deno.land/x/cors@v1.2.2/mod.ts), CORS is a Deno.js module for providing a Oak/Opine/Abc/Attain/Mith middleware that can be used to enable CORS with various options.

## Usage

To run a development version of the REST-API, run the following script on your console:

`deno run -A --watch .\index.ts`

Consider to run mongoDB client: `mongod`

If you have [**Velociraptor**](https://velociraptor.run/), you can run app with:

Dev version: `vr dev`.

Production version: `vr start`.

### Routes

#### Users

- Get a specific user data, _**need JWT**_: `GET /:userID`

- Register a new user, _**need user and password**_: `POST /signup`

- Login of registered user, _**need user and password**_ and return a _**JWT**_: `POST /signin`

- Delete a user, _**need JWT**_: `DELETE /:userID`

#### Notes

All notes routes _**need JWT**_.

- Get all notes of user: `GET /:username/notes`

- Create a new note: `POST /:username/notes`

- Edit a note: `PUT /:username/notes/:id`

- Delete a note: `DELETE /:username/notes/:id`

### Headers

Headers used in this REST-API:

- Content-Type: application/json
- Authorization: Bearer `token`
