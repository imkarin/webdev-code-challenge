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

### Assignment 1: Basic JavaScript and DOM Manipulation

- **Task:** Implement all logic in a client-side JavaScript file.
- **Details:**
  - Create a Javascript file named "script.js", so it matches the `<script>`'s `src` in the HTML.
  - In the Javascript file, create an array of philosophical questions (you can invent these).
  - Use an event listener on the button to handle clicks.
  - When the button is clicked, retrieve the next question from the array based on its index and insert it into the DOM.
  - Include a text field (`<input type="text">`) for user responses, and when the user submits an answer, append it to the list below.
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
  - You will be provided with a basic API endpoint (e.g., `https://example.com/api/questions`) that returns philosophical questions in JSON format.
  - Use the `fetch` API to retrieve a question when the button is clicked.
  - Update the DOM with the fetched question and maintain the answer input field and list as before.
- **Goal:** Gain experience in fetching data from APIs using JavaScript.

### Assignment 4: Building a Node.js/Express API

- **Task:** Create a simple Node.js/Express API that serves philosophical questions.
- **Details:**
  - Set up an Express server with a `get` endpoint (e.g., `/api/questions/:id`) that returns a question from a hardcoded array based on the provided index.
  - In your front-end code, modify the API call to request the next question based on the index of the last answered question.
  - Keep using local storage to track already answered questions and their responses.
- **Goal:** Understand the basics of creating a Node.js/Express API.

### Assignment 5: Integrating MongoDB

- **Task:** Enhance the Express API to connect with a MongoDB database.
- **Details:**
  - Use Mongoose to set up a connection to a MongoDB database and define a schema for philosophical questions.
  - Modify the `get` endpoint to fetch questions from the database using the provided ID.
  - Ensure that your front-end application remains functional by updating the API call accordingly.
- **Goal:** Learn how to connect an Express API to a MongoDB database.

### Assignment 6: User Authentication and Enhanced Functionality

- **Task:** Implement user login functionality.
- **Details:**
  - Use a library like bcrypt to hash passwords and implement a simple username/password authentication system.
  - Create endpoints for user registration and login.
  - Modify the API to handle user-specific data, so the `get` request does not need to include a question ID. Instead, track the last-answered question based on the logged-in user.
  - Update your front-end to handle user sessions, such as storing user login status in local storage.
- **Goal:** Learn about user authentication and session management in a web application.

## Final Outcome

By the end of this challenge, you will have built a fully functional philosophical journal website. This project will serve as a comprehensive introduction to full-stack development, equipping you with practical skills in both front-end and back-end technologies.
