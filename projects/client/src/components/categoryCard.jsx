const CategoryCard = (props) => {
    return (
        <div>
            <div className=" card flex flex-col justify-between w-[109px] flex-none font-bold ease-in duration-200 gap-3">
                <button className={`grid place-content-center h-[105px] w-[105px] border-4 border-white rounded-full  hover:scale-105 ease-in duration-200 ${props.style}`}
                    onClick={props.onClick} text={props.name} item={props.item}>
                    <img className="object-fit rounded-full h-[100px] w-[100px]" src={process.env.REACT_APP_URL + `${props.image}`} />
                </button>
                <div className="flex justify-center z-0">
                    {props.name}
                </div>
            </div>
        </div>
    );
};
export default CategoryCard;