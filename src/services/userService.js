import http from './httpService';

export default function register(user){
    return http.post('users',{
        email: user.username,
        password: user.password,
        name: user.name
    });
} 