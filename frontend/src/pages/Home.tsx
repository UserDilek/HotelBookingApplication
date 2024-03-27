

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../HotelList.css'


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

const Home: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await axios.get('http://localhost:7000/api/my-hotels/hotels');
        setHotels(response.data);
      } catch (error) {
        setError('Error fetching hotels');
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
    <div className="hotel-list-container">
      <h1 className="hotel-list-title">Hotel List</h1>
      <div className="hotels">
        {hotels.map(hotel => (
          <div key={hotel._id} className="hotel-card">
            <img src={hotel.imageUrls[0]} alt={hotel.name} className="hotel-image" />
            <div className="hotel-details">
              <h2 className="hotel-name">{hotel.name}</h2>
              <p className="hotel-location">
                <strong>Location:</strong> {hotel.city}, {hotel.country}
              </p>
              <p className="hotel-description">{hotel.description}</p>
              <p className="hotel-price">
                <strong>Price per Night:</strong> ${hotel.pricePerNight}
              </p>
              <p className="hotel-rating">
                <strong>Star Rating:</strong> {hotel.starRating}
              </p>
              <p className="hotel-facilities">
                <strong>Facilities:</strong> {hotel.facilities.join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Home;