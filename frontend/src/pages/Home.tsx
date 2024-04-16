import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../HotelList.css';

interface Hotel {
  _id: string;
  name: string;
  imageUrls: string[];
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
    <div className="hotel-list-container">
      <h1 className="hotel-list-title">Hotel List</h1>
      <div className="hotels">
        {hotels.map(hotel => (
          <div key={hotel._id} className="hotel-card">
            <a href={`/hotel-details/${hotel._id}`}>
              <div className="hotel-image-container">
                <img src={hotel.imageUrls[0]} alt={hotel.name} className="hotel-image" />
                <div className="hotel-name-overlay">{hotel.name}</div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
