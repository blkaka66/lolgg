
import button from "../button/button.tsx";
import {useEffect, useState} from "react";
interface CheckBoxProps {
    textSize?: string;
    widthSize?:  string;
    isDisabled?: boolean;
    color?:string;
    onClick?: () => void;
}
const CheckBox = (
                   textSize = "text-sm",
                   widthSize = "w-4",
                   color="bg-black",
                   onClick = (event) => {

                       console.log( 'click!' );
                       event.stopPropagation();},
                   isDisabled = false,) =>{

        useEffect(() => {



        }, []);
        return (
            <div className={`relative border w-4 h-4  border-black border-solid  ${color}`}>

            </div>
        );

}



export default CheckBox;