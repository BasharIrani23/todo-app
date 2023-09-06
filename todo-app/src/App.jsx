import React from "react";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

// Components
import SettingsForm from "./Components/SettingsForm/index";
import Todo from "./Components/Todo";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

// Context
import { SettingsProvider } from "./Context/Setting/index";

function App() {
    return (
        <MantineProvider withGlobalStyles withNormalizeCSS>
            <SettingsProvider>
                <Router>
                    <Header />
                    <nav style={navStyle}>
                        <Link style={linkStyle} to="/">
                            Home
                        </Link>
                        <Link style={linkStyle} to="/settings">
                            Settings
                        </Link>
                    </nav>

                    <main style={mainContentStyle}>
                        <Routes>
                            <Route path="/" element={<Todo />} />
                            <Route
                                path="/settings"
                                element={<SettingsForm />}
                            />
                        </Routes>
                    </main>

                    <Footer />
                </Router>
            </SettingsProvider>
        </MantineProvider>
    );
}

const navStyle = {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    padding: "10px 0",
    backgroundColor: "#f4f4f4",
    boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
};

const linkStyle = {
    textDecoration: "none",
    color: "#333",
    padding: "5px 10px",
    border: "1px solid #ddd",
    borderRadius: "4px",
    transition: "background-color 0.2s",

    "&:hover": {
        backgroundColor: "#e4e4e4",
    },
};

const mainContentStyle = {
    padding: "30px",
};

export default App;
