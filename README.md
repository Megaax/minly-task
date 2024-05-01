# Minly

This project encompasses multiple applications including a frontend built with React, a backend using Node.js, and a Flutter application.

## Prerequisites

Before running any part of the project, ensure you have the following prerequisites installed on your machine:

- Node.js: Required for running both the backend and frontend servers.
- Docker: Necessary for running a MongoDB container used by the backend.
- Flutter: Needed for building and running the Flutter application.

## Running the Backend (Node.js)

1. **Run MongoDB Container**:
   Before running the backend server, you need to run a MongoDB container:
   ```bash
   docker run --name mongo-container -d -p 27017:27017 mongo

## Running the Backend (Node.js) on AWS Fargate
    the backend server is deployed to AWS Fargate using github actions  

2. **Run Backend Server**:
   
   Navigate to the backend directory 
   
   run ```npm install``` to install depecndencies 
   
   run ```npm run build``` to build the project 
   
   run ```npm start dev``` to start the backend server
   

3. **Run Frontend Server**:
   Navigate to the backend directory 
   
   run ```npm install``` to install depecndencies 
   
   run ```npm start```  to start the frontend server

**Run Flutter Server**:

Navigate to the Flutter application directory.

Execute ```flutter run``` to run the application on a connected device or simulator.
   