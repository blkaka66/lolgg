import React from 'react';

const ButtonComponent = ({
                    text = "",
                    buttonSize = "4",
                    textSize = "text-sm",
                    icon = null,
                    // iconSize = "4",
                    // iconPosition = "before",
                    isDisabled = false,
                    onClick = null,
                }) => {
    const buttonClasses = `flex-auto border-2 border-red-100 w-${buttonSize} h-${buttonSize} bg-red-50`;

    return (

            <button
                className={buttonClasses}
                disabled={isDisabled}
                onClick={onClick}
            >
                {icon && <div>{icon}</div>}
                {/*{iconPosition === "before" && <span className={iconSize}></span>}*/}
                {textSize !== "none" && <span className={`${textSize}`}>{text}</span>}
                {/*{iconPosition === "after" && <span className={`icon icon-${iconSize}`}></span>}*/}
            </button>

    );
}

export default ButtonComponent;
