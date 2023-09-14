import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/index";
import axios from "../../hooks/axios"; // Import axios with the updated base URL
import instance from "../../hooks/axios";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, login, logout } = useContext(AuthContext);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await instance.post(
                "/auth/signin",
                {},
                {
                    auth: {
                        username,
                        password,
                    },
                }
            );

            if (response.status === 200) {
                // Assuming the server returns a token upon successful login
                const token = response.data.token;
                login(token); // Update the AuthContext with the token
            } else {
                console.error("Login failed");
            }
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    if (isAuthenticated) {
        return <button onClick={logout}>Logout</button>;
    }

    return (
        <form onSubmit={handleLogin}>
            <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;
