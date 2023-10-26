import Button from "./button"

const ProductCard = (props) => {
    return (
        <div>
            <div className={`hover:border-green-700  hover:border-4 ease-in duration-200 border w-[160px] md:w-[180px] lg:w-[240px] h-[350px] lg:h-[410px] rounded-xl ${props.style}`}>
                <div>
                    <img className="object-fill rounded-t-xl h-[160px] lg:h-[220px] w-full z-0" src={process.env.REACT_APP_URL + `${props.image.substring(7)}`} alt="" /></div>
                <div className="h-[110px] lg:h-[110px] flex flex-col justify-between p-2 pl-4">
                    <div className="font-semibold ">{props.name}</div>

                    <div className="text-green-700 font-bold">Rp {props.price.toLocaleString()}</div>
                </div>
                <div className="flex justify-center pt-2 w-full"><Button style={"lg:w-[200px]"} text={"Add to Cart"} /></div>
            </div>
        </div >
    )
}

export default ProductCard
