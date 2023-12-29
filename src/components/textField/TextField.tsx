import React, {useEffect, useRef, useState} from 'react';

interface TextFieldProps {
  label?:"standard" | "outlined",
  size?:"small" |"medium" |"large",
  placeholderr?:string,
}
interface containerRefStyle {
    width?: string | undefined,
    height?: string | undefined,
    border?: string | undefined,
}

const TextField = ({
    label = "standard",
    size = "medium",
    placeholderr = "입력하세요"
   }:TextFieldProps
) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isAppear, setIsAppear] = useState(true);
    const [inputstate , setInputState] =  useState("standard");
    const [style, setStyle] = useState<containerRefStyle>({})
    useEffect(() => {
        let width: string | undefined = undefined;
        let height: string | undefined = undefined;
        let border: string = '';
        if(label === "standard"){
            border ="1px solid black";
        }
        switch(size){
           case "small":
               width="8px",
               height="8px";
               break;
           case "medium":
               width="120px",
               height="40px";
               break;
           case "large":
               width="16px",
               height="16px";
               break;
       }
        setStyle(prev => {
            return {
                ...prev,
                width,
                height,
                border,
            }
        })
    }, [])

    useEffect(() => {
        document.addEventListener("mousedown", handleOnclick);
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOnclick);
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [])


    const handleOnclick = () => {
        setIsAppear(true);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsAppear(false);
        }
    }

    return (
        <div ref={containerRef} style={style} onClick={handleOnclick} className={"absolute flex flex-col " }>
            <span className={"relative h-0 w-0"}>{inputstate}</span>
            {isAppear && <input placeholder={placeholderr} ref={inputRef} type="text"></input>}
        </div>
    );
    //근데 입력값은 언제 return해야하지?
};

export default TextField;
