// App.jsx
import React from "react";
import { MantineProvider } from "@mantine/core";
import Todo from "./Components/Todo";
import SettingsProvider from "./Context/Setting/index";

const App = () => (
    <MantineProvider withGlobalStyles withNormalizeCSS>
        <SettingsProvider>
            <Todo />
        </SettingsProvider>
    </MantineProvider>
);

export default App;
