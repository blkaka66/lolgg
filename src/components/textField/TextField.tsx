import React, {useEffect, useRef, useState} from 'react';
// import removeMark from "../../assets/x-mark.png";
interface TextFieldProps {
  label?:"standard" | "outlined",
  size?:"narrow" |"medium" |"wide",
  placeholderr?:string,
  category?: "email"| "name"| "phone"| "passWord"| "confirmPassWord",
}
interface containerRefStyle {
    width?: string | undefined,
    height?: string | undefined,
    border?: string | undefined,
}

const TextField = ({
    label = "standard",
    size = "medium",
    placeholderr = "입력하세요",
   category = "passWord",
   }:TextFieldProps
) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);

    const [inputstate , setInputState] =  useState("standard");
    const [style, setStyle] = useState<containerRefStyle>({})
    const [errorMsg , setErrorMsg] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [originalInputValue, setOriginalInputValue] = useState("");
    const checkValidation = (value : string)=> {

        if(category!== undefined){
            let subStr = "";

            switch(category){
                //email은 @포함되어야하고 @뒤에 .가 포함되어야함
                case "email":
                    if(value.includes("@"))
                    {
                        let index= value.indexOf("@");
                        subStr = value.split("@")[1];
                        if(subStr.includes(".")){
                            setErrorMsg("");
                        }
                        else{
                            setErrorMsg("잘못된 이메일 형식입니다")
                        }
                    }
                    else{
                        setErrorMsg("잘못된 이메일 형식입니다")
                    }

                    break;


                case "phone":
                let koreanPhonePattern = (/^01[0-9]-\d{3,4}-\d{4}$/);
                if (koreanPhonePattern.test(value)) {
                    setErrorMsg("");
                } else {
                    setErrorMsg("유효하지 않은 휴대전화번호 입니다");
                }
                break;

                case "passWord":

                    setInputValue(value.replace(/./g, '*'));

                    break;

                case "confirmPassWord":
                    setInputValue(value.replace(/./g, '*'));

            }
        }

    }



    useEffect(() => {
        if(inputRef.current?.value === ""){
            setErrorMsg("");
        }
    }, [inputRef.current?.value]);







    useEffect(() => {
        let width: string | undefined = undefined;
        let height: string | undefined = undefined;
        let border: string = '';
        if(label === "standard"){
            border ="1px solid black";
        }
        switch(size){
           case "narrow":
               width="80px",
               height="30px";
               break;
           case "medium":
               width="120px",
               height="30px";
               break;
           case "wide":
               width="160px",
               height="30px";
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



    const handleOutsideClick = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsAppear(false);
        }
    }

    const deleteInput = (event: MouseEvent) => {
        if (inputRef.current.value !== undefined && inputRef.current.value !== "") {
            inputRef.current.value = "";
        }
    }
    const savePw = (value: string) => {
        setOriginalInputValue(prev => prev + value);
       console.log(originalInputValue)
    };


    return (
        <div ref={containerRef}>
            <span className={"relative left-0 top-0"}>{inputstate}</span>
            <div style={style} onClick={handleOnclick} className={"relative flex"}>
                <input value={inputValue}
                       type={category === "passWord" ? "password" : "text"}
                onKeyUp={(e) => {
                   const value = e.target.value;
                   if (value.length > 0) {
                       savePw(value.charAt(value.length - 1));
                   }
                 }}
                       //현재문제: 비밀번호를 저장해서 confirm에서 비교하고싶은데 *값이 저장이된다.
                onChange={(e) => {
                setInputValue(e.target.value);
                checkValidation(e.target.value);
                }} placeholder={placeholderr} style={style} ref={inputRef} type="text"></input>
                {/*<button onClick={deleteInput} className={"relative w-12 h-12"} style={{ backgroundImage: `url(${removeMark})` }}></button>*/}
                {/*이거 왜 안보이지???*/}
            </div>
            <div className={"relative text-sm text-red-600 left-2 bottom-0"}>{errorMsg}</div>
        </div>
    );


};

export default TextField;
