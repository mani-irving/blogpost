import React, { forwardRef, useId } from "react";

/**
 * Input component - a reusable input field with optional label and dark mode support.
 * Uses forwardRef for integrating with form libraries (like React Hook Form).
 *
 * @param {Object} props - Component props
 * @param {string} [props.label] - Optional label text displayed above the input
 * @param {string} [props.type="text"] - Input type (text, email, password, etc.)
 * @param {string} [props.className=""] - Optional additional Tailwind classes
 * @param {string} [props.placeholder=""] - Placeholder text for the input
 * @param {React.Ref} ref - Ref forwarded to the input element
 * @returns {JSX.Element}
 */
const Input = forwardRef(function Input(
  {
    label,
    type = "text",
    className = "",
    placeholder = "",
    ...props // Capture any extra props (e.g. value, onChange, name, etc.)
  },
  ref
) {
  // Generate a unique ID to associate label and input
  const id = useId();

  return (
    <div>
      {/* Conditionally render label if provided */}
      {label && (
        <label className="block mb-1 font-medium" htmlFor={id}>
          {label}
        </label>
      )}

      <input
        id={id} // Connect label to input for accessibility
        ref={ref} // Forwarded ref for form libraries or manual focus
        type={type}
        placeholder={placeholder}
        // Tailwind CSS classes with built-in dark mode variants
        className={`w-full px-4 py-2 rounded-lg border outline-none focus:ring-2
          bg-white text-gray-900 border-gray-300 focus:ring-blue-500
          dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500
          ${className}`} // Allow custom styling overrides
        {...props} // Spread remaining input-related props like onChange, value, name, etc.
      />
    </div>
  );
});

export default Input;
