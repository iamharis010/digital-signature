import { useState } from "react";

export type DropdownOption = {
    label: string;
    value: string;
};

type DropdownButtonProps = {
    label: string;
    options: DropdownOption[];
    onOptionClick: (option: DropdownOption) => void;
    buttonClassName?: string;
    dropdownClassName?: string;
    variantClassName?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "onClick">;

const DropdownButton = ({
    label,
    options,
    onOptionClick,
    buttonClassName = "",
    dropdownClassName = "",
    variantClassName = "",
}: DropdownButtonProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option: DropdownOption) => {
        onOptionClick(option);
        setIsOpen(false); // Close the dropdown after selection
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={toggleDropdown}
                className={`text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center ${buttonClassName} ${variantClassName}`.trimEnd()}
                type="button"
            >
                {label}
                <svg
                    className="w-2.5 h-2.5 ml-2"
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

            {isOpen && (
                <div
                    className={`absolute z-10 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 ${dropdownClassName}`}
                >
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        {options.map((option) => (
                            <li key={option.value}>
                                <button
                                    onClick={() => handleOptionClick(option)}
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default DropdownButton;
