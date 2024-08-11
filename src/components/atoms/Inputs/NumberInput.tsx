import { InputFieldProps } from "./ColorInput";

const NumberInput = ({label, name, value, min, max, onChange, ...rest}: InputFieldProps) => {
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Ensure the value is not just a single dot or invalid number
        if (!e.target.value.includes('.') || /^\d+$/.test(e.target.value)) {
            onChange?.(e);
        }
    }

    return (
        <div className="w-full">
            <label
                htmlFor={name}
                className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
            >
                {label}
            </label>
            <input
                {...rest}
                type="number"
                className="w-full p-1 h-10 block bg-white border border-gray-200 cursor-pointer rounded-lg disabled:opacity-50 disabled:pointer-events-none"
                id={name}
                min={min}
                max={max}
                step={1}
                pattern="[0-9]*"
                inputMode="numeric"
                value={value}
                onChange={handleChange}
                onKeyDown={(e) => {
                    if (e.key === '.' || e.key === ',') {
                        e.preventDefault();
                    }
                }}
            />
        </div>
    );
};

export default NumberInput;
