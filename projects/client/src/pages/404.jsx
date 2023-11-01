export default function NotFoundPage() {
    return(
        <div className=" h-[900px] md:h-screen bg-gradient-to-b from-green-700 to-yellow-300">
            <div className="flex justify-center">
                <div className="border m-40 p-12 text-lg rounded-lg font-semibold shadow-xl">
                    Error 404, requested page does not exist
                </div>
            </div>
        </div>
    )
}