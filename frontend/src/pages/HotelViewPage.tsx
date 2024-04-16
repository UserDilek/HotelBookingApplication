import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../HotelViewPage.css';
import Footer from '../components/Footer';
import Header from '../components/Header';

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

const HotelDetails: React.FC = () => {
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const { hotelId } = useParams<{ hotelId: string }>();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/my-hotels/${hotelId}`);
        setHotel(response.data);
      } catch (error) {
        setError('Error fetching hotel details');
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  if (!hotel) return <div>No hotel found.</div>;

  return (
    <>
    <Header/>
    <div className="hotel-details-container">
      <h1 className="hotel-details-title">{hotel.name}</h1>
      <div className="hotel-details">
        <img src={hotel.imageUrls[0]} alt={hotel.name} className="hotel-image" />
        <div className="hotel-info">
          <p>
            <strong>Location:</strong> {hotel.city}, {hotel.country}
          </p>
          <p>
            <strong>Description:</strong> {hotel.description}
          </p>
          <p>
            <strong>Price per Night:</strong> ${hotel.pricePerNight}
          </p>
          <p>
            <strong>Star Rating:</strong> {hotel.starRating}
          </p>
          <p>
            <strong>Facilities:</strong> {hotel.facilities.join(', ')}
          </p>
          <Link to={`/booking-confirm?hotelId=${hotel._id}`} className="book-button">Book Hotel</Link>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default HotelDetails;
