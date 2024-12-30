import React from 'react';

interface TextInputProps {
  label: string;
  name: string;
  min?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string | false;
  warningIcon?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  min,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  warningIcon,
}) => {
  return (
    <div>
      <label htmlFor={name} className="block text-xs mb-2 font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <input
          type={type}
          name={name}
          id={name}
          min={min}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={
            error
              ? 'appearance-none w-full placeholder:text-[#949494] placeholder:text-sm text-[#121212] text-sm focus:border-[#F74445] focus:outline-none rounded-md border border-[#B92043] bg-[#FEECEC] py-3 px-4'
              : 'appearance-none block text-sm w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:border-purple-600 focus:outline-none'
          }
        />
        {error && warningIcon && type !== "date" && (
          <img
            src={warningIcon}
            alt="warning"
            className="absolute top-1/2 right-6 transform -translate-y-1/2 w-[14px] h-[14px]"
          />
        )}
      </div>
      {error && (
        <div className="flex gap-1 mt-1 items-center">
          {warningIcon && <img src={warningIcon} alt="warning" className="w-[14px] h-[14px]" />}
          <small className="text-[#F74445] font-medium text-xs">{error}</small>
        </div>
      )}
    </div>
  );
};

export default TextInput;
