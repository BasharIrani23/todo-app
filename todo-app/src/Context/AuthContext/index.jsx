import React, { createContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";
import cookie from "react-cookies";

export const AuthContext = createContext();
const testUsers = {
    Administrator: {
        //  "capabilities": "['create','read','update','delete']",

        password: "admin",
        name: "Administrator",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ",
    },
    Editor: {
        //capabilities": "['read','update']
        password: "editor",
        name: "Editor",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s",
    },
    Writer: {
        //  "capabilities": "['create']",
        password: "writer",
        name: "Writer",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68",
    },
    User: {
        //  "capabilities": "['read']",
        password: "user",
        name: "User",
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go",
    },
};

export const AuthProvider = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState({});
    const [capabilities, setCapabilities] = useState([]);

    // This function checks if the user has a specific capability.
    const can = (capability) => {
        return isAuthenticated && capabilities?.includes(capability);
    };

    const login = (username, password) => {
        let auth = testUsers[username];
        if (auth && auth.password === password) {
            validateToken(auth.token, username);
        }
    };

    const validateToken = (token, username) => {
        try {
            const authUser = jwt_decode(token);
            setCapabilities(authUser.capabilities);
            setUser({ username: username, ...authUser });
            setIsAuthenticated(true);
            cookie.save("auth", token);
        } catch (e) {
            setIsAuthenticated(false);
            setUser({});
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
            validateToken(authCookie);
        }
    }, []);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, login, logout, can }} // Here, the `can` function is provided
        >
            {props.children}
        </AuthContext.Provider>
    );
};
