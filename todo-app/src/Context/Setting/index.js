import React, { useState } from "react";

export const settingsContext = React.createContext();

export default function SettingsProvider(props) {
    const [values, setValues] = useState({});
    const [list, setList] = useState([]);
    const [incomplete, setIncomplete] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    let initState = {
        itemsPerPage: 3,
        hideCompleted: true,
        sort: "difficulty",
        values,
        setValues,
        list,
        setList,
        incomplete,
        setIncomplete,
        currentPage,
        setCurrentPage,
    };

    return (
        <settingsContext.Provider value={initState}>
            {props.children}
        </settingsContext.Provider>
    );
}
