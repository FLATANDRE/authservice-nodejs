var express = require('express');
var session = require('express-session');
var app = express();
const memStore = new session.MemoryStore();
const keycloak = require('./config/keycloak-config.js').initKeycloak(memStore);
const controllers = require('./controller/controllers');

app.use(
    session({
        secret: 'apiauthbasedkeycloak',
        resave: false,
        saveUninitialized: true,
        store: memStore
    })
)
app.use(keycloak.middleware());

app.use('/v1/api/openid', controllers.authController);
app.use('/test', controllers.testController);


app.get('/', function(req, res){
   res.send("Server is up!");
});

app.listen(3000);