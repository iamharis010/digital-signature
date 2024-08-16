
type CustomButtonProps = {
    bgColor?: string;
    textColor?: string;
    borderColor?: string;
    darkBgColor?: string;
    darkTextColor?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const CustomButton = ({ 
    onClick, 
    children, 
    disabled, 
    bgColor = 'bg-gray-100', 
    textColor = 'text-gray-800', 
    borderColor = 'border-gray-500',
    darkBgColor = 'dark:bg-gray-700', 
    darkTextColor = 'dark:text-gray-400' 
}: CustomButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`w-full ${bgColor} ${textColor} text-s text-left font-medium px-2 py-2 rounded ${darkBgColor} ${darkTextColor} ${borderColor} disabled:opacity-50 disabled:cursor-not-allowed`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default CustomButton;