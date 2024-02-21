import { GrMapLocation } from "react-icons/gr";
import { CiDollar } from "react-icons/ci";
import { IoBedOutline } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import { HiOutlineWallet } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const data = [
    { name: "name", description: "description", location: "location", budget: 500, price: "50$", adultCount: 2, childCount: 5, rating: 4.5 },
    { name: "name", description: "description", location: "location", budget: 500, price: "50$", adultCount: 2, childCount: 5, rating: 4.5 },
    { name: "name", description: "description", location: "location", budget: 500, price: "50$", adultCount: 2, childCount: 5, rating: 4.5 },
    { name: "name", description: "description", location: "location", budget: 500, price: "50$", adultCount: 2, childCount: 5, rating: 4.5 },
    { name: "name", description: "description", location: "location", budget: 500, price: "50$", adultCount: 2, childCount: 5, rating: 4.5 },
]

const MyHotels = () => {
    const navigate = useNavigate();

    const addHotelHandler = () => {
        navigate("/create-hotel");
    }

    return (
        <div className="p-5 w-full text-start">
            <div className="flex items-center justify-between">
                <h1 className="text-4xl mb-5 text-[#88BDBC] mt-5">My Hotels</h1>
                <div>
                    <button onClick={addHotelHandler} className="btn">Add Hotel</button>
                </div>
            </div>

            <div>
                {data.map((item, index) =>
                    <HotelCard key={index} hotel={item} />
                )}
            </div>
        </div>
    )
}

const HotelCard = ({ hotel }: { hotel: any }) => {
    const attributes = [
        { icon: <GrMapLocation />, detail: hotel.location },
        { icon: <HiOutlineWallet />, detail: `${hotel.budget}$ Budget` },
        { icon: <CiDollar />, detail: `${hotel.price} per night` },
        { icon: <IoBedOutline />, detail: `${hotel.adultCount} Adults, ${hotel.childCount} Children` },
        { icon: <FaStar />, detail: hotel.rating }
    ]
    return (
        <div className="shadow p-4 rounded mb-5">
            <h2 className="text-xl font-semibold">{hotel.name}</h2>
            <p>{hotel.description}</p>
            <div className="flex flex-wrap items-center gap-5 mt-3">
                {attributes.map((item, index) =>
                    <div key={index} className="flex items-center gap-2 rounded-md shadow-sm p-3 border-2">
                        {item.icon}
                        {item.detail}
                    </div>
                )}
            </div>
            <div className="flex justify-end">
            <button className="btn mt-3 w-auto">View Details</button>
            </div>
        </div>
    )
}
export default MyHotels;