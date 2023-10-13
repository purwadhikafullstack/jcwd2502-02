const ProductCard = (props) => {
    return (
        <div>
            <div className="border w-[165px] lg:w-[250px]  h-[280px] lg:h-[380px] rounded-xl shadow-xl">
                <div><img className="rounded-t-lg" src="https://jcwdol0905.purwadhikabootcamp.com/api/products/anggur-1689347487247.jpg" alt="" /></div>

                <div className="h-[115px] flex flex-col justify-between p-2">
                    <div className="font-semibold ">{props.name}</div>
                    <div className="text-green-700 font-bold">Rp 10,000</div>
                </div>

            </div>
        </div >
    )
}

export default ProductCard
