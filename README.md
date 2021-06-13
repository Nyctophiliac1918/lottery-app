# lottery-app

This is a web app, where you can put up lottery draw events as well as participate in them. You can see the upcoming events and the previous draw winners too.

## Technologies
Project is created with:
* Reactjs, Material UI (Frontend)
* Nodejs, Express (Backend)
* Mongodb (Database)

## Directory Structure

### Frontend

* src
  * components: Contains various react components which are to be used in the project
  * index.js: entry point of the react app
  
* public: contains all the static assets like html, logos and styles file which are to be served.

### Backend
* db/mongoose.js: Configures the database.
* models: Defines different mongoose models.
* routes: Defines routers for the main express app.
* app.js: Instantiates and configures the main app.

### Deployed Links
* Backend: https://lottery-app-1918.herokuapp.com
* Frontend: https://lottery-app-1918.netlify.app

## Setup
To run this project, install it locally using npm and yarn, respectively.

### Backend (assuming in the root directory)

Make a .env file and give a database uri as DATABASE_URL.
Make sure your database is running properly.

Then
For development
```
$ cd backend
$ npm install
$ node app.js
```

Default port has been set to 8080.

### Frontend (assuming in the root directory)

```
$ cd frontend
$ npm install
$ npm start
```

Default port has been set to 3000
