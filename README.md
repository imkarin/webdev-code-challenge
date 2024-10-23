# Code Challenge: Philosophical Journal Website

**Objective:**  
The goal of this code challenge is to build a web application that presents users with philosophical questions, allowing them to respond and save their answers in a journal format. Through a series of incremental assignments, you will learn essential web development concepts, including JavaScript, JSON, local storage, API fetching, and building a Node.js/Express API with a MongoDB database.

Don't worry, we'll take it step by step - with each assignment, you'll make your website a little more complex, as you learn more about Javascript and different aspects of web-development!

## Initial Setup

This repository contains a basic setup - an HTML file that includes:

- An empty list (`<ul>`) to display previously answered questions.
- A button labeled "Ask me a new question" (non-functional initially).
- An `<h2 id='question'>`, where you will insert a philosophical question, when the button is clicked.

## Assignments Overview

✨ Tip! You can skim through the assignments, but don't overwhelm yourself by reading too much into the more advanced assignments right away. You'll be learning new stuff every day, and by the end of this code challenge, you'll have accomplished much more than you think right you're capable of right now!

**For each assignment, create a git branch.** <br/>
Create a new branch for each assignment: `assignment-X`. When you're done, create a pull request from branch `assignment-X` → `main`, so your code can be reviewed!

### Assignment 1: Basic JavaScript and DOM Manipulation

- **Task:** Implement all logic in a client-side JavaScript file.
- **Details:**
  - In the "frontend" folder, create a Javascript file named "script.js", so it matches the `<script>`'s `src` in the HTML.
  - In the Javascript file, create an array of philosophical questions (you can invent these).
  - Use an event listener on the button to handle clicks.
  - When the button is clicked, retrieve the next question from the array based on its index and insert it into the DOM, in the h2 that says "Your question will appear here (replace this text)".
  - When the user submits an answer with the "submit answer" button:
    - Take the value of the text area, and append the to the list below.
    - Make the h2 that contained the question, say: "Click the button for a new question".
    - Make the text area and "submit answer" button disabled
- **Goal:** Understand JavaScript basics and DOM manipulation.

### Assignment 2: Local Storage Implementation

- **Task:** Extend the functionality from Assignment 1 by utilizing local storage.
- **Details:**
  - Use `localStorage` to save an array of previously answered questions and their responses.
  - When the page loads, check if there are saved answers in local storage and display them in the list.
  - Ensure that upon button click, the new question is retrieved, and any existing answers are still visible after a page refresh.
- **Goal:** Learn how to use the browser's web storage effectively.

### Assignment 3: Fetching Questions from an API

- **Task:** Replace the hardcoded array with an API endpoint for fetching questions.
- **Details:**
  - Instead of getting your questions from a hardcoded array, you'll now be fetching them from an external API.
  - Use Javascript's `fetch` API to retrieve a question when the button is clicked:
    - The base of the external API is: `https://philosophy-api.netlify.app/api`.
    - To fetch a question, you can make a GET-request to the following endpoint: `/question/[number]`, where the **parameter** `[number]` can be used to get a specific question.
    - If you need an overview of all the available questions (for example, to see how many there are), you can use the endpoint: `/questions`.
    - The endpoint will return a response in **text** format.
  - Update the DOM with the fetched question, and make sure the website functions the same as before (list of answers, local storage).
  - You may need to figure out a new way to keep track of the questions that the user has already answered, to avoid fetching the same question twice.
- **Goal:** Gain experience in fetching data from APIs using JavaScript.

### Assignment 4: Building a Node.js/Express API

#### **Introduction**
In this section, you'll learn how to use Node.js: a Javascript runtime environment, that allows you to run Javascript code on a computer, outside of the browser. You're going to write your own small server, that will receive requests and return philosophical questions. Your first API!

Setting up Node.js will take some configurations on your computer, to enable your computer to run Javascript outside of the browser. Then, we'll install some packages (code that other developers have written to make our lives easier). But after that, you'll find that writing server-side Javascript is almost no different than writing Javascript for the browser!

#### **Getting started: Setting up Node.js & npm**
1. Install Node.js following [this guide](https://www.youtube.com/watch?v=La6kH33-AVM).
   - At 2:22, the guide opens the command prompt. If you're using VSCode, you can just open the terminal by going to View > Terminal. Make sure that on the type of terminal is set to Command Prompt/CMD (not Powershell, next to the + button on the right side). Opening the terminal in VSCode makes sure that your terminal is immediately set to the right directory (your project). Double check to make sure you're in the root directory of your project (`webdev-code-challenge`).
2. Time for some command line! Make a new directory called `backend` by typing: `mkdir backend` (mkdir = make directory).
3. Enter your new directory by typing `cd backend` (cd = change directory).
4. In your _backend_ directory, we're gonna need some of those pre-made packages we mentioned earlier. Those packages are pre-made modules of code, that we can use to build a server super easily. Packages come from  [npm](https://www.npmjs.com/) (Node package manager) - a platform where Javascript developers make their packages available for others to use. In order to be able to install npm packages, we need to turn our project into an npm project. We can do so with the command: `npm init`. Make sure you run this in the `backend` folder, because we want to keep our backend and frontend logic separated.
5. Fill out the questions about your project. If you don't know the answer to some, just press enter.
6. Now that our project is an npm project, we can start installing the packages we need.
   - Before installing the packages, note how your back-end folder now contains a file called _package.json_. Take a look at it, and keep it open while continuing with the next step.
   - First, we're going to install [Express](https://www.npmjs.com/package/express). Express is a package/framework that makes building servers in Node.js fast and easy. We install it with the command: `npm install express`
   - Notice how, in your _package.json_, new information got added: `"dependencies": { ... }`. Dependencies are the packages that your project depends on.
   - Second, we're going to install a package that will make our developer experience a bit easier: [nodemon](https://www.npmjs.com/package/nodemon). We will use nodemon to run our file with Javascript, and nodemon will keep track of changes in your file - and automatically restart the script when you save new changes. This package can be considered a "dev dependency" - it's nice to have during development, but its code will not be necessary in final build (the compiled version of our project that we would eventually host somewhere). To install nodemon as a **dev dependency**, run: `npm install nodemon --save-dev`.
   - Notice how your _package.json_ now also contains `devDependencies`. Everything in this list will not be compiled when you eventually finish and build your code for prodction.
  
:sparkles: Done! You've successfully installed Node.js on your PC, and can run Javascript on your computer from now on. After that, you've created the base of you back-end: an npm-project that uses two packages.  

#### **Making your web server/API: first steps**

Now it's time to start writing some Javascript code.

1. In your _backend_ directory, create a file named _app.js_. In this file, write: `console.log("Hello world!")`.
2. To run this file, you can use the command: `node app.js` (from your _backend_ directory). Now your Javascript is running on your computer, instead of in the browser!
3. Notice how that only ran your file once? It's gonna be annoying to type this command every time you update your code and want to see the result. This is why we installed the package nodemon.
4. Within an npm project (like your backend), you can create scripts: automated tasks that you can run with a single command. To do so, open your _package.json_:
   - By default, your project will already have one script: `"test": "echo \"Error: no test specified\" && exit 1"`. That's just a dummy script, that you can remove.
   - Instead, we will now create our own script: `"start": "nodemon app.js"` - our script is called "start", and when we run this script, nodemon will start running & watching our file.
5. Run your newly made script in the terminal, by typing: `npm run start`.
6. :sparkles: Your code runs! Try making some changes in _app.js_ to see that nodemon will automatically rerun your file.

#### **Okay, time to _actually_ make your web server/API**

Now we're going to create a web server in our _app.js_. We'll go step by step, but when in doubt, you can always refer to the [Express](https://www.npmjs.com/package/express) documentation.

1. In our _app.js_, we must first import the Express package. Then, we want to initialize an instance of express: this will be our application - the root of our server, the server's "brain".
   ```js
   const express = require('express')
   const app = express()
   ```
2. Now, we want to run our server on a specific port. Similarly to how the VSCode plugin "Live server" runs a server on a specific port, that you can visit in your browser on _localhost:5500_ (for example). Now we're going to make our own server listen on a port that we provide:
    ```js
    const port = 3000
    app.listen(port, () => {
      // This callback function is run when the server has been spun up 
      console.log("Server is running on port " + port)
    })
    ```
   Nice! You made your first server. Now, let's actually make it receive requests and return responses.
3. You can make your `app` (server) receive and handle a "get" request like this:
    ```js
    const express = require("express");
    const app = express();

    // Listen for "get" requests on the "/" route, and send a response back: "Hello world!"
    app.get("/", (req, res) => {
      // The app.get() function takes two arguments: the first being the route where you want to receive the request ("/"),
      // and the second argument being this function: the logic that the server runs, to eventually return a response
      res.send("Hello world!");
    });
    
    const port = 3000;
    app.listen(port, () => {
      console.log("Server is running on port " + port);
    });
    ```
    Now if you visit localhost:3000/ in your browser, you'll receive a response! Try changing the `"/"` in your code for something else (always starting with `/`, though), and visit those routes in your browser.
4. Now, let's say you want to make an endpoint (route) called "/question". When someone requests this endpoint, we want to return a random philosophical question from a pre-set list of questions. You've already written part of this code in your Javascript file in assignment 1, and since we're still writing Javascript here, you can reuse that:
  ```js
  const questions = [
    "Can computers think, or fall in love?",
    "Can computers be creative?",
    "What is consciousness?",
    // etc...
  ];
  
  // Listen for "get" requests on the "/question" route, and respond with a random question
  app.get("/question", (req, res) => {
    const randomIndex = Math.floor(Math.random() * questions.length);
  
    res.send(questions[randomIndex]);
  });
  ```
  🎉 Nice! You've made a philosophical questions API. 

#### Making an API route for requesting specific questions

At this point, you've almost recreated the API that you were fetching from in assignment 3. The key difference being: your current API returns a random question, and the API you fetched from required you to provide a **query parameter**: `id`, to request a specific question. This was useful, so that you could make sure not to request a question that the user had already answered.

So let's recreate this:
Remember the code to listen to a route (e.g. "/question", and return some sort of response):
 ```js
 app.get("/question", (req, res) => {
   res.send("Question?");
 });
 ```
You may have noticed that the handler function (the second argument passed to `app.get()`), actually has two parameters: `req` and `res`. What happens when someone requests the endpoint "/question": Express makes sure that our function will be called, and will pass two arguments to our function: the first being a "Request" object, with all kinds of information about the request. The second is the "Response" object, which gives us the possibility to send a response back (like `res.send()`).

➡️ We haven't used the request parameter yet, but try logging it, to see what kinds of info we have: `console.log(req)`.

When you look at your terminal, you see a huge object with all kinds of properties. This is the request context. One very important property is the query: `req.query`. I'm sure you've seen URLs like this before: _https://website.com/search?term=apple_. In that URL, "/search" is the endpoint (or **route**), and everything after the "?" is called the **query parameters** - "term" being one query parameter.

➡️ Try visiting your endpoint: _http://localhost:3000/question?test=123, and note how `req.query` will now show: `{test: '123'}`. You can use this information, to return something specific in your response!

That's it for the introduction to Node.js and making your web server/API with Express. You can use your new knowledge to complete assignment nr. 4!

#### **The assignment**
     
- **Task:** Create a simple Node.js/Express API that serves philosophical questions.
- **Details:**
  - Set up an Express server with a `get` endpoint (e.g., `/api/questions?id=123`) that returns a question from a hardcoded array based on the provided id/index.
  - In your front-end code, modify the API call to request the philosophical questions from your own server (localhost).
  - Keep using local storage to track already answered questions.
- **Goal:** Understand the basics of creating a Node.js/Express API.

### Assignment 5: Integrating MongoDB

- **Task:** Enhance the Express API to connect with a MongoDB database.
- **Details:**
  - Let's start by making our own database, and moving our philosophical questions there.
    1. Go to https://www.mongodb.com/docs/atlas/getting-started. Follow the directions under "Atlas UI" to make an account and to create your first cluster. A cluster is basically a group of MongoDB servers that host your database in different parts of the world, for high availability. Follow the steps, and when you get to "Connect to (cluster name)", choose: "Compass".
    2. Download MongoDB Compass: this is a GUI software to manage your clusters/databases. Open Compass, and continue following the instructions to connect to your cluster.
    3. Once connected to your cluster, take a look around the sample database that's already been provided, to get an idea of what a database can look like.
       - In the sidebar, you'll see that structure basically works like this: a cluster contains database(s), databases contain collections - which are groups/categories of documents. One document is one entry/item.
       - Example: Your Netflix-knockoff site's database could be hosted on cluster: "cluster0.ab392f.mongodb.net". The database, named "mflix", contains several collections, such as "movies", "actors", "genres", "directors". The "movies" collection will contain documents: 1 document = 1 movie.
       
       ![mongodb](https://github.com/user-attachments/assets/9c75ffc9-f3a3-48fd-bccd-40f00253039a)
  - You can now delete the sample database, and make your own database, containing a collection of questions (1 question = 1 document).
  - In your project, install Mongoose (npm package that will help you connect to your database): `npm install mongoose`.
  - In your server script (_app.js_),  Use Mongoose to set up a connection to a MongoDB database and define a schema for philosophical questions. Refer to the [Mongoose documentation](https://www.npmjs.com/package/mongoose).
  - Modify your `get` questions endpoint to fetch questions from the database using the provided ID.
  - Ensure that your front-end application remains functional, using local storage to track the already answered questions.
- **Goal:** Learn how to connect an Express API to a MongoDB database.

### Assignment 6: User Authentication and Enhanced Functionality

- **Task:** Implement user login functionality.
- **Details:**
  - On your server: Use a library (npm package) like bcrypt to hash passwords and implement a simple username/password authentication system.
  - Create endpoints for user registration and login.
  - Modify the API to handle user-specific data, so the `get` request does not need to include a question ID. Instead, find the user's data in the database, to find out which questions they haven't answered yet. One of those questions can be fetched from the database and returned in your reponse.
  - In the front-end, you can now remove the logic that kept track of the answered questions in local storage. This info is now stored in the user's account in the database.
- **Goal:** Learn about user authentication and session management in a web application.

## Final Outcome

By the end of this challenge, you will have built a fully functional philosophical journal website. This project will serve as a comprehensive introduction to full-stack development, equipping you with practical skills in both front-end and back-end technologies.
