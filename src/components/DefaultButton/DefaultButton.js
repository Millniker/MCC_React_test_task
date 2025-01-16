import React from 'react';
import "./style.css"

const DefaultButton = ({ action, actionName }) => {
    return (
        <button onClick={action}>{actionName}</button>
    );
};

export default DefaultButton;
