/**
 *
 * Author:  AppSeed.us - Full Stack App Generator
 *
 * License: MIT - Copyright (c) AppSeed.us
 * @link https://github.com/rosoftdeveloper/appseed
 *
 */

 const express = require('express');
 const bodyParser = require('body-parser');
 const cors = require('cors');
 const models = require('./models');
 const http = require('http');
 const path = require('path');
 const {checkTokenMiddleware} = require("./middlewares/authMiddlewares")
 let router = express.Router();
 /* Make all variables from our .env file available in our process */
 require('dotenv').config();
 
 /* Init express */
 const app = express();
 
 /* Here we setup the middlewares & configs */
 
 app.use(cors());
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());
 
/*** Serve pictures in protected route ***/
app.use('/files', [checkTokenMiddleware, express.static(path.join(__dirname + '/assets'))])

 /* Here we define the api routes */    
app.use(require('./routes'));
const port = process.env.API_PORT || 3000;
const address = process.env.API_ADDRESS || '127.0.0.1';
 
let server = http.createServer(app);
const servListen = server.listen(port, console.log("API listen on port : "+port));

 /* Create everything automatically with sequelize ORM */
 models.sequelize.sync().then(function () {
 
 });
 
 module.exports = app;