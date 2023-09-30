import { AiFillCaretDown } from "react-icons/ai";

import ButtonComponent from "./components/button/button"
import ToolTipComponent from "./components/toolTip/ToolTip";
function App() {
    const onclick11 = () =>{
        console.log("안녕하세요");
    }
    return (


        <div className="border-4 border-red-100 relative h-screen text-center p-10 text-xl">
          {/* 툴팁 1 */}
          <ToolTipComponent title="툴팁내용">
            <ButtonComponent
                variant="contained"
                widthSize={"fit"}
                icon={AiFillCaretDown}
                iconSize="40px"
                iconPosition="after"
                isDisabled = {false}
                color = "green"
            >
                안녕하세요
            </ButtonComponent>
          </ToolTipComponent>

          {/* 툴팁 2 */}
          <ToolTipComponent title={"툴팁!!"}>
            <div>마우스를 올리면 툴팁이 보여요!</div>
          </ToolTipComponent>
       </div>
            )
    }

export default App
