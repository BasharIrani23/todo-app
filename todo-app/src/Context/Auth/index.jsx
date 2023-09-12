import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});

    const login = (username, password) => {
        // This is a simulation, in a real-world scenario you'd call an API.
        if (username && password) {
            setUser({
                username: username,
                capabilities: ["read", "update", "create", "delete"], // This is an example, in reality, you'd fetch this from your API
            });
            setIsAuthenticated(true);
        }
    };

    const logout = () => {
        setUser({});
        setIsAuthenticated(false);
    };

    const can = (capability) => {
        return isAuthenticated && user.capabilities?.includes(capability);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, login, logout, can }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
