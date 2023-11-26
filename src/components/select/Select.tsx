import React, {useState, useRef, ChangeEvent, useEffect} from "react";
import ButtonComponent from "../button/button.tsx";
import { makeRandomNumber } from "../../methods/Utils.tsx";

interface Option {
    label: string;
    value: string;
    disabled?: boolean;
}

interface NestedOption {
    label: string;
    options: Option[];
}

/**
 * @param defaultValue: 기본값, 없으면 placeholder로 표시
 * @param placeholder: 기본값이 없을 때 표시할 문구
 * @param widthSize: full, fit, number
 * @param textSize select안의 글자크기
 * @param data select에 보낼 데이타의 형태는 두가지다. 첫쨰로 option은 일차배열 형태로 이루어진 딕셔너리 형태로 value,label로 이루어져 있다.
 * nestedoption은 이차배열 형태의 딕셔너리로 가장 바깥 배열안에 label별로 카테고리가 나누어져 있고 그 옆에 option형태로 데이터가 있는 형태이다.
 * output:resultValue

 */
interface SelectProps {
    defaultValue?: string;
    placeholder?: string;
    widthSize?: "full" | "fit" | number;
    textSize?: string;
    data: Option[] | NestedOption[];
}

const SelectComponent = ({
                             defaultValue = "lucy",
                             widthSize = "fit",
                             textSize = "text-lg",
                             data,
                         }: SelectProps) => {
    const [isAppear, setIsAppear] = useState(false);
    const [searchKeyword , setSearchKeyword] = useState("");
    const containerRef = useRef<HTMLDivElement | null>(null);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const isNestedOption = Array.isArray(data) && 'options' in data[0];
    const [matchingResult, setMatchingResult] = useState<Option[] | NestedOption[]>([]);
    let resultValue="";
    // const id = makeRandomNumber();
    const [onDefaultValue, setonDefaultValue] = useState(defaultValue);
    const handleOnclick = () => {
        console.log("끼얏호우");
        console.log('4');
        setIsAppear(!isAppear);
    };

    const handleButtonClicked = (itemValue: string) => {
        setonDefaultValue(itemValue);
        resultValue=itemValue;
        setIsAppear(false);
        if (inputRef.current) {
            inputRef.current.value = ""; // Reset the input value
        }
        console.log(itemValue);
    };

    const handleOutsideClick = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
            setIsAppear(false);
        }
    }

    useEffect(() => { //select 바깥영역 클릭하면 사라지는 이벤트 추가,제거
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        }
    }, [])

    // useEffect(() => { //왜 이걸로 이벤트추가하면 실시간으로 검색이안되지?
    //     const inputRefElement = inputRef.current;
    //     if (inputRefElement) {
    //         console.log("이벤트추가")
    //         inputRefElement.addEventListener("onKeyUp", searchEvent);
    //     }
    //     return () => {
    //         if (inputRefElement) {
    //             inputRefElement.removeEventListener("onKeyUp", searchEvent);
    //         }
    //     };
    // }, []);

    useEffect( () => {
        console.log("3. isAppear: " + isAppear);
    },[isAppear])



    const searchEvent = (event) =>{
        setIsAppear(true);
        console.log("1. isAppear: " + isAppear);
        const lowerCaseInput = event.target.value.toLowerCase();
        console.log(lowerCaseInput);

        // setSearchKeyword(lowerCaseInput);
        // setonDefaultValue(event.target.value);
        //console.log(searchKeyword+"^^^")



        const matchingOption = isNestedOption //만약 nested형태면
            ? data.flatMap(data => { //겉의 label은 flapmap으로 날리고 안쪽의 option만 남겨서
               const nestedOptions = data.options.filter(nestedOption => //filtering한다
                    nestedOption.label.toLowerCase().includes(lowerCaseInput)//죄다 소문자로 바꿔서 포함된값을 필터링함
                );

                return nestedOptions.length > 0
                    ? [{ ...data, options: nestedOptions }] // 그리고 option에 필터링된값을 덮어씌워서 리턴한다
                    : [];
            })
            : data.filter(option => option.label.toLowerCase().includes(lowerCaseInput));//nested형태아니면 그냥 filtering한다.
        setMatchingResult(matchingOption)
        console.log(matchingResult)

        console.log("2. isAppear: " + isAppear);

    }
    const renderSelect = (data) =>{
        return (

            <div>
                {
                    isNestedOption
                        ? (data as NestedOption[]).map((nestedOption, index) => (
                            <div key={index}>
                                <ButtonComponent isDisabled={true}>{nestedOption.label}</ButtonComponent>
                                {nestedOption.options.map((item, Index) => (
                                    <ButtonComponent
                                        key={Index}
                                        variant="outlined"
                                        widthSize={widthSize}
                                        textSize={textSize}
                                        isDisabled={item.hasOwnProperty('disabled') ? item.disabled : false}
                                        onClick={(event) => {
                                            event.stopPropagation();
                                            handleButtonClicked(item.hasOwnProperty('value') ? item.value : "");
                                        }}
                                    >
                                        {item.label}
                                    </ButtonComponent>
                                ))}
                            </div>
                        ))
                        : (data as Option[]).map((item, index) => (
                            <ButtonComponent
                                key={index}
                                variant="outlined"
                                widthSize={widthSize}
                                textSize={textSize}
                                isDisabled={item.hasOwnProperty('disabled') ? item.disabled : false}
                                onClick={(event) => {
                                    event.stopPropagation();
                                    handleButtonClicked(item.hasOwnProperty('value') ? item.value : "");
                                }}
                            >
                                {item.label}
                            </ButtonComponent>
                        ))
                }
            </div>

        )
    }

    return (
        <div
            className={"relative inline-block border border-black w-12 h-12"}
            onClick={handleOnclick}
            ref={containerRef}
        >

            <input
                ref={inputRef}
                type="text"
                placeholder={onDefaultValue}
                onClick={(event) => {
                    event.stopPropagation();
                    handleOnclick();
                }}
                onKeyUp={(event) => {

                    console.log(data)
                    if (data) {
                        // event.preventDefault();
                        searchEvent(event);

                    }
                }
            }
            />
            {
              data &&
              isAppear &&
              (
                  renderSelect(matchingResult.length>0 ? matchingResult : data)

              )
            }
        </div>
    );
};

export default SelectComponent;
