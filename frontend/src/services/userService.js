//userService provide user asynchronous logics to VueX actions

import axios from "axios";
//require('dotenv').config();

export default {
    loginUser(user) {
        let payload = { email: user.email, password: user.password };
        return axios.post('http://localhost:3000/api/auth/login', payload);
    }
}