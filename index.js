var express = require('express');
var session = require('express-session');
var app = express();
const memStore = new session.MemoryStore();
const keycloak = require('./config/keycloak-config.js').initKeycloak(memStore);
const controllers = require('./controller/controllers');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT;

app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: memStore
    })
)
app.use(keycloak.middleware());

app.use('/v1/api/openid', controllers.authController);
app.use('/test', controllers.testController);


app.get('/', function(req, res){
   res.send("AuthService API - with Keycloak integration");
});

app.listen(PORT);