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
 * @param textSize
 * @param data
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
    const [searchPosition, setSearchPosition] = useState("");
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


    useEffect(() => {
        if(isAppear){
            const inputRefElement = inputRef.current;

            // 화면 (View Port) 높이
            const windowHeight = window.innerHeight;

            // Select의 InputRefElement의 높이
            const inputRefElementHeight = inputRefElement?.offsetHeight;

            // 화면 (View Port) 상단에서 inputRefElement까지의 거리
            const inputRefElementTop = inputRefElement?.getBoundingClientRect().top;

            // 화면 (View Port) 하단에서 inputRefElement까지의 거리
            const inputRefElementBottom = windowHeight - inputRefElementTop - inputRefElementHeight;


            // 하단이 100px 미만 남았을 때, 위쪽으로 올리기
            if (inputRefElementBottom < 100) {
                setSearchPosition("bottom-8")
            } else {
                setSearchPosition("top-8");
            }
        }
    }, [isAppear])

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

    }
    const renderSelect = (data) =>{
        return (

            <div className={`absolute max-h-36 w-full overflow-y-auto border-solid border-black border-[0.5px] ${searchPosition}`}>
                {
                    isNestedOption
                        ? (data as NestedOption[]).map((nestedOption, index) => (
                            <div key={index}>
                                <div className="text-sm font-bold text-yellow-600 text-left mt-2">{nestedOption.label}</div>
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
            className={"relative inline-block border border-black"}
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
