import axios from "axios";
import axiosSecure from "../utils/axiosSecure";

type Credentials = {
    name: string;
    password: string;
};

const login = async (credentials: Credentials) => {
    const response = await axiosSecure.post("/login", credentials);

    const csrfToken = response.headers["x-csrf-token"];

    if (csrfToken) {
        localStorage.setItem("csrfToken", csrfToken);
    }

    return response.data;
};

const restoreLogin = async () => {
    try {
        const response = await axiosSecure.get("/login/me");
        return response.data; // Usuario logueado
    } catch {
        return null; // No logueado
    }
};

const logout = async () => {
    await axiosSecure.post("/login/logout");
    localStorage.removeItem("csrfToken");
};

export default { login, restoreLogin, logout };
