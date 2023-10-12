import React, { useState } from "react";
import ButtonComponent from "../button/button.tsx";
import { makeRandomNumber } from "../../methods/Utils.ts";

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

    const isNestedOption = Array.isArray(data) && 'options' in data[0];

    const id = makeRandomNumber();
    const [onDefaultValue, setonDefaultValue] = useState(defaultValue);
    const handleOnclick = () => {
        console.log("끼얏호우");
        setIsAppear(!isAppear);
    };

    const handleButtonClicked = (itemValue: string) => {
        setonDefaultValue(itemValue);
        console.log(itemValue);
    };

    return (
        <div
            id={`select_${id}`}
            className={"relative inline-block border border-black w-12 h-12"}
            onClick={handleOnclick}
        >
            <input
                type="text"
                placeholder={onDefaultValue}
                onClick={(event) => {
                    event.stopPropagation();
                    handleOnclick();
                }}
                onKeyDown={(event) => {

                    console.log(data)
                    if (data) {
                        event.preventDefault();
                        const lowerCaseInput = event.target.value.toLowerCase();
                        setSearchKeyword(lowerCaseInput);
                        setonDefaultValue(event.target.value);
                        console.log(searchKeyword)
                        console.log(lowerCaseInput)
                        const matchingOption = isNestedOption
                            ? (data as NestedOption[]).forEach(nestedOption =>
                                nestedOption.label.toLowerCase().includes(lowerCaseInput)
                            )
                            : (data as Option[]).find(option => option.label.toLowerCase().includes(lowerCaseInput));

                        if (matchingOption) {
                            console.log(matchingOption)

                        }
                    }
                }}
            />

            {data &&
                isAppear &&
                (isNestedOption
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
                    )))}
        </div>
    );
};

export default SelectComponent;
