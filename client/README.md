# Home Assignment React App

## Introduction

This is a web interface that allows the user to create a playlist of YouTube videos, and plays them in order.

- It starts with an empty playlist, and nothing playing in the player.
- A user can add a video by inserting a YouTube URL into the input field and pressing enter / clicking add.
- After adding the video, it is added to the bottom of the list, showing its thumbnail, title and length.
- The player plays the videos in the order they were added.
- Once a video finishes playing, it is removed from the list, and the next video will begin
  playing.
- When the playlist is empty and the first song is added, it's immediately starts to play.
- If a client joined when there’s an active playlist, the player will play the first song in the list, from the beginning.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Quick Start
- Install the client app by running `npm install` in the `client` directory.
- Make sure port `3000` is available on your computer.
- Start the client app by running `npm start` in the `client` directory.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
