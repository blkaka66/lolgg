
import button from "../button/button.tsx";
import React, {useEffect, useState} from "react";
import checkedImage from "../../assets/checkSvg.png";
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
    children?: React.ReactNode;
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


        //두번누를떄부터 색깔이바뀔까?->첨 렌더링할때 setstyle을 안해줬기 떄문에 ->useeffect로 맨첨 렌더링할떄부터 setstyle로 backgroundcolor정의해준다.



        useEffect(() => {

          let backgroundColor="transparent";
          let backgroundImage = "none";
            let backgroundSize = "auto";
          if(isDisabled){
              backgroundColor = "gray";
          }
          else{
              if(clicked) {
                  if(type === 'checked'){
                      backgroundColor="none";
                      backgroundImage = `url(${checkedImage})`;
                      backgroundSize = "cover";
                  } else if(type === 'filled'){
                      backgroundColor = fillColor;
                  }
              } else {
                  backgroundColor = color;
              }

          }
          setStyle(prevState => {
            return {
              ...prevState,
              backgroundColor,
              backgroundImage,
              backgroundSize
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
        <span className={`text-sm ml-2 select-none`}>{children}</span>
      </div>
    );
}



export default CheckBox;
