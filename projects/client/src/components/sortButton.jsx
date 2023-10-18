const SortButton = (props) => {
    return (
        <div>
            <select
                className="select select-md btn bg-green-400 hover:bg-green-300 text-white"
                name=""
                onChange={props.onChange}
                id=""
            >
                <option value={props.value1}>A-Z</option>
                <option value={props.value2}>Z-A</option>
            </select>
        </div>
    );
};

export default SortButton;