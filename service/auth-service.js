class AuthService {

    constructor(keycloakService) {
        this.keycloakService = keycloakService;

    }

    login (username, password) {
        return this.keycloakService.getToken();
    }

    getUserInfo (username) {
        return this.keycloakService.getUserInfo();
    }

    logout () {
        return this.keycloakService.logout();
    }
}

module.exports = AuthService;