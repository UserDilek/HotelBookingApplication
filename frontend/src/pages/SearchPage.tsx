import { useEffect, useState } from "react";
import axios from "../../node_modules/axios/index";
import { hotelTypes, hotelFacilities } from "./../config/hotel-options-config";
import { Link, useLocation } from "react-router-dom";
<<<<<<< Updated upstream
=======
import Pagination from "../components/Pagination";
>>>>>>> Stashed changes

interface Hotel {
    _id: string;
    userId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
}

<<<<<<< Updated upstream
=======
interface PaginationIF {
    page: number;
    pages: number;
    total: number;
}

>>>>>>> Stashed changes
const SearchPage = () => {
    const RATING_STARS = [5, 4, 3, 2, 1];
    const PRICES = [50, 100, 200, 300, 500];
    const SORT_OPTION = [
        { value: "starRating", label: "Star rating" },
        { value: "pricePerNightAsc", label: "Price Low to High" },
        { value: "pricePerNightDesc", label: "Price High to Low" },
    ]

<<<<<<< Updated upstream
    const [total, setTotal] = useState(0);
=======
    const [pagination, setPagination] = useState<PaginationIF>({
        page: 1,
        pages: 0,
        total: 0
    });
>>>>>>> Stashed changes

    const [hotels, setHotels] = useState<Hotel[]>([]);
    const [facilities, setFacilities] = useState<string[]>([]);
    const [types, setTypes] = useState<string[]>([]);
    const [stars, setStars] = useState<string[]>([]);
    const [maxPrice, setMaxPrice] = useState();
<<<<<<< Updated upstream
=======
    const [currentPage, setCurrentPage] = useState(1);
>>>>>>> Stashed changes
    const [sortOption, setSortOption] = useState("starRating");
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    // Fetching individual query parameters from home page
    const destination = query.get('destination');
    const adultCount = query.get('adultCount');
    const childCount = query.get('childCount');

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    const fetchData = async () => {
        try {
            const queryParams = {
                destination,
                adultCount,
                childCount,
<<<<<<< Updated upstream
                page: 1,
=======
                page: currentPage,
>>>>>>> Stashed changes
            };
            if (facilities && facilities.length > 0) queryParams.facilities = facilities;
            if (types && types.length > 0) queryParams.types = types;
            if (stars && stars.length > 0) queryParams.stars = stars;
            if (maxPrice) queryParams.maxPrice = maxPrice;
            if (sortOption) queryParams.sortOption = sortOption;

            const response = await axios.get('http://localhost:7000/api/hotels/search', {
                params: queryParams,
            });
<<<<<<< Updated upstream
            setTotal(response?.data?.pagination?.total);
=======
            setPagination(response?.data?.pagination);
>>>>>>> Stashed changes
            setHotels(response.data.data);
        } catch (error) {
            setError('Error fetching hotels');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
<<<<<<< Updated upstream
    }, [facilities, types, stars, maxPrice, sortOption]);
=======
    }, [facilities, types, stars, maxPrice, sortOption, pagination]);
>>>>>>> Stashed changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    const handleFilter = (key: string, value: any) => {
        switch (key) {
            case "facilities":
                if (facilities.includes(value)) {
                    setFacilities(facilities.filter(item => item !== value));
                } else {
                    setFacilities([...facilities, value]);
                }
                break;
            case "types":
                if (types.includes(value)) {
                    setTypes(types.filter(item => item !== value));
                } else {
                    setTypes([...types, value]);
                }
                break;
            case "stars":
                if (stars.includes(value)) {
                    setStars(stars.filter(item => item !== value));
                } else {
                    setStars([...stars, value]);
                }
                break;
            case "maxPrice":
                setMaxPrice(value);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div className="flex text-left">
                <div className="border-1 shadow-md p-4 min-w-[300px]">
                    <h3 className="my-3">Filters</h3>
                    <hr />
                    <h4 className="my-3">Property Rating</h4>
                    {RATING_STARS.map((item) =>
                        <div key={item} className="form-group">
                            <input type="checkbox" value={item} className="me-2"
<<<<<<< Updated upstream
                                onChange={() => handleFilter("stars", item+"")}
=======
                                onChange={() => handleFilter("stars", item + "")}
>>>>>>> Stashed changes
                                checked={stars.includes(item + "")} />
                            {item} Stars
                        </div>)}
                    <hr />
                    <h4 className="my-3">Hotel Type</h4>
                    {hotelTypes.map((item) =>
                        <div key={item} className="form-group">
                            <input type="checkbox" value={item} className="me-2"
                                onChange={() => handleFilter("types", item)}
                                checked={types.includes(item)} />
                            {item}
                        </div>)}
                    <hr />
                    <h4 className="my-3">Facilities</h4>
                    {hotelFacilities.map((item) =>
                        <div key={item} className="form-group">
                            <input type="checkbox" value={item} className="me-2"
                                onChange={() => handleFilter("facilities", item)}
                                checked={facilities.includes(item)} />
                            {item}
                        </div>)}
                    <hr />
                    <h4 className="my-3">Max Price</h4>
                    <select
                        className="form-select"
                        onChange={(e) => handleFilter("maxPrice", e.target.value)}
                        value={maxPrice}
                    >
                        {PRICES.map((item) =>
                            <option key={item} value={item} className="me-2">{item}</option>
                        )}
                    </select>
                </div>
                <div className="flex-1 p-4">
                    <div>
<<<<<<< Updated upstream
                        <h2>{total} Hotels Found</h2>
=======
                        <h2>{pagination.total} Hotels Found</h2>
>>>>>>> Stashed changes
                        <div className="flex mt-4 mb-3">
                            <label className="min-w-[80px]">Sort by</label>
                            <select className="form-select"
                                onChange={(e) => setSortOption(e.target.value)}
                                value={sortOption}>
                                {SORT_OPTION.map((item) =>
                                    <option value={item.value}>{item.label}</option>
                                )}
                            </select>
                        </div>
                    </div>
                    {hotels.map(hotel => (
                        <div key={hotel._id} className="hotel-card border-1 p-2 flex">
                            <img src={hotel.imageUrls[0]} alt={hotel.name} className="hotel-image w-[400px] h-full object-cover" />
                            <div className="hotel-details">
                                <h2 className="hotel-name">{hotel.name}</h2>
                                <p className="hotel-location">
                                    <strong>Location:</strong> {hotel.city}, {hotel.country}
                                </p>
                                <p className="hotel-description line-clamp-2">{hotel.description}</p>
                                <p className="hotel-price">
                                    <strong>Price per Night:</strong> ${hotel.pricePerNight}
                                </p>
                                <p className="hotel-rating">
                                    <strong>Star Rating:</strong> {hotel.starRating}
                                </p>
                                <p className="hotel-facilities">
                                    <strong>Facilities:</strong> {hotel.facilities.join(', ')}
                                </p>
                                <Link className="bg-mainColor rounded-md text-white p-2">View more</Link>
                            </div>
                        </div>
                    ))}
<<<<<<< Updated upstream
=======

                    <Pagination
                        currentPage={pagination?.page} totalPages={pagination?.total % 5 !== 0 ? (pagination?.total / 5) + 1 : pagination?.total / 5}
                        onPageClick={({ page }) => 
                            setCurrentPage(page)
                        } />
>>>>>>> Stashed changes
                </div>
            </div>
        </>
    )
}

export default SearchPage