const Searchbar = (props) => {
    return (
        <div>
            <input
                value={props.value}
                type="text"
                onChange={props.onChange}
                placeholder={props.placeholder ? props.placeholder : "Search on BuyFresh"}
                className="border border-green-800 rounded-full h-[45px] text-xs pl-4 w-full"
            />
        </div>
    );
};
export default Searchbar;
