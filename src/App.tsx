import CheckBox, {CheckBoxType} from "./components/checkBox/CheckBox.tsx";
import SelectComponent from "./components/select/Select";
import ToolTipComponent from "./components/toolTip/ToolTip";
import ann from './assets/checkSvg.png'
import Radiocomponent from './components/radio/Radiocomponent.tsx'
import {useEffect, useState} from "react";
import Radio from './components/radio/Radio.tsx'
import TextField from "./components/textField/TextField";
const options = [
  {
    label: 'Manager',
    options: [
      {label: 'Jack', value: 'jack'},
      {label: 'Lucy', value: 'lucy'},
    ],
  },
  {
    label: 'Engineer',
    options: [{label: 'yiminghe', value: 'Yiminghe'},
      {label: 'Jack', value: 'jack'}
    ],
  },
]

const data = [
  {"value": "jack", "label": "Jack"},
  {"value": "lucy", "label": "Lucy"},
  {"value": "Yimin", "label": "yiminghe"},
  {"value": "jack", "label": "Jack"},
  {"value": "disab", "label": "ffffff", "disabled": true}
]


const radioSampleData = [
  {label: 'Jack', value: 'jack'},
  {label: 'Lucy', value: 'lucy'},
  {label: 'Yiminghe', value: 'yiminghe'},
  {label: 'Test', value: 'test'}
]


const checkBoxData = [
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
]



function App() {
  // const [checked, setChecked] = useState(true);
  const onclick11 = () => {
    console.log("안녕하세요");
  }
  const [selectedData, setSelectedData] = useState<string|null>(null);
  const [checkedData , selectCheckedData]= useState<string | null>(null);
  const [radioValue , setRadioValue] =  useState<string | null>(null);
  const handleSelectedData = (data: string) => {
    setSelectedData(data);
    localStorage.setItem("selected", data);
  };
  const handleCheckedData =(data:string) =>{
    selectCheckedData(data);
  }
  const RadioData ="lucy";


  useEffect(() => {
    // fetch
    // result = 'jack';
    setTimeout(() => {
      setSelectedData(localStorage.getItem("selected"));
      setRadioValue('test')
    }, 2000);
  }, [])


  return (


    <div>

      {/*<input type="text" className="border-2 border-red-100" onChange={(e) => {*/}
      {/*  console.log(e.target.value)*/}

      {/*  // e.target.value*/}
      {/*  // Server로 보내기*/}
      {/*  // 서버에서 받은 데이터를 다시 뿌려주기*/}
      {/*}} />*/}

      {/*  툴팁 1*/}
      {/* <ToolTipComponent title="툴팁내용">*/}
      {/*   <ButtonComponent*/}
      {/*      variant="contained"*/}
      {/*      widthSize={"fit"}*/}
      {/*      icon={AiFillCaretDown}*/}
      {/*      iconSize="40px"*/}
      {/*      iconPosition="after"*/}
      {/*      isDisabled = {false}*/}
      {/*      color = "green"*/}
      {/*  >*/}
      {/*      안녕하세요*/}
      {/*  </ButtonComponent>*/}
      {/*</ToolTipComponent>*/}

      {/* 툴팁 2*/}
      {/*<ToolTipComponent title={"툴팁!!"}>*/}
      {/*  <div>마우스를 올리면 툴팁이 보여요!</div>*/}
      {/*</ToolTipComponent>*/}
      {/*{selectedData}*/}




      {/*<Radiocomponent></Radiocomponent>*/}

      {/*<CheckBox checked={checkBoxData[1]} type={'checked'} onChange={handleCheckedData}>2</CheckBox>*/}
      {/*{checkedData}*/}

      {/*{radioValue}*/}


      {/*<SelectComponent data={options}></SelectComponent>*/}
      {/*<CheckBox checked={checkBoxData[1]} type={'checked'} onChange={handleCheckedData}>1</CheckBox>*/}
      <TextField category={"passWord"}></TextField>
      <TextField category={"confirmPassWord"}></TextField>
    </div>
  )
}

export default App
