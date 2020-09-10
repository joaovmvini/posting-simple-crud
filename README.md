# Posting Social Network Crud

Its a simple posting project using some technologies such as

- [TypeORM](https://typeorm.io) - TypeORM is an ORM that can run in NodeJS, Browser, Cordova, PhoneGap, Ionic, React Native, NativeScript, Expo, and Electron platforms.
- [Express](https://expressjs.com) - fast node.js network app framework
- [node.js](https://nodejs.org/) - evented I/O for the backend

### Project functionalities

- registration of users with validation
- publish a new post
- delete a post
- update a post

it works using typeorm and postgresSQL with one-to-many relationships to connect users with their respective posts

### Installation

before running this project you need to clone this repository.
go to a directory of your choice and execute the command below.

```sh
git clone https://github.com/joaovmvini/socialnetwork-simple-crud.git
cd socialnetwork-simple-crud
```

Install the dependencies and devDependencies and start the server.

1. Run `npm i` command
2. Change setup database settings inside `ormconfig.json` file
3. Run `npm start` or `npm run start:watch` command to start
