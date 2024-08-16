export type InputFieldProps = {
    label: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

const ColorInput = ({label, name, value, onChange, onClick, ...rest}: InputFieldProps) => {
    return (
        <div {...rest}>
            <label
                htmlFor={name}
                className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <input
                {...rest}
                type="color"
                className="w-full p-1 h-10 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                id={name}
                value={value}
                onChange={onChange}
                onClick={onClick}
            />
        </div>
    );
};

export default ColorInput;
