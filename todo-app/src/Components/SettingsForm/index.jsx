import React, { useContext } from "react";
import { SettingsContext } from "../../Context/Setting/index";

export default function SettingsForm() {
    const { hideCompleted, itemsPerPage, setHideCompleted, setItemsPerPage } =
        useContext(SettingsContext);
    console.log("setHideCompleted from SettingsForm:", setHideCompleted);

    const handleHideCompletedChange = (e) => {
        setHideCompleted(e.target.checked);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(e.target.value);
    };

    return (
        <div>
            <h2>Settings</h2>
            <form>
                <label>
                    Hide Completed Items:
                    <input
                        type="checkbox"
                        checked={hideCompleted}
                        onChange={handleHideCompletedChange}
                    />
                </label>
                <label>
                    Items Per Page:
                    <input
                        type="number"
                        value={itemsPerPage}
                        onChange={handleItemsPerPageChange}
                    />
                </label>
            </form>
        </div>
    );
}
