const Button = (props) => {
    return (
        <div>
            <button type={props.onType} onClick={props.onClick} className={`btn bg-yellow-300 hover:bg-yellow-300 rounded-2xl border-4 border-green-800 hover:border-green-800 text-green-900 ${props.style}`}>
                {props.text}
            </button>
        </div>
    )
}
export default Button;