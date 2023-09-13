import React, { useContext } from "react";
import { Pagination } from "@mantine/core";
import { SettingsContext } from "../../Context/Setting/index";
import { AuthContext } from "../../Context/AuthContext/index";
import "./list.scss";

const ListItem = ({ item, can }) => {
    const { list, setList } = useContext(SettingsContext);

    const toggleComplete = (id) => {
        if (can("update")) {
            const updatedList = list.map((item) => {
                if (item.id === id) {
                    item.complete = !item.complete;
                }
                return item;
            });
            setList(updatedList);
        } else {
            console.log("You don't have permission to toggle complete.");
        }
    };

    const deleteItem = (id) => {
        if (can("delete")) {
            const updatedList = list.filter((item) => item.id !== id);
            setList(updatedList);
        } else {
            console.log("You don't have permission to delete.");
        }
    };

    return (
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

            {can("delete") && (
                <button onClick={() => deleteItem(item.id)}>Delete</button>
            )}
        </article>
    );
};

export default function List() {
    const { itemsPerPage, hideCompleted, currentPage, setCurrentPage, list } =
        useContext(SettingsContext);
    const { can } = useContext(AuthContext);

    // Check for read permission
    if (!can("read")) {
        return <div>You do not have permission to view this list.</div>;
    }

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
                <ListItem key={item.id} item={item} can={can} />
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
