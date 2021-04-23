# lottery-app

## Technologies
Project is created with:
* Reactjs, Material UI (Frontend)
* Nodejs, Express (Backend)
* Mongodb (Database)

## Directory Structure

### Frontend

* src
  * assets: Contains assets like images which are to be served.
  * components: Contains various react components which are to be used in the project
  * containers: Contains the containers which uses components to make different pages.
  * axios-meme.js: Instantiates the axios with defined base URL
  * index.js: entry point of the react app
  
* public: contains all the static assets like html and favicons which are to be served
* .env.example: copy this file in .env and set the values of the environment variables.

### Backend
* src
  * db/mongoose.js: Configures the database.
  * models: Defines different mongoose models.
  * routers: Defines routers for the main express app.
  * app.js: Instantiates and configures the main app.
