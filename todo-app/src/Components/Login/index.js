import React, { useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext/index";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { isAuthenticated, login, logout } = useContext(AuthContext);

    const handleLogin = (e) => {
        e.preventDefault();
        login(username, password);
        // set the token in a cookie here
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
