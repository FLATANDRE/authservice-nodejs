var axios = require('axios').default;
const qs = require('qs');
const dotenv = require('dotenv');
dotenv.config();

class KeycloakService {

    appRealm = process.env.KEYCLOAK_APP_REALM; 
    baseUrl = process.env.KEYCLOAK_BASE_URL + `/auth/realms/${this.appRealm}/protocol/openid-connect`;

    formUrlEncodedHeader = { 
        'Content-Type' : 'application/x-www-form-urlencoded'
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
        const tokenUrl = '/token';

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
        const profileUrl = '/userinfo';
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

    async logout(token,idToken) {
        const logout = `/logout?id_token_hint=${idToken}`;
        const options = {
            headers: { Authorization : token },            
        };

        return axios
            .get(`${this.baseUrl}${logout}`,options)
            .then(res => {
                return res.data;
            })
            .catch(err => {
                console.log(err);
            });
    }
}

module.exports = KeycloakService;