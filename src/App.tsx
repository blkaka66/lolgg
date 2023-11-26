import CheckBox, {CheckBoxType} from "./components/checkBox/CheckBox.tsx";
import SelectComponent from "./components/select/Select";
import ToolTipComponent from "./components/toolTip/ToolTip";
import ann from './assets/checkSvg.png'
import Radiocomponent from './components/radio/Radiocomponent.tsx'
import Radio from './components/radio/Radio.tsx'
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
  {label: 'Test', value: 'test'},
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

      {/*<SelectComponent data={options}></SelectComponent>*/}
      {/*<Radiocomponent>라디오</Radiocomponent>*/}
      {/*<Radiocomponent>라디오</Radiocomponent>*/}
      {/*<Radiocomponent>라디오</Radiocomponent>*/}
      {/*<Radiocomponent>라디오</Radiocomponent>*/}

      <Radio data={radioSampleData} value={'jack'} onChange={(value) => setRadioValue(value)}>GroupName</Radio>

      <div>1</div>
      <div>1</div>
      <div>1</div>
      <div>1</div>
      <SelectComponent data={options}></SelectComponent>
      <CheckBox checked={checkBoxData[1]} type={'checked'}>2</CheckBox>

    </div>
  )
}

export default App
