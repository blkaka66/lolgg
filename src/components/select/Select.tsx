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

interface SelectProps {
    defaultValue?: string;
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

    // const id = makeRandomNumber();
    const [onDefaultValue, setonDefaultValue] = useState(defaultValue);
    const handleOnclick = () => {
        console.log("끼얏호우");
        console.log('4');
        setIsAppear(!isAppear);
    };

    const handleButtonClicked = (itemValue: string) => {
        setonDefaultValue(itemValue);
        setIsAppear(false);
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



    const searchEvent = (event) =>{
        const lowerCaseInput = event.target.value.toLowerCase();
        console.log(lowerCaseInput);

        // setSearchKeyword(lowerCaseInput);
        // setonDefaultValue(event.target.value);
        //console.log(searchKeyword+"^^^")

        const matchingOption = isNestedOption
            ? data.flatMap(data => {
                const nestedOptions = data.options.filter(nestedOption =>
                    nestedOption.label.toLowerCase().includes(lowerCaseInput)
                );
                return nestedOptions.length > 0
                    ? [{ ...data, options: nestedOptions }]
                    : [];
            })
            : data.filter(option => option.label.toLowerCase().includes(lowerCaseInput));
        setMatchingResult(matchingOption)
        console.log(matchingResult)

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
