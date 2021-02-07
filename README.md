![Preview](https://res.cloudinary.com/duug1ffde/image/upload/c_scale,q_auto,w_1600/v1612538540/active-learning-combined_s5qq8z.png)

# Active Learning Tools

A web app for gamifying the learning process, similar to how [Kahoot!](https://kahoot.com/) works. Teachers are able to create and host quizzes, allowing students to compete against each other in realtime. Built during my final year of university as part of my dissertation.

This particular repo houses the frontend in the form of a React app bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Backend: https://github.com/shaunedwards/quiz-server

## Live Demo

https://quiz.sme.dev

If you don't wish to create your own account, you can login with the following details:

**User:** demouser  
**Pass:** demopass

## Tech Stack

- React
- Routing: React Router
- Design System: Material UI
- E2E Testing: Jest & Puppeteer
- Socket&#46;IO for realtime functionality

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v12 or later recommended)

### Installation

1.  Clone the repository
2.  Run `npm install` to install the required dependencies (if you're not planning on running tests, you can skip installing dev dependencies using the command `npm install --only=prod`)
3.  Create the file `.env.local` in the root directory using `.env.local.sample` as an example of how this should be done
4.  Run the development server using `npm start`

## TODO

- [ ] Support for custom nicknames
- [ ] Support for additional question types (e.g. image choice)
- [ ] View statistics on previously hosted games through the dashboard
