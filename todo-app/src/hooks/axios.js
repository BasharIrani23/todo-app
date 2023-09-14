// hooks/axios.js
import axios from "axios";

//export const baseURL = "https://auth-server-xbzl.onrender.com";
export const baseURL = "http://localhost:3001/api/v1/";

const instance = axios.create({
    baseURL,
});

// Add an interceptor for handling request errors globally
instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // Handle specific error status codes as needed
            if (error.response.status === 401) {
                // Redirect to the login page or handle unauthorized access
                // Example: history.push('/login');
            }
        }
        return Promise.reject(error);
    }
);

export default instance;
