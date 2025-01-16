import React, { useRef, useEffect } from "react";

const DefaultInput = ({ value, onChange, placeholder }) => {
    const inputRef = useRef(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <input
            ref={inputRef} // Привязываем реф к input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder || "Введите имя узла"}
            className="form-control"
            style={{
                width: "50%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginBottom: "10px",
                fontSize: "14px",
            }}
        />
    );
};

export default DefaultInput;
