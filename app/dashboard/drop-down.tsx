"use client"

import { useState } from "react";

type Props = {
    games: {
        name: string,
        id: number
    }[] | null,
    handleFilter: (id: number) => void;
    resetPage: () => void
}

const DropDown = ({ games, handleFilter, resetPage }: Props) => {
    const [selectedFilter, setSelectedFilter] = useState("Semua")
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleFilterChange = (id: number, name: string) => {
        resetPage()
        handleFilter(id)
        setSelectedFilter(name)
        setDropdownVisible(false);
    };

    return (
        <div>
            <button
                id="dropdownRadioButton"
                onClick={handleDropdownToggle}
                className="inline-flex items-center border focus:outline-none focus:ring-4  font-medium rounded-lg text-sm px-3 py-1.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                type="button"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400 me-3"
                    fill="currentColor"
                    viewBox="0 0 256 256"><path d="M176,112H152a8,8,0,0,1,0-16h24a8,8,0,0,1,0,16ZM104,96H96V88a8,8,0,0,0-16,0v8H72a8,8,0,0,0,0,16h8v8a8,8,0,0,0,16,0v-8h8a8,8,0,0,0,0-16ZM241.48,200.65a36,36,0,0,1-54.94,4.81c-.12-.12-.24-.24-.35-.37L146.48,160h-37L69.81,205.09l-.35.37A36.08,36.08,0,0,1,44,216,36,36,0,0,1,8.56,173.75a.68.68,0,0,1,0-.14L24.93,89.52A59.88,59.88,0,0,1,83.89,40H172a60.08,60.08,0,0,1,59,49.25c0,.06,0,.12,0,.18l16.37,84.17a.68.68,0,0,1,0,.14A35.74,35.74,0,0,1,241.48,200.65ZM172,144a44,44,0,0,0,0-88H83.89A43.9,43.9,0,0,0,40.68,92.37l0,.13L24.3,176.59A20,20,0,0,0,58,194.3l41.92-47.59a8,8,0,0,1,6-2.71Zm59.7,32.59-8.74-45A60,60,0,0,1,172,160h-4.2L198,194.31a20.09,20.09,0,0,0,17.46,5.39,20,20,0,0,0,16.23-23.11Z"></path></svg>
                {selectedFilter}
                <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m1 1 4 4 4-4"
                    />
                </svg>
            </button>
            {dropdownVisible && (
                <div
                    id="dropdownRadio"
                    className="z-10 w-48  divide-yrounded-lg shadow bg-gray-700 divide-gray-600 absolute"
                >
                    <ul className="p-3 space-y-1 text-sm text-gray-200">
                        <li>
                            <div className="flex items-center px-2 roundedhover:bg-gray-100 hover:bg-gray-600">
                                <input
                                    id={`filter-radio-semua`}
                                    type="radio"
                                    name="filter-radio"
                                    className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                    checked={selectedFilter == "Semua"}
                                    onChange={() => handleFilterChange(0, "Semua")}
                                />
                                <label
                                    htmlFor={`filter-radio-semua`}
                                    className="w-full ms-2 text-sm font-medium rounded text-gray-300 py-2 h-full"
                                >
                                    Semua
                                </label>
                            </div>
                        </li>
                        {games?.map(
                            (game, index) => (
                                <li key={index}>
                                    <div className="flex items-center px-2 roundedhover:bg-gray-100 hover:bg-gray-600">
                                        <input
                                            id={`filter-radio-${index}`}
                                            type="radio"
                                            name="filter-radio"
                                            className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                            checked={selectedFilter == game.name}
                                            onChange={() => handleFilterChange(game.id, game.name)}
                                        />
                                        <label
                                            htmlFor={`filter-radio-${index}`}
                                            className="w-full ms-2 text-sm font-medium rounded text-gray-300 py-2 h-full"
                                        >
                                            {game.name}
                                        </label>
                                    </div>
                                </li>
                            )
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default DropDown;