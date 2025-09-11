import type { Register, Login } from "@/types/type";
import api from "./api";

export const login = async (login: Login) =>{
    try {
		const res = await api.post('/login', login);
		const data = res.data.data;
		localStorage.setItem('token', data.token);
		localStorage.setItem('user', JSON.stringify(data.user));
	} catch (err) {
		throw err;
	}
};

export const regsiter = async (register : Register) =>{
    try{
        const res  = await api.post('/register', register);
        return res.data
    }catch(err){
        throw err
    }
};