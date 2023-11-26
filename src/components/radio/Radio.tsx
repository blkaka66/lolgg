import {useEffect, useState} from "react";

// interface RadioProps{
//     buttonSize?: 'small' | 'medium'| 'large',
//     textSize?: 'small' | 'medium'| 'large',
//     isDisabled?: boolean;
//     fillColor?:string; //체크되면 표시되는 안쪽동그라미의 색깔
//     onClick?: (event: React.MouseEvent) => void;
//     checked?: boolean; //만약 다른페이지에서 정보가 넘어오면 체크되있는걸로 표시
//     children?: React.ReactNode;
// }


type RadioData = {
  label: string;
  value: string;
}

// type RadioProps = {
//     data: RadioData[];
//     value: string;
//     onChange: (value: string) => void;
// }

interface RadioProps {
  data: RadioData[];
  value: string;
  onChange: (value: string) => void;

  buttonSize?: 'small' | 'medium' | 'large',
  textSize?: 'small' | 'medium' | 'large',
  isDisabled?: boolean;
  fillColor?: string; //체크되면 표시되는 안쪽동그라미의 색깔
  // onClick?: (event: React.MouseEvent) => void;
  children?: React.ReactNode;
}


const Radiocomponent = ({
                          data,       //라디오버튼의 데이터
                          value,      //라디오버튼의 값  (선택된 값)
                          buttonSize = "medium",
                          textSize = "small",
                          fillColor = "blue",
                          checked = true,
                          // onClick = (event: React.MouseEvent) => {
                          //
                          //     console.log('click!');
                          //     event.stopPropagation();
                          // },
                          onChange = (value: string) => {
                            console.log('click!');
                            // event.stopPropagation();
                          },
                          isDisabled = false,
                          children
                        }: RadioProps) => {

  const [selectedValue, setSelectedValue] = useState(value);


  const itemClick = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  }

  return (
    <div className={`relative w-full text-left p-4 text-sm border-solid border-[1px] border-gary-400 rounded-lg`}>
      <div className={`absolute top-[-10px] left-4 bg-white px-4`}>{children}</div>
      {
        data.map((item, index) => {
          return (
            <div className={`flex`} key={`radio_${index}`} onClick={() => {
              itemClick(item.value)
            }}>
              <span
                className={`w-4 h-4 rounded-full border-[2px] border-solid border-red-200 mr-2 ${item.value === selectedValue ? 'bg-red-50 ' : 'bg-transition'}`}></span>
              <span>{item.label}</span>
            </div>
          )
        })
      }
    </div>
  );
};

export default Radiocomponent;
