import React from "react";
import { MantineProvider } from "@mantine/core";
import Todo from "./Components/Todo";
import SettingsProvider from "./Context/Setting/index";

export default class App extends React.Component {
    render() {
        return (
            <MantineProvider withGlobalStyles withNormalizeCSS>
                <SettingsProvider>
                    <Todo />
                </SettingsProvider>
            </MantineProvider>
        );
    }
}
