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
    backgroundColor?: string | undefined,
    color?: string | undefined,
}
const ToolTipComponent = ({
                              isDisabled = true,
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
    const [position , setPosition] =  useState("bottom-12");
    const handleMouseEnter = (event) => {
        setIsHovered(true);
        event.stopPropagation();
    };

    const handleMouseLeave = (event) => {
        setIsHovered(false);
        event.stopPropagation();
    };

    useEffect(() => {

        let backgroundColor=bgColor;
        let color=textColor;
        switch (ttPosition) {
            case "top":
                setPosition( "top-12");
                break;
            case "bottom":
                setPosition( "bottom-12");
                break;
            case "left":
                setPosition( "left-12");
                break;
            case "right":
                setPosition( "right-12");
                break;
            default:
                setPosition( "bottom-12");
                break;
        }


        setStyle({
            ...style,
        
            color
        });

    }, [ttPosition, isDisabled]);


    return (

        <span
            style = {style}
            className={`${position} absolute w-auto h-auto  text-center z-50 `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
        <span className={`${isHovered ? "visible" : "invisible"}`}>
            {isDisabled === true ? "볼 수 없습니다." : children}
        </span>
        </span>
    );
};

export default ToolTipComponent;
