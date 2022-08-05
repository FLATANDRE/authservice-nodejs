var request = require('request');

class KeycloakService {

    constructor(kcAdminClient) {
        this.kcAdminClient = kcAdminClient;
    }

    getToken() {   
        /*var options = {
            'method': 'POST',
            'url': 'http://127.0.0.1:8080/realms/heroes/protocol/openid-connect/token',
            'headers': {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
              'client_id': 'admin-cli',
              'username': 'thor',
              'password': 'thor',
              'grant_type': 'password'
            }
          };
          */
          request(options, function (error, response) {
            if (error) throw new Error(error);
            console.log(response.body);
          });
        return {auth_token : 'asfksdglçdfkgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdfgdf'};
    }

    getUserInfo() {
        return {
            email : 'teste@gmail.com',
            name : 'Teste',
            username : 'teste@gmail.com',
            roles : ['admin', 'user']
        };
    }

    logOut() {
        return true;
    }
}

module.exports = KeycloakService;