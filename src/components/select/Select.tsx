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
            <ButtonComponent
                variant="outlined"
                widthSize={widthSize}
                textSize={textSize}
                onClick={(event) => {
                    event.stopPropagation();
                    handleOnclick();
                }}
            >
                {onDefaultValue}
            </ButtonComponent>
            {data &&
                isAppear &&
                (isNestedOption
                    ? (data as NestedOption[]).map((nestedOption, index) => (
                        <div key={index}>
                            <ButtonComponent isDisabled={true}>{nestedOption.label}</ButtonComponent>
                            {nestedOption.options.map((item, nestedIndex) => (
                                <ButtonComponent
                                    key={nestedIndex}
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
