const SortButton = (props) => {
    return (
        <div>
            <select
                className="btn select rounded-full border-4 border-green-700 hover:bg-yellow-300 hover:border-green-700  bg-yellow-300 text-black"
                name=""
                onChange={props.onChange}
                id=""
            >
                <option value={props.value1}>Newest</option>
                <option value={props.value2}>Oldest</option>
            </select>
        </div>
    );
};
export default SortButton;