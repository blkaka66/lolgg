import React, { useEffect, useState } from "react";

interface ToolTipProps {
    ttPosition?: "top" | "bottom" | "left" | "right";
    isDisabled?: boolean;
    size?: string;
    children?: React.ReactNode;
    bgColor?: string;
    textColor?: string;
    trigger?: string;
    followCursor?: boolean;
}

interface divStyle {
    position?:string | undefined,
}
const ToolTipComponent = ({
                              isDisabled = false,
                              ttPosition = "bottom",
                              size = "medium",
                              bgColor = "white",
                              textColor = "black",
                              trigger = "hover",
                              followCursor = false,
                              children,
                          }: ToolTipProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [style, setStyle] = useState<divStyle>({})
    const handleMouseEnter = (event) => {
        setIsHovered(true);
        event.stopPropagation();
    };

    const handleMouseLeave = (event) => {
        setIsHovered(false);
        event.stopPropagation();
    };

    useEffect(() => {
        let position='';
        switch (ttPosition) {
            case "top":
                position= "top-12";
                break;
            case "bottom":
                position= "bottom-12";
                break;
            case "left":
                position= "left-12";
                break;
            case "right":
                position= "right-12";
                break;
            default:
                position= "bottom-12";
                break;
        }
        setStyle(prev => {
            return {
                ...prev,
                position
            }
        })

    }, [ttPosition]);


    return (
        <span
            style = {style}
            className={`absolute w-auto h-auto  bg-black text-center z-50 `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
      <span className={`${isHovered ? "visible" : "invisible"}`}>
        {children}
      </span>
        </span>
    );
};

export default ToolTipComponent;
