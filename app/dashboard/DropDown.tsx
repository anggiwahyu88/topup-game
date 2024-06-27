"use client"

import Image from "next/image";
import { useId, useState } from "react";

type Props = {
    data: {
        name: string,
        id: string
    }[] | null,
    logo: any,
    handleFilterChange: (id: string) => void,
    id: string
}

const DropDown = ({ data, logo, handleFilterChange, id }: Props) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const defaultValue = data?.find((value) => value.id == id)
    const idElement = useId()

    const handleDropdownToggle = () => {
        setDropdownVisible(!dropdownVisible);
    };
    return (
        <div className="group">
            <button
                id={`${idElement}-dropdownRadioButton`}
                onClick={handleDropdownToggle}
                className="inline-flex items-center border focus:outline-none focus:ring-4  font-medium rounded-lg text-sm px-3 py-1.5 bg-gray-800 text-white border-gray-600 hover:bg-gray-700 hover:border-gray-600 focus:ring-gray-700"
                type="button"
            >
                <Image src={logo} alt="logo" width={20} height={20} className="me-3" style={{ filter: 'invert(100%) sepia(100%) saturate(1000%) hue-rotate(180deg)' }} />
                {defaultValue?.name || "Semua"}
                <svg
                    className="w-2.5 h-2.5 ms-2.5 transition-all duration-300 group-hover:transform-180 "
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
            <div
                id={`${idElement}-dropdownRadio`}
                className="z-10 w-48 hidden group-hover:block divide-yrounded-lg shadow bg-gray-700 divide-gray-600 absolute"
            >
                <ul className="p-3 space-y-1 text-sm text-gray-200">
                    <li>
                        <div className="flex items-center px-2 roundedhover:bg-gray-100 hover:bg-gray-600">
                            <input
                                id={`${idElement}-all`}
                                type="radio"
                                name={`${idElement}-filter-radio`}
                                className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                checked={!defaultValue}
                                onChange={() => handleFilterChange("0")}
                            />
                            <label
                                htmlFor={`${idElement}-all`}
                                className="w-full ms-2 text-sm font-medium rounded text-gray-300 py-2 h-full"
                            >
                                Semua
                            </label>
                        </div>
                    </li>
                    {data?.map(
                        (value, index) => (
                            <li key={index}>
                                <div className="flex items-center px-2 roundedhover:bg-gray-100 hover:bg-gray-600">
                                    <input
                                        id={`${idElement}-${index}`}
                                        type="radio"
                                        name={`${idElement}-filter-radio`}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-600 ring-offset-gray-800 focus:ring-offset-gray-800 focus:ring-2 bg-gray-700 border-gray-600"
                                        checked={id == value.id}
                                        onChange={() => handleFilterChange(value.id)}
                                    />
                                    <label
                                        htmlFor={`${idElement}-${index}`}
                                        className="w-full ms-2 text-sm font-medium rounded text-gray-300 py-2 h-full"
                                    >
                                        {value.name}
                                    </label>
                                </div>
                            </li>
                        )
                    )}
                </ul>
            </div>
        </div>
    );
}

export default DropDown;