import React, { useEffect, useState } from "react";
import {makeRandomNumber} from "../../methods/Utils.ts"
interface ToolTipProps {
    title: string;
    ttPosition?: "top" | "bottom" | "left" | "right";
    isDisabled?: boolean;
    size?: string;
    children?: React.ReactNode;
    bgColor?: string;

    textColor?: string;
    trigger?: string;

}
//포지션 문제 해결되면 삼각형 만들어보기
interface divStyle {
    position?:string | undefined,
    backgroundColor?: string | undefined,
    color?: string | undefined,
}
const ToolTipComponent = ({
                              title,
                              isDisabled = false,
                              ttPosition = "bottom",
                              size = "auto",
                              bgColor = "red",
                              textColor = "white",
                              trigger = "hover",
                              children,
                          }: ToolTipProps) => {
    const [isAppear, setIsAppear] = useState(false);
    const [style, setStyle] = useState<divStyle>({})
    const [position , setPosition] =  useState("bottom-12");

    const [width , setWidth] =useState("w-4");
    const [height , setHeight] =useState("h-4");
    const id = makeRandomNumber();
    const handleMouseEnter = (event) => {

        setIsAppear(true);
        event.stopPropagation();
    };

    const handleMouseLeave = (event) => {

        setIsAppear(false);
        event.stopPropagation();
    };

    const handleOnclick = () =>{
        setIsAppear(!isAppear);
    }

    useEffect(() => {

        let backgroundColor=bgColor;
        const color = textColor;
        switch (ttPosition) {
            case "top":
                setPosition(" -top-4");//포지션이 안바뀜 left-0만 먹히고 나머지는 아예안먹힘
                break;
            case "bottom":
                setPosition("left-[4px] top-[8px]");
                break;
            case "left":
                setPosition("-left-4");
                break;
            case "right":
                setPosition("-right-4");
                break;
            default:
                setPosition("-top-12");
                break;
        }

        switch (size) {
            case "auto":
                setWidth( "w-auto");
                setHeight("h-auto");
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
                setWidth( "w-auto");
                setHeight("h-auto");
                break;


        }


        setStyle({
            ...style,
            backgroundColor,
            color
        });


        const element = document.getElementById(`tooltip_${id}`);

        if (trigger === "hover" && element) {
            element.addEventListener("mouseenter", handleMouseEnter);
            element.addEventListener("mouseleave", handleMouseLeave);
        }
        else if(trigger === "click" && element){
            element.addEventListener("click", handleOnclick);
            element.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            if(trigger === "hover" && element){
                element.removeEventListener("mouseenter", handleMouseEnter);
                element.removeEventListener("mouseleave", handleMouseLeave);
            }
            else if(trigger === "click" && element){
                element.removeEventListener("click", handleOnclick);
                element.removeEventListener("mouseleave", handleMouseLeave);
            }

        }
    }, [isAppear, ttPosition, isDisabled,size]);



    return (
        <div     id={`tooltip_${id}`} className={`relative  inline-block`}>
                <span

                    //className={`${position} absolute text-center z-50 `}
                    className={`absolute ${position}  ${width} ${height} text-center z-50 `}
                >
                    {trigger === "hover" && <span style={style} className={`${isAppear ? "visible" : "invisible"}`}>
                        {isDisabled === true ? "볼 수 없습니다." : title}
                    </span>}
                    {trigger === "click" && <span style={style} className={`${isAppear ? "visible" : "invisible"}`}>
                     {isDisabled === true ? "볼 수 없습니다." : title}
                    </span>}
                </span
>
                    {children}
            </div>
    );
};

export default ToolTipComponent;
