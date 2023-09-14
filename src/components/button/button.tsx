import React from 'react';

interface ButtonProps {
    text: string;
    buttonSize: string;
    textSize: string;
    icon: JSX.Element | null;
    iconSize: string;
    iconPosition: string;
    isDisabled: boolean;
    onClick: () => void;
}

const ButtonComponent = ({
                             text = "",
                             buttonSize = "12px",
                             textSize = "text-sm",
                             icon = null,
                             iconSize = "28px",
                             iconPosition = "before",
                             isDisabled = false,
                             onClick = () => {}
                         }: ButtonProps) => {
    const buttonStyle = {
        width: buttonSize,
        height: buttonSize,
    };

    const buttonClasses = `flex flex-auto border-2 border-red-100 bg-red-50`;

    return (
        <button
            style={buttonStyle}
            className={buttonClasses}
            disabled={isDisabled}
            onClick={onClick}
        >
            {icon && iconPosition === "before" && <span style={{ fontSize: iconSize }}>{icon}</span>}
            {textSize !== "none" && <span className={`${textSize}`}>{text}</span>}
            {icon && iconPosition === "after" && <span style={{ fontSize: iconSize }}>{icon}</span>}
        </button>
    );
}

export default ButtonComponent;
