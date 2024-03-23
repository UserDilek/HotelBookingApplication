import { useQuery } from "react-query";
import {Link} from "react-router-dom";

const Home = () => {


  const firstHotels = ["hotel1.jpg","hotel2.jpg"];
  const secondHotels = ["hotel5.jpg","hotel6.jpg","hotel7.jpg","hotel8.jpg","hotel3.jpg","hotel4.jpg"];
  const firstHotelMaps = firstHotels.map((hotelName, index) => {
    return (
        <Link  to={"/hotelview/2"}   className="relative cursor-pointer overflow-hidden rounded-md" >
        <div className="h-[300px]">
    <img
      src={hotelName}
      className="w-full h-full object-cover object-center"
    />
  </div>

  <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
    <span className="text-white font-bold tracking-tight text-3xl">
       Lorem.
    </span>
  </div>
      </Link>
    );
  });

  const secondHotelMaps = secondHotels.map((hotelName, index) => {
    return (
        <Link  to={"/hotelview"}   className="relative cursor-pointer overflow-hidden rounded-md" >
        <div className="h-[300px]">
    <img
      src={hotelName}
      className="w-full h-full object-cover object-center"
    />
  </div>

  <div className="absolute bottom-0 p-4 bg-black bg-opacity-50 w-full rounded-b-md">
    <span className="text-white font-bold tracking-tight text-3xl">
       Lorem.
    </span>
  </div>
      </Link>
    );
  });



  return (     
      < div className="container mx-auto">
    <div className="space-y-3">
      <h2 className="text-3xl font-bold">Latest Destinations</h2>
      <p>Most recent desinations added by our hosts</p>
      <div className="grid gap-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
        
          {firstHotelMaps}
    
        </div>
        <div className="grid md:grid-cols-3 gap-4">
           {secondHotelMaps}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Home;