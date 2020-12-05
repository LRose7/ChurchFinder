import axios from 'axios';

export default axios.create({
    baseurl: 'http://localhost:5000/churches',
    headers: {
        'Content-type': 'application/json'
    }
});