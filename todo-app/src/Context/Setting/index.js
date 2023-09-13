import React, { useState, useEffect, createContext } from "react";

export const SettingsContext = createContext();

export const SettingsProvider = (props) => {
    const [values, setValues] = useState({});
    const [list, setList] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hideCompleted, setHideCompleted] = useState(true);
    const [itemsPerPage, setItemsPerPage] = useState(3);
    const [sortField, setSortField] = useState("difficulty");

    // Load settings from local storage
    useEffect(() => {
        const storedSettings = localStorage.getItem("settings");
        if (storedSettings) {
            const { hideCompleted, itemsPerPage, sortField } =
                JSON.parse(storedSettings);
            setHideCompleted(hideCompleted);
            setItemsPerPage(itemsPerPage);
            setSortField(sortField);
        }
    }, []);

    // Save settings to local storage
    useEffect(() => {
        const settings = { hideCompleted, itemsPerPage, sortField };
        localStorage.setItem("settings", JSON.stringify(settings));
    }, [hideCompleted, itemsPerPage, sortField]);

    // Provide all state and functions to children components
    return (
        <SettingsContext.Provider
            value={{
                values,
                setValues,
                list,
                setList,
                incomplete,
                setIncomplete,
                currentPage,
                setCurrentPage,
                hideCompleted,
                setHideCompleted,
                itemsPerPage,
                setItemsPerPage,
                sortField,
                setSortField,
            }}
        >
            {props.children}
        </SettingsContext.Provider>
    );
};
