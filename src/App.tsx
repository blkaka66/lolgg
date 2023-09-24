import { AiFillCaretDown } from "react-icons/ai";

import ButtonComponent from "./components/button/button"
import ToolTipComponent from "./components/toolTip/ToolTip.tsx";
function App() {
    const onclick11 = () =>{
        console.log("안녕하세요");
    }
    return (


        <div className="relative border-4 border-red-100 relative h-screen text-center p-10 text-xl">
            <ButtonComponent
                variant="outlined"
                widthSize={"fit"}
                icon={AiFillCaretDown}
                iconSize="40px"
                iconPosition="after"
                isDisabled = {false}
                color = "white"
            >
                안녕하세요 <ToolTipComponent> ggg </ToolTipComponent>
            </ButtonComponent>

       </div>
            )
    }

export default App
