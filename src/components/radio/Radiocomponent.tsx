import {useEffect, useState} from "react";

interface RadioProps{
    buttonSize?: 'small' | 'medium'| 'large',
    textSize?: 'small' | 'medium'| 'large',
    isDisabled?: boolean;
    fillColor?:string; //체크되면 표시되는 안쪽동그라미의 색깔
    onClick?: (event: React.MouseEvent) => void;
    checked?: boolean; //만약 다른페이지에서 정보가 넘어오면 체크되있는걸로 표시
    children?: React.ReactNode;
}



const Radiocomponent = ({
                            buttonSize= "medium",
                            textSize = "small",
                            fillColor = "blue",
                            checked = true,
                            onClick = (event: React.MouseEvent) => {

                                console.log('click!');
                                event.stopPropagation();
                            },
                            isDisabled = false,
                            children
                        }: RadioProps) => {

    const [clicked , setIsClicked] = useState(checked);
    const [outSidebackgroundColor, setOutSideBackgroundColor] = useState("bg-transparent");
    const [cursorStyle, setCursorStyle] = useState("cursor-pointer");
    const [inSidebackgroundColor, setinSidebackgroundColor] = useState("transparent");
    const [txtSize , settxtSize] =  useState(textSize);
    const [outSidebtnSize , setOutsideBtnSize]=useState("w-4 h-4");
    const [inSidebtnSize , setingsideBtnSize]=useState("w-2 h-2");
    useEffect(() => {
        if(isDisabled){
            setOutSideBackgroundColor("gray");
            setCursorStyle("cursor-no-drop");
        } else {
            if(fillColor !== undefined) {
                setOutSideBackgroundColor("white");
                setinSidebackgroundColor(fillColor);
                setCursorStyle("cursor-pointer");
            }
            let outSidebtnSize= "w-4 h-4";
            let inSidebtnSize= "w-4 h-4";
            switch(buttonSize) {
                case 'medium':
//왜 small떄는 안에 쏙 안들어가지??
                    outSidebtnSize = "w-8 h-8";
                    inSidebtnSize= "w-4 h-4";
                    break;

                case 'large':
                    outSidebtnSize = "w-12 h-12";
                    inSidebtnSize= "w-6 h-6";
                    break;

                default:

                    outSidebtnSize = "w-4 h-4";
                    inSidebtnSize= "w-2 h-2";
                    break;
            }
            setOutsideBtnSize(outSidebtnSize);
            setingsideBtnSize(inSidebtnSize);
            if(children !== undefined){
                let size = "text-sm";
                switch(textSize) {
                    case 'medium':
                    size = "text-base";
                    break;

                    case 'large':
                    size = "text-lg";
                    break;

                    default:
                    size = "text-sm";
                    break;
                }
                settxtSize(size);
            }
        }
    }, [isDisabled, fillColor,clicked]);

    const clickRadio = () => {
        if(!isDisabled) {
            setIsClicked(!clicked);
        }
    }

    return (
        <div
            className={`relative ${outSidebtnSize} ${cursorStyle} ${outSidebackgroundColor} border-solid border-gray-800 rounded-full border-2`}
            onClick={clickRadio}
        >
            {clicked && <div className={`absolute ${inSidebtnSize} bg-${inSidebackgroundColor} top-1/4 left-1/4 w-4 h-4 border-solid border-gray-800 rounded-full border-2`}></div>}
            <span className={`${txtSize} bottom-4`}>{children}</span>
        {/*    글자가 왜 세로로 나오지??*/}
        </div>
    );
};

export default Radiocomponent;
