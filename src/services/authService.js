import http from './httpService';
import jwtDecode from 'jwt-decode';

http.setToken(getToken());

export async function login(user){
    const {data:token} = await http.post('auth',{
        email: user.username,
        password: user.password,
    });
    localStorage.setItem('token', token);
} 

export function logout(){
    localStorage.removeItem('token');
}

export function loginWithToken(token){
    localStorage.setItem('token',token);
}

export function getCurrentUser(){
    const token = localStorage.getItem("token");
    if(token) return jwtDecode(token);

    return null;
}

function getToken(){
    return localStorage.getItem("token");
}

export default {
    login,
    logout,
    loginWithToken,
    getCurrentUser
}