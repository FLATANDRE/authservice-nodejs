const { parseJwt } = require("../util/env-functions");

class AuthService {

    constructor(keycloakService) {
        this.keycloakService = keycloakService;

    }

    async login (username, password) {
        return await this.keycloakService.getToken(username,password);
    }

    async getUserInfo (token) {
        return await this.keycloakService.getUserInfo(token);
    }

    logout () {
        return this.keycloakService.logout();
    }
}

module.exports = AuthService;