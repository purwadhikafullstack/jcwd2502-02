const CategoryCard = (props) => {
    return (
        <div>
            <div className=" card flex flex-col justify-between w-[109px] flex-none hover:font-bold ease-in duration-200">
                <button className=" hover:border-green-300 grid place-content-center h-[100px] rounded-full hover:shadow-lg hover:shadow-green-200 hover:scale-105 ease-in duration-200"
                    onClick={props.onClick} text={props.name} item={props.item}>
                    <img className="object-fit rounded-full h-[100px] w-[100px]" src={process.env.REACT_APP_URL + `${props.image}`} alt={props.name} />
                </button>
                <div className="flex justify-center z-0 mt-2">
                    {props.name}
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;