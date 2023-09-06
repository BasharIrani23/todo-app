import React, { useContext } from "react";
import { Pagination } from "@mantine/core";
import { SettingsContext } from "../../Context/Setting/index";

import "./list.scss";

const ListItem = ({ item, toggleComplete }) => (
    <article className="list-item">
        <p>{item.text}</p>
        <p>
            <small>Assigned to: {item.assignee}</small>
        </p>
        <p>
            <small>Difficulty: {item.difficulty}</small>
        </p>
        <div
            onClick={() => toggleComplete(item.id)}
            className={item.complete ? "completed" : ""}
        >
            Complete: {item.complete.toString()}
        </div>
    </article>
);

export default function List({ list, toggleComplete }) {
    const { itemsPerPage, hideCompleted, currentPage, setCurrentPage } =
        useContext(SettingsContext);

    const sortedList = list.sort((a, b) =>
        a.difficulty > b.difficulty ? 1 : -1
    );
    const filteredList = hideCompleted
        ? sortedList.filter((item) => !item.complete)
        : sortedList;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToDisplay = filteredList.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <section className="list">
            {itemsToDisplay.map((item) => (
                <ListItem
                    key={item.id}
                    item={item}
                    toggleComplete={toggleComplete}
                />
            ))}

            {filteredList.length > itemsPerPage && (
                <Pagination
                    total={Math.ceil(filteredList.length / itemsPerPage)}
                    value={currentPage}
                    onChange={handlePageChange}
                    position="center"
                    styles={(theme) => ({
                        control: {
                            "&[data-active]": {
                                backgroundImage: theme.fn.gradient({
                                    from: "red",
                                    to: "yellow",
                                }),
                                border: 0,
                            },
                        },
                    })}
                />
            )}
        </section>
    );
}
