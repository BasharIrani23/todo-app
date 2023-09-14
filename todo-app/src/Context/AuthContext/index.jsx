import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import cookie from "react-cookies";

export const AuthContext = createContext();

export const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [capabilities, setCapabilities] = useState([]);

    const login = (token) => {
        try {
            const authUser = jwt_decode(token);
            setCapabilities(authUser.capabilities);
            setUser({ username: authUser.username, ...authUser });
            setIsAuthenticated(true);
            cookie.save("auth", token);
        } catch (e) {
            setIsAuthenticated(false);
            setUser({});
            setCapabilities([]);
            console.error("Token Validation Error", e);
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser({});
        setCapabilities([]);
        cookie.remove("auth");
    };

    useEffect(() => {
        const authCookie = cookie.load("auth");
        if (authCookie) {
            login(authCookie);
        }
    }, []);

    const can = (capability) => {
        return isAuthenticated && capabilities?.includes(capability);
    };

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, login, logout, can }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
