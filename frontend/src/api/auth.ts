import type { Register, Login } from "@/types/type";
import api from "./api";

export const login = async (login: Login) => {
  try {
    const res = await api.post("/login", login);
    console.log("Login response:", res.data); // ✅ cek sekali lagi di console

    // ✅ langsung ambil sesuai format backend
    const { token, user } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return res.data;
  } catch (err: any) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
};


export const register = async (register: Register) => {
  try {
    const res = await api.post("/register", register);
    return res.data;
  } catch (err) {
    throw err;
  }
};


export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};
