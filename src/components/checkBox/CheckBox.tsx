
import button from "../button/button.tsx";
import {useEffect, useState} from "react";
interface CheckBoxProps {
    textSize?: string;
    widthSize?:  string;
    isDisabled?: boolean;
    color?:string;
    onClick?: (event: React.MouseEvent) => void;
    isV?:boolean;
    isFilled?:boolean;
    vColor?:string;
    fillColor?:string;
}

interface ButtonStyle {
    backgroundColor?: string | undefined,

}
const CheckBox = ({
                   textSize = "text-sm",
                   widthSize = "w-4",
                   color="transparent",
                   isV=false,
                   vColor="green",
                   isFilled=true,
                   fillColor="blue",
                   onClick = (event: React.MouseEvent) => {

                       console.log( 'click!' );
                       event.stopPropagation();},
                   isDisabled = false,}:CheckBoxProps) =>{
        const [style, setStyle] = useState<ButtonStyle>({})
        const [clicked , setIsClicked] = useState(false);

        useEffect(() => {
            if(isDisabled){
                color="#ccc";

            }//왜 색깔이 안바뀔까?

        }, []);

        const click = (event: React.MouseEvent) =>{
            let backgroundColor="transparent";

            if(!isDisabled)
            {
                setIsClicked(!clicked);//왜 두번째 누를때부터 색깔이바뀔까?
                onClick(event);

                console.log(clicked);

                if(isFilled && clicked){
                    backgroundColor=fillColor;

                }
                else if (isV && clicked)
                {

                }
                if(!clicked){
                    backgroundColor=color;
                }

            }
            setStyle(prevState => {
                return{
                    ...prevState,
                    backgroundColor,
                }
            })

        }


    return (
        <div

            style={style}
            className={`relative border w-4 h-4 border-black border-solid  bg-${color}`}
            onClick={click}
        >
            {isV && clicked && (
                <span
                    className={`absolute top-1/2 z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-${color}`}
                ></span>//왜안나오지
            )}
        </div>
    );



}



export default CheckBox;