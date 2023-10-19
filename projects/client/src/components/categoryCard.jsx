

const CategoryCard = (props) => {
    return (
        <div>
            <div className=" card flex flex-col justify-between w-[100px] flex-none hover:font-bold ease-in duration-200">
                <button className="border hover:border-green-300 grid place-content-center h-[100px] rounded-full hover:shadow-lg hover:shadow-green-200 hover:scale-105 ease-in duration-200"
                    onClick={props.onClick} text={props.name} item={props.item}>
                    <img src={`http://localhost:8905/${props.image.substring(7)}`} alt="" />
                    {/* <img src={"https://jcwdol0905.purwadhikabootcamp.com/api/categories/sayuran_medium-1686110433857.png"} alt="" /> */}
                </button>
                <div className="flex justify-center z-0">
                    {props.name}
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;