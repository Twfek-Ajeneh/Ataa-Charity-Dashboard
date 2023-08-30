import axios from "axios";

// true => json-server local
// false => osama
export const Switch = true;

export const axios1 = axios.create({
    baseURL : 'http://localhost:8000',
    // baseURL: 'http://192.168.212.106:8000',
    timeout: 15000,
    headers: {"Content-type": "application/json"},
});


export const axios2 = axios.create({
    baseURL : 'http://192.168.211.109:3000/api/w',
    timeout: 15000,
});

// headers: {"Content-type": "application/json"},
// headers: { "Content-Type": "multipart/form-data" },
// axios2.defaults.baseURL.toString().slice(0 , -5)
