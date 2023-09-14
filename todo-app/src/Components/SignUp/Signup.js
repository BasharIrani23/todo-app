import React, { useState } from "react";
import axios from "axios";
import instance from "../../hooks/axios";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [error, setError] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();

        try {
            const response = await instance.post("/auth/signup", {
                username,
                password,
            });

            console.log("Signup Response:", response);

            // Check if the signup was successful (you may need to adjust this based on your API response)
            if (response.status === 201) {
                setSignupSuccess(true);
                setError(null);
            } else {
                setError("Signup failed. Please try again.");
            }
        } catch (error) {
            setError("Signup failed. Please try again.");
        }
    };

    return (
        <div>
            {signupSuccess ? (
                <div>
                    <h2>Signup Successful</h2>
                    <p>You can now log in with your new account.</p>
                    {/* Provide a link or button to navigate to the login page */}
                </div>
            ) : (
                <form onSubmit={handleSignup}>
                    {/* Display error message if signup fails */}
                    {error && <p className="error">{error}</p>}
                    <input
                        type="text"
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
                    <button type="submit">Sign Up</button>
                </form>
            )}
        </div>
    );
};

export default Signup;
