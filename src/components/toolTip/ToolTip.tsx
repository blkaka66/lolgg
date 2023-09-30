import React, { useEffect, useState } from "react";

interface ToolTipProps {
    title: string;
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
                              title,
                              isDisabled = false,
                              ttPosition = "left",
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
    const [id, setId] = useState<number>(parseInt(String(Math.random() * 1000)));
    // const [width , setWidth] =useState("w-4");
    // const [height , setHeight] =useState("h-4");
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
        const color = textColor;
        switch (ttPosition) {
            case "top":
                setPosition("top-12");
                break;
            case "bottom":
                setPosition("bottom-12");
                break;
            case "left":
                setPosition("left-0 top-[-20px]");
                break;
            case "right":
                setPosition("right-12");
                break;
            default:
                setPosition("bottom-12");
                break;
        }

        // switch (size) {
        //     case "small":
        //         setWidth( "w-4");
        //         setHeight("h-4");
        //         break;
        //     case "medium":
        //         setWidth( "w-8");
        //         setHeight("h-8");
        //         break;
        //     case "large":
        //         setWidth( "w-12");
        //         setHeight("h-12");
        //         break;
        //     default:
        //         setWidth( "w-4");
        //         setHeight("h-4");
        //         break;
        //
        //
        // }


        setStyle({
            ...style,
            color
        });


        const handleMouseMove = (event: MouseEvent) => {
            const tooltip = document.getElementById(`tooltip_${id}`);
            if (tooltip) {
                const rect = tooltip.getBoundingClientRect();
                const x = event.pageX;
                const y = event.pageY;
                tooltip.style.position = "sticky";
                tooltip.style.left = `${x}px`;
                tooltip.style.top = `${y}px`;
                //tooltip.style.transform = `translate(${x}px, ${y}px)`;
            }
        };
        if (followCursor && isHovered) {
            window.addEventListener("mousemove", handleMouseMove);
        } else if(followCursor && !isHovered) {
            window.removeEventListener("mousemove", handleMouseMove);
        }
        return () =>{
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, [isHovered, ttPosition, isDisabled,size]);

    const handleClick = () => {
       
        console.log('클릭 이벤트가 발생했습니다.');
    };

    return (
      <span className={"relative inline-block"}>
                <span
                  id={`tooltip_${id}`}
                  style={style}
                  className={`${position} absolute text-center z-50 `}
                  // className={`${position} absolute ${width} ${height} text-center z-50 `}
                >
                    {trigger === "hover" && <span className={`${isHovered ? "visible" : "invisible"}`}>
                        {isDisabled === true ? "볼 수 없습니다." : title}
                    </span>}
                    {trigger === "click" && <span className={`${isHovered ? "visible" : "invisible"}`}>
                     {isDisabled === true ? "볼 수 없습니다." : title}
                    </span>}
                </span>
                <span
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                    {children}
                </span>
            </span>
    );
};

export default ToolTipComponent;
