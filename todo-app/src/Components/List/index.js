import React, { useContext } from "react";
import { Pagination } from "@mantine/core";
import { settingsContext } from "../../Context/Setting";

export default function List({ list, toggleComplete }) {
    const { itemsPerPage, currentPage, setCurrentPage } =
        useContext(settingsContext);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    const itemsToDisplay = list.slice(startIndex, endIndex);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <div>
            {itemsToDisplay.map((item) => (
                <div key={item.id}>
                    <p>{item.text}</p>
                    <p>
                        <small>Assigned to: {item.assignee}</small>
                    </p>
                    <p>
                        <small>Difficulty: {item.difficulty}</small>
                    </p>
                    <div onClick={() => toggleComplete(item.id)}>
                        Complete: {item.complete.toString()}
                    </div>
                    <hr />
                </div>
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
        </div>
    );
}
