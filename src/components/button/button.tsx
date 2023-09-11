
const Button = ({
    text="",
    buttonSize="small",
    testSize="small",
    iconSize="small",
    iconPosition="before",
    isDisabled=false,
    onclick=null,
                }) => {

    return (
        <div className="w-full h-full absolute">
            <button className="w-10 h-10 bg-black "></button>
        </div>
    )
}

export default Button

