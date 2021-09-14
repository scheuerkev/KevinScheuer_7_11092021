//DotEnv requirement
require('dotenv').config();

//OpenAPI 3.0 Specifications and requirements
const swaggerUI = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const openAPIOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Groupomania API",
            version: "1.0.0",
            description: "Groupomania is a private Express RESTful API to provide HTTP services to Groupomania web app"
        },
        servers: [
            {
                url: "http://localhost:5000"
            }
        ],
    },
    apis: ["./routes/*.js"],
};
const openAPISpecs = swaggerJSDoc(openAPIOptions);

//Express rate-limit to constrain number of requests
const rateLimit = require('express-rate-limit');
const apiLimiter = rateLimit({
    windowsMs: 15 * 60 * 1000, //15 minutes
    max: 100
});

//App requirements and security
const express = require('express');
const helmet = require('helmet');
const path = require('path');

//Importing routers
const userRoutes = require('./routes/user.js');
const postRoutes  = require('./routes/post.js');

//Launching app
const app = express();

const db = require('./config/database');
// DB connection
db.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
    })

//CORS Policy
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


//Calls
app.use('/api/', apiLimiter);
app.use(express.json());
app.use(helmet());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/post', postRoutes);


//Export the app
module.exports = app;