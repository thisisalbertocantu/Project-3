# Create React Express App

## About This Boilerplate

This setup allows for a Node/Express/React app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

## Starting the app locally

Start by installing front end dependencies. Go to the project level folder and while in this directory, run the following command:

```
npm install
```

This should install node modules within the server folder


Now we need to install the back end  dependencies. Go to the client level folder and while in this directory, run the following command:

```
npm install
```

This should install node modules within the client folder.



After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.

