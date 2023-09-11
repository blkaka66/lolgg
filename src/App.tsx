

import ButtonComponent from "./components/button/button"

function App() {
    const onclick11 = () =>{
        console.log("안녕하세요");
    }
    return (


        <div className="border-4 border-red-100 relative h-screen text-center p-10 text-xl">

            <ButtonComponent
                text="ㅎㅇㅎㅇ"
                buttonSize = "8"
                textSize = "text-lg"
                iconSize = "4"
                onClick={onclick11}
            />

        </div>
            )
    }

export default App
