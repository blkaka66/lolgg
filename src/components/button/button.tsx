import React, {useEffect, useState} from 'react';
// import '../../index.css'

// small, medium, large

interface ButtonProps {
    // pre - set 3가지 : 테두리 없는것 (텍스트만 있는 버튼), 테두리만 색이 있는것, 색이 채워져있는것
    variant?: 'text' | 'outlined' | 'contained'

    text?: string;
    buttonSize?: string;
    // small: padding: 4px, textSize: 10px
    // medium: padding: 4px 4px, textSize: 12px
    // large: padding: 8px 12px, textSize: 14px
    textSize?: string;
    padding?: string;
    widthSize?: 'full' | 'fit' | number

    icon?: JSX.Element ;
    iconSize?: string;
    iconPosition?: string;
    isDisabled?: boolean;
    onClick?: () => void;
    children?: React.ReactNode;
}

type ButtonStyle = {
  width?: string | undefined
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
                             onClick = () => { console.log( 'click!' )},
  children
                         }: ButtonProps) => {

  const [style, setStyle] = useState<ButtonStyle>({})
  useEffect(() => {
    let width: string | undefined = undefined;
    let border: string = '';
    switch (variant) {
      case 'text':
        width = undefined;
        border = '0px';
    }
    switch (widthSize) {
      case 'full': width = '100%'; break;
      case 'fit': break;
      default:
        width = `${widthSize}px`
    }
    setStyle(prev => {
      return {
        ...prev,
        width
      }
    })
  }, [widthSize])

    // const buttonClasses = `flex flex-auto border-2 border-red-100 bg-red-50 items-center text-center justify-center`;
    const buttonClasses = `button ${variant}`

    return (
        <button
            style={style}
            className={buttonClasses}
            disabled={isDisabled}
            onClick={onClick}
        >
            {icon && iconPosition === "before" && <span style={{ fontSize: iconSize }}>{icon}</span>}
            {textSize !== "none" && <span className={`${textSize}`}>{children}</span>}
            {icon && iconPosition === "after" && <span style={{ fontSize: iconSize }}>{icon}</span>}
        </button>
    );
}

export default ButtonComponent;
