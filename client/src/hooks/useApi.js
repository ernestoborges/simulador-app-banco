import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3333"
  });

export const useApi = () => ({

    validateToken: async (id, token) => {
        const response = await api.post("/validate", {id, token});
        return response.data;
    },
    signin: async (username, password) => {
        const response = await api.post("/register", {username, password})
        return response.data;
    },
    login: async (username, password) => {
        const response = await api.post("/login", {username, password})
        return response.data;
    },
    payment: async (user, creditee, value, token) => {
        const response = await api.post("/transaction", 
            {   
                debtee: user,
                creditee: creditee,
                transactionValue: value
            },
            { 
                headers: {"Authorization" : `Bearer ${token}`}
            }
        )
        return response.data;
    },
    transaction: async (token) => {
        const response = await api.get("/transaction", { headers: {"Authorization" : `Bearer ${token}`}})
        return response.data;
    },
    getUserData: async (token) => {
        const response = await api.get("/user", { headers: {"Authorization" : `Bearer ${token}`}})
        return response.data;
    },
    logout: async () => {
        const response = await api.post("/logout");
        return response.data;
    }
})
