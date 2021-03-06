This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Globe Project

![screenshot](https://git-repo-img.s3.eu-west-2.amazonaws.com/globe-project.png)

This application maps longitue and latitude information for imaginary theatres from a JSON file and expresses it in a cool 3D visualisation in the browser. It uses the package `three` for the 3D rendering logic used in the popular three.js library, `styled-components` for css in js and `react-spring` for physics based animation for react. You can check it out [here](https://globe-project.surge.sh/) hosted on surge if you don't feel like building the project.

# Starting the project

Use yarn to install packages with the command `yarn install` and then start the application using `yarn start`. The applications controls is based off the three js `orbitControl.js` logic, so click and drag the scene to rotate and use the mouse wheel to zoom in and out. The stylised globe is studded with little green theaters and when clicking them it will display some info about the theatre.

