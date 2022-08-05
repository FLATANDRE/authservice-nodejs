var axios = require('axios').default;
const qs = require('qs');
const dotenv = require('dotenv');
dotenv.config();

class KeycloakService {

    appRealm = process.env.KEYCLOAK_APP_REALM; 
    baseUrl = process.env.KEYCLOAK_BASE_URL;

    formUrlEncodedHeader = { 
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    defaultForm = {         
        'client_id': process.env.KEYCLOAK_CLIENT_ID,
        'client_secret': process.env.KEYCLOAK_CLIENT_SECRET,
        'username': '',
        'password': '',
        'grant_type': process.env.KEYCLOAK_GRANT_TYPE,
    };

    constructor() {
    }

    async getToken(username,password) {   
        const tokenUrl = `/auth/realms/${this.appRealm}/protocol/openid-connect/token`;

        this.defaultForm.username = username;
        this.defaultForm.password = password;

        const options = {
            headers: this.formUrlEncodedHeader,            
        };
          
        return axios
            .post(`${this.baseUrl}${tokenUrl}`,qs.stringify(this.defaultForm),options)
            .then(res => {            
                return res.data;
            })
            .catch(err => {
                console.log(err);
            });
    }

    async getUserInfo(token) {
        const profileUrl = `/auth/realms/${this.appRealm}/protocol/openid-connect/userinfo`;
        const options = {
            headers: { Authorization : token },            
        };

        return axios
            .get(`${this.baseUrl}${profileUrl}`,options)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
            });
    }

    logOut() {
        return true;
    }
}

module.exports = KeycloakService;