import CheckBox, {CheckBoxType} from "./components/checkBox/CheckBox.tsx";
import SelectComponent from "./components/select/Select2";
import ToolTipComponent from "./components/toolTip/ToolTip";

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
  {label: 'Jack', value: 'jack'}
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
  return (


    <div className="border-4 border-red-100 relative h-screen text-center p-10 text-xl">

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



      원하는 것들을 선택해 주세요.
      <ToolTipComponent title={'툴팁!!'}>
        <CheckBox checked={checkBoxData[0]} type={'filled'}>1</CheckBox>
      </ToolTipComponent>
      <CheckBox checked={checkBoxData[1]} type={'filled'}>2</CheckBox>
      <CheckBox checked={checkBoxData[2]} type={'filled'}>3</CheckBox>
      <CheckBox checked={checkBoxData[3]} type={'filled'}>4</CheckBox>
      <CheckBox checked={checkBoxData[4]} type={'filled'}>5</CheckBox>
      <CheckBox checked={checkBoxData[5]} type={'filled'}>6</CheckBox>
      <CheckBox checked={checkBoxData[6]} type={'filled'}>7</CheckBox>
      <CheckBox checked={checkBoxData[7]} type={'filled'}>8</CheckBox>

      <SelectComponent data={options}></SelectComponent>
    </div>
  )
}

export default App
