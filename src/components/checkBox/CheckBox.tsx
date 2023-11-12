
import button from "../button/button.tsx";
import {useEffect, useState} from "react";
interface CheckBoxProps {
    type?: 'checked' | 'filled',
    textSize?: string;
    widthSize?:  string;
    isDisabled?: boolean;
    color?:string;
    onClick?: (event: React.MouseEvent) => void;
    vColor?:string;
    fillColor?:string;
    checked?: boolean;
    // children?: React.ReactNode;
}

interface ButtonStyle {
    backgroundColor?: string | undefined,

}

// export enum CheckBoxType {
//   checked = 'checked',
//   filled = 'filled'
// }

const CheckBox = ({
                    type = 'checked',
                    textSize = "text-sm",
                    widthSize = "w-4",
                    color = "transparent",
                    vColor = "green",
                    fillColor = "blue",
                    checked = false,
                    onClick = (event: React.MouseEvent) => {

                      console.log('click!');
                      event.stopPropagation();
                    },
                    isDisabled = false,
                    children
                  }: CheckBoxProps) => {
        const [style, setStyle] = useState<ButtonStyle>({})
        const [clicked , setIsClicked] = useState(checked);

        useEffect(() => {
            if(isDisabled){
                color="#ccc";

            }//왜 색깔이 안바뀔까?

        }, []);

        useEffect(() => {

          let backgroundColor="transparent";

          if(clicked) {
            if(type === 'checked'){
              //
            } else if(type === 'filled'){
              backgroundColor = fillColor;
            }
          } else {
            backgroundColor = color;
          }

          setStyle(prevState => {
            return{
              ...prevState,
              backgroundColor,
            }
          })

        }, [clicked])

        const click = (event: React.MouseEvent) => {
          if(!isDisabled) {
            setIsClicked(!clicked);
            if(onClick) onClick(event);
          }
        }


    return (
      <div className={`flex cursor-pointer`}
           onClick={click}>
        <span
            style={style}
            className={`relative border w-4 h-4 border-black border-solid  bg-${color}`}
        >
            {/*{isV && clicked && (*/}
            {/*    <span*/}
            {/*        className={`absolute top-1/2 z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-${color}`}*/}
            {/*    ></span>//왜안나오지*/}
            {/*)}*/}
        </span>
        <span className={`text-sm ml-2`}>{children}</span>
      </div>
    );
}



export default CheckBox;
