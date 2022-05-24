import axios from "axios";

export const BASE_URL = "https://floating-retreat-28847.herokuapp.com/api/";

// const user = JSON.parse((JSON.parse(localStorage.getItem("persist:root")).user))
// console.log(user);
// const accessToken = user.currentUser.accessToken

// const user = JSON.parse(localStorage.getItem("persist:root")) && JSON.parse(localStorage.getItem("persist:root")).user;
const user = JSON.parse(localStorage.getItem("user")) || null;
const currentUser = user ? user.currentUser : null;
const TOKEN = currentUser ? currentUser.accessToken : null;


export const publicRequest = axios.create({
 baseURL: BASE_URL,
});


export const userRequest = axios.create({
 baseURL: BASE_URL,
 headers: { token: `Bearer ${TOKEN}` },
});