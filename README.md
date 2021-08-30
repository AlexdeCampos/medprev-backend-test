# MedPrev-CRUD API

API made with Typescript and PostgreSQL.

Developing with [Docker](https://www.docker.com) (and Docker-Compose)

## Table of Contents

- [Requirements](#requirements)
- [How to run](#how-to-run)
- [Commands](#commands)
  - [Install dependencies](#install-dependencies)
  - [Run the API](#run-the-api)
  - [Migrations](#migrations)
  - [Run commands](#run-commands)
  - [Tests](#tests)
- [Docs](#docs)
- [Authors](#authors)

## Requirements

- Docker (and docker-compose)
- NPM or Yarn

## How to run

- Create `.env` file using `.env.example` as base
- Install dependencies ([check commands session](#commands))
- Run the API ([check commands session](#commands))
- Run the migrations ([check commands session](#commands))

## Commands

### Install dependencies

```bash
# Install dependencies
docker-compose run --rm api npm install
# or: docker-compose run --rm api yarn
```

### Run the API

```bash
# Start the api
docker-compose up
# Then open http://localhost:3000
```

### Migrations

- Run migrations

```bash
# API must be running
npm run docker:migration:run
# or: yarn docker:migration:run
```

- Generate new migration

```bash
# API must be running
npm run docker:migration:generate MigrationName
# or: yarn docker:migration:generate MigrationName
```

## Run commands

```bash
docker-compose run --rm api ...
```

## Tests

To run all tests:

```bash
npm run docker:test
# or: yarn docker:test
```

To run a specific test:

```bash
npm run docker:test npm run test __tests__/folder_you_wanna_test/functional/...
# or: yarn docker:test yarn test __tests__/folder_you_wanna_test/functional/...
```

## Docs

The API documentation can be accessed by the endpoint [/api](http://localhost:3000/api)

## Authors

- Alex de Campos
