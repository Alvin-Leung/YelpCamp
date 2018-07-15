
# <a href="https://yelpcamp-project-demo.herokuapp.com/" target="_blank">YelpCamp</a>

YelpCamp is a web application designed for camping enthusiasts wanting to find great campsites to visit and share their own unique experiences with like-minded campers. With individualized user accounts, you can create, find, rate, and explore your next adventure! YelpCamp is the final project for Udemy's Web Developer Bootcamp course taught by Colt Steele.

## Demo

A fully functioning demo of the web application can be found <a href="https://yelpcamp-project-demo.herokuapp.com/" target="_blank">here</a>.

## Features

* Authentication
	* Login with username and password
* Authorization
	* Restricted access to edit and delete only the campgrounds, ratings, and comments you have created
* CRUD Functionality
	* Create, read, update, and destroy the campgrounds and comments you have created
* Flash Messages
	* Invalid operations such as entering incorrect login credentials are accompanied by error messages
	* Successful operations such as adding a campground to the database successfully are accompanied by confirmation messages
* Rating System
	* Individual campgrounds can be rated, and the average rating from all users compiled to give an overall rating for the campground
* Responsive Web Design

## Getting Started

Ensure you have <a href="https://docs.mongodb.com/manual/installation/" target="_blank">MongoDb</a> and <a href="https://nodejs.org/" target="_blank">Node.js</a> installed.

### Unix Setup

1. Start Bash and cd to your MongoDB bin directory. Start the MongoDb database on port 27017 with the following command.
```bash
mongod --port 27017
```
2. Change directory to the project folder and install dependencies
```bash
cd <projectFolder>
npm install
```
3. In the same project directory, start the application
```bash
YELPCAMPDB=mongodb://localhost:27017/yelpcamp node app.js
```
4. The application is set to listen for http requests on port 3000 by default. Open your web browser and go to http://localhost:3000/. You should see the blog application in your browser.

### Windows Setup

1. Open the Command Prompt and cd to your MongoDB bin directory. Start the MongoDb database on port 27017 with the following command.
```bash
mongod --port 27017
```
2. Change directory to the project folder and install dependencies
```bash
cd <projectFolder>
npm install
```
3. In the same project directory, start the application
```bash
set YELPCAMPDB=mongodb://localhost:27017/yelpcamp&&node app.js
```
4. The application is set to listen for http requests on port 3000 by default. Open your web browser and go to http://localhost:3000/. You should see the blog application in your browser.

## Libraries/Frameworks Used
### Front-end
* Bootstrap
### Back-end
* body-parser
* connect-flash
* ejs
* express
* express-session
* method-override
* mongoose
* passport
* passport-local
* passport-local-mongoose
* request
