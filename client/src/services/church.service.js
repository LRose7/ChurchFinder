import http from './http-common';

class ChurchDataService {
    getAll() {
        return http.get('/churches/churchlist');
    }

    
//finds churches by denomination
    findByDenomination(Denomination) {
        return http.get(`/churches/search/denomination/${Denomination}`);
    }
}

export default new ChurchDataService();