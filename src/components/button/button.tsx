import React, {useEffect, useState} from 'react';
import colors from "tailwindcss/colors";
// import '../../index.css'

// small, medium, large

interface ButtonProps {
    // pre - set 3가지 : 테두리 없는것 (텍스트만 있는 버튼), 테두리만 색이 있는것, 색이 채워져있는것
    variant?: 'text' | 'outlined' | 'contained'

    text?: string;
    buttonSize?: string;

    textSize?: string;
    padding?: string;
    widthSize?: 'full' | 'fit' | number

    icon?: JSX.Element ;
    iconSize?: string;
    iconPosition?: string;
    isDisabled?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
    color?:string;
}

type ButtonStyle = {
    width?: string | undefined,
    border?: string | undefined,
    backgroundColor?: string | undefined,
    color?: string | undefined,
}
// 1: width: 30px, height: 20px;

// width: fix 된 사이즈 / Content에 맞추거나 / 100%
const ButtonComponent = ({
                             variant = "text",
                             textSize = "text-sm",
                             widthSize = "fit",
                             icon = null,
                             iconSize = "28px",
                             iconPosition = "before",
                             isDisabled = false,
                             onClick = (event) => {

                                 console.log( 'click!' );
                                 event.stopPropagation();},

                             color="white",
                             children
                         }: ButtonProps) => {

  const [style, setStyle] = useState<ButtonStyle>({})
  useEffect(() => {
    let width: string | undefined = undefined;
    let border: string = '';
    let backgroundColor=color;
    let textColor = '';
      switch (widthSize) {
          case 'full': width = '100%'; break;
          case 'fit': break;
          default:3
              width = `${widthSize}px`
      }
      if(isDisabled){
          backgroundColor="#ccc";
          textColor="black"
      }
      else{
          switch (variant) {
              case 'text':
                  backgroundColor="white";
                  border = '0px';
                  break;
              case 'outlined':
                  border ='1px solid black';
                  break;
              case 'contained':
                  border ='1px solid black';
                  textColor="white";
                  break;
          }

      }

    setStyle(prev => {
      return {
        ...prev,
        border,
        width,
        backgroundColor,
        color:textColor,
      }
    })
  }, [widthSize,variant,isDisabled])

    // const buttonClasses = `flex flex-auto border-2 border-red-100 bg-red-50 items-center text-center justify-center`;
    const buttonClasses = "relative flex items-center"//flex는 먹히는데 flex-end나 flex-auto가 안먹힌다.

    return (

            <button
                style={style}
                className={buttonClasses}
                disabled={isDisabled}
                onClick={onClick}
            >
                {icon && iconPosition === "before" && <span style={{ fontSize: iconSize ,paddingRight:"10px"}}>{icon()}</span>}
                {textSize !== "none" && <span className={`${textSize}`}>{children}</span>}
                {icon && iconPosition === "after" && <span style={{ fontSize: iconSize ,paddingLeft:"10px"}}>{icon()}</span>}
            </button>

    );
}

export default ButtonComponent;
