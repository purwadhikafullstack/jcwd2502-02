const Searchbar = (props) => {
    return (
        <div>
            <input
                type="text"
                onChange={props.onChange}
                placeholder="Search on BuyFresh"
                className="border border-green-800 rounded-full h-[45px] text-xs pl-4 w-full"
                value={props.value}
            />
        </div>
    );
};

export default Searchbar;
