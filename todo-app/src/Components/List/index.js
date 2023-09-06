import React, { useContext } from "react";
import { Pagination } from "@mantine/core";
import { settingsContext } from "../../Context/Setting";
import "./list.scss";

const ListItem = ({ item, toggleComplete }) => (
    <article className="list-item" key={item.id}>
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
    const { itemsPerPage, currentPage, setCurrentPage } =
        useContext(settingsContext);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const sortedList = list.sort((a, b) =>
        a.difficulty > b.difficulty ? 1 : -1
    );
    const itemsToDisplay = sortedList.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <section className="list">
            {itemsToDisplay.map((item) => (
                <ListItem item={item} toggleComplete={toggleComplete} />
            ))}

            {list.length > itemsPerPage && (
                <Pagination
                    total={Math.ceil(list.length / itemsPerPage)}
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
