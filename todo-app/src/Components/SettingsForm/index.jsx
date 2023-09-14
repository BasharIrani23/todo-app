import React, { useContext } from "react";
import { SettingsContext } from "../../Context/Setting/index";
import {
    Card,
    Grid,
    NumberInput,
    Switch,
    Text,
    TextInput,
} from "@mantine/core";

export default function SettingsForm() {
    const { hideCompleted, itemsPerPage, setHideCompleted, setItemsPerPage } =
        useContext(SettingsContext);

    const handleHideCompletedChange = (e) => {
        setHideCompleted(e.target.checked);
    };

    const handleItemsPerPageChange = (e) => {
        const value = e?.target?.value || e; // Handling both direct value and event
        setItemsPerPage(Number(value)); // Ensure value is a number
    };

    return (
        <Grid style={{ width: "80%", margin: "auto", minHeight: "80vh" }}>
            <Grid.Col xs={12} sm={8}>
                <Card withBorder p="xs">
                    <Text>Change Settings</Text>

                    <div style={{ marginBottom: "10px" }}>
                        <Switch
                            onChange={handleHideCompletedChange}
                            checked={hideCompleted}
                            label="Hide Completed ToDos"
                            mb="sm"
                            data-testid="hide-completed-switch"
                        />
                    </div>

                    <div>
                        <NumberInput
                            mb="sm"
                            onChange={handleItemsPerPageChange} // Simplified the onChange handler here
                            value={itemsPerPage}
                            label="Items Per page"
                            data-testid="items-per-page-input"
                        />
                    </div>
                </Card>
            </Grid.Col>
            <Grid.Col xs={12} sm={4}>
                <Card withBorder p="xs">
                    <Card.Section>
                        <Text m="xl">Updated Settings</Text>
                    </Card.Section>
                    <Text m="sm">
                        {hideCompleted ? "Hide" : "Show"} Completed ToDos
                    </Text>
                    <Text m="sm">Items Per page: {itemsPerPage}</Text>
                </Card>
            </Grid.Col>
        </Grid>
    );
}
