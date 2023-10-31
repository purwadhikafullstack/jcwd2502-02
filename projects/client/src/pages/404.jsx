import { Link } from "react-router-dom"
import Button from "../components/button"

export default function NotFoundPage() {
    return (
        <div className=" h-screen md:h-screen bg-gradient-to-b from-green-700 to-yellow-300
        grid place-content-center">

            <div className="mx-5 md:mx-32 rounded-3xl bg-white border-4 border-green-700 font-black">

                <div className="grid place-content-center text-7xl md:text-9xl  font-black pt-5 text-green-600">OOPS!</div>

                <div className="font-bold px-10 py-5 text-lg rounded-lg text-center">
                    Error 404 - PAGE NOT FOUND
                    <div className="mt-5 font-normal">The page you are looking for might have been removed, had its name changed or is temporarily unavailable</div>
                </div>

                <div className="grid place-content-center pb-10">
                    <Link to={'/'}>
                        <Button text={"Go to Homepage!"}></Button>
                    </Link>

                </div>
            </div>




        </div>
    )
}