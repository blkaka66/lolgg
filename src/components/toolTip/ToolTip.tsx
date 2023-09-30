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
                              isDisabled = false,
                              ttPosition = "left",
                              size = "medium",
                              bgColor = "white",
                              textColor = "black",
                              trigger = "hover",
                              followCursor = true,
                              children,
                          }: ToolTipProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [style, setStyle] = useState<divStyle>({})
    const [position , setPosition] =  useState("bottom-12");
    const [width , setWidth] =useState("w-4");
    const [height , setHeight] =useState("h-4");
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
                setPosition("top-12");
                break;
            case "bottom":
                setPosition("bottom-12");
                break;
            case "left":
                setPosition("left-12");
                break;
            case "right":
                setPosition("right-12");
                break;
            default:
                setPosition("bottom-12");
                break;
        }

        switch (size) {
            case "small":
                setWidth( "w-4");
                setHeight("h-4");
                break;
            case "medium":
                setWidth( "w-8");
                setHeight("h-8");
                break;
            case "large":
                setWidth( "w-12");
                setHeight("h-12");
                break;
            default:
                setWidth( "w-4");
                setHeight("h-4");
                break;


        }


        setStyle({
            ...style,

            color
        });


        const handleMouseMove = (event: MouseEvent) => {
            const tooltip = document.getElementById("tooltip");
            if (tooltip) {
                const rect = tooltip.getBoundingClientRect();
                const x = event.pageX;
                const y = event.pageY;
                tooltip.style.transform = `translate(${x}px, ${y}px)`;
            }
        };
        if (followCursor) {
            window.addEventListener("mousemove", handleMouseMove);
        }
        return () =>{
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [ttPosition, isDisabled,size]);

    const handleClick = () => {
        // 클릭 이벤트 처리 로직을 여기에 추가
        console.log('클릭 이벤트가 발생했습니다.');
    };

    return (

        <span
            id = "tooltip"
            style = {style}
            className={`${position} absolute ${width} ${height} text-center z-50 `}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
        {trigger === "hover" && <span className={`${isHovered ? "visible" : "invisible"}`}>
            {isDisabled === true ? "볼 수 없습니다." : children}
        </span>}
        {trigger === "click" && <span className={`${isHovered ? "visible" : "invisible"}` }>
         {isDisabled === true ? "볼 수 없습니다." : children}
        </span>}
        </span>
    );
};

export default ToolTipComponent;
