# Todo-nest-app

The project is full stack todo app. it's include add, edit, delete and set complete/incomplete todo item endpoints, i've used nestjs for backend and mongodb for db.
the project uses turborepo for manage both the client and server side. with the package, you can run tasks for both sides simultaneously, instead of run them separately.

## What technologes did i use?
- NestJs
- mongodb
- ReactJs and Vite
- React query

## How is the folder structure?
The project have two folders on `/apps` folder. they called `web` and `api`. the `api` folder is server-side and the `web` folder is client-side.

## How to use it?
- Run mongodb database on your machine. if the program doesn't exist, [To get mongodb community server](https://www.mongodb.com/try/download/community)
- Clone the project
- Install node and npm/yarn package if doesn't exist on your machine.
- Look the .env.example file in `app/web` dir. copy the file and rename to `.env` file, then add the server url. like this:
```
VITE_SERVER_API_URL=http://localhost:3000
```
- open terminal/cmd and change directory to the project dir, them, run `yarn dev` to run prject

### Build

To build all apps and packages, run the following command:

```
cd my-turborepo
yarn build
```

Enjoy ✌️❤️
