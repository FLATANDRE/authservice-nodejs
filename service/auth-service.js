const { parseJwt } = require("../util/env-functions");

class AuthService {

    constructor(keycloakService) {
        this.keycloakService = keycloakService;

    }

    async login (username, password) {
        console.log('Getting token for user ' + username);
        return await this.keycloakService.getToken(username,password);
    }

    async getUserInfo (token) {
        const {preferred_username} = parseJwt(token);
        console.log('Getting user info for user ' + preferred_username);
        return await this.keycloakService.getUserInfo(token);
    }

    async logout (token,idToken) {
        const {preferred_username} = parseJwt(token);
        console.log('Logout for user' + preferred_username);
        return await this.keycloakService.logout(token,idToken);
    }
}

module.exports = AuthService;