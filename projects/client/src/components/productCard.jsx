const ProductCard = (props) => {
    return (
        <div>
            <div className={`hover:border-green-700 hover:border-2 ease-in duration-200 border w-[170px] md:w-[160px] lg:w-[240px] h-[280px] lg:h-[380px] rounded-xl ${props.style}`}>
                <div><img className="object-fill rounded-t-xl h-[160px] lg:h-[220px] w-full" src={process.env.REACT_APP_URL + `${props.image.substring(7)}`} alt="" /></div>
                <div className="h-[110px] lg:h-[130px] flex flex-col justify-between p-2 pl-4">
                    <div className="font-semibold ">{props.name}</div>
                    <div className="text-green-700 font-bold">Rp {props.price.toLocaleString()}</div>
                </div>

            </div>
        </div >
    )
}

export default ProductCard
